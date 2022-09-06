import nextConnect from 'next-connect'
import * as yup from 'yup'
import { v4 as uuidv4 } from 'uuid'

import auth from '../../../../controllers/_middlewares/auth'
import prisma from '../../../../controllers/_helpers/prisma'
import handleErrors from '../../../../controllers/_helpers/handleErrors'
import parseData from '../../../../controllers/_middlewares/parse-data'
import uploadFileAsync from '../../../../lib/upload-file.js'

export const config = {
  api: {
    bodyParser: false
  }
}
const handler = nextConnect()

const userInput = yup.object({
  content: yup.string().max(280),
  mediaUrl: yup.mixed(),
  postId: yup.number()
})

handler
  .use(auth)
  .use(parseData)
  .use((req, res, next) => {
    // If both content and mediaUrl are empty. Return error, else proceed to next task.
    if (!req.body.content && !req.body.mediaUrl) {
      return res.status(500).json({ msg: 'please enter either image or post' })
    }
    return next()
  })
  .use(async (req, res, next) => {
    // Verify that the postId that gets passed is in the database
    if (req?.body?.postId) {
      const getPostByPostId = await prisma.post.findFirst({
        where: {
          id: parseInt(req.body.postId)
        }
      })

      !getPostByPostId
        ? res
          .status(500)
          .json({ msg: `No post with id of ${req.body.postId}` })
        : next()
    } else {
      return next()
    }
  })
  .post(async (req, res) => {
    try {
      const verifiedInput = await userInput.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      })

      if (await verifiedInput.mediaUrl) {
        const uuid = await uuidv4() + req.session.user.id
        await uploadFileAsync(uuid, verifiedInput, req)
      }

      // If there's a mediaUrl input, assign postType as a MEDIA, otherwise postType is TWEET
      let postType

      if (req?.body?.postType === 'REPLY' && verifiedInput?.postId) {
        postType = 'REPLY'
      } else if (verifiedInput?.postId) {
        postType = 'RETWEET'
      } else if (verifiedInput?.mediaUrl) {
        postType = 'MEDIA'
      } else {
        postType = 'TWEET'
      }

      const newPost = await prisma.post.create({
        data: {
          ...verifiedInput,
          postType,
          userId: req.session.user.id
        }
      })


      return res.status(201).json(newPost)
    } catch (err) {
      handleErrors(res, err)
    }
  }
  )

export default handler
