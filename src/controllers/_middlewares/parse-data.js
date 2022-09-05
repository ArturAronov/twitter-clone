import formidable from 'formidable'
import _ from 'lodash'
import fs from 'fs'
import { URL } from 'url'



const currFilePath = new URL(import.meta.url).pathname.split('/').slice(0, -1).join('/')
const dirname = `${currFilePath}/../../../tmp`
// if (!fs.existsSync(dirname)) fs.mkdirSync(dirname)

const parseData = (req, res, next) => {
  const form = formidable({ uploadDir: dirname, keepExtensions: true, multiples: true })

  if (req?.headers?.['content-type'].includes('multipart/form-data')) {

    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json(err)


      req.body = fields
      req.files = files

      Object.keys(files).forEach((key) => {
        if (files[key].size > 0) {
          _.set(req.body, key, files[key])
        } else {
          fs.unlinkSync(files[key].filepath)
          delete req.files[key]
        }
      })
      next()
    })
  } else {
    next()
  }
}

export default parseData
