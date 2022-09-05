import { useState, useEffect } from 'react'

const HeaderImgSM = (props) => {
  const [validateHeader, setValidateHeader] = useState(false)

  const {
    headerImg
  } = props

  useEffect(() => {
    headerImg && fetch(headerImg)
      .then((res) => {
        setValidateHeader(res.status === 200)
      })
  }, [])

  return (
    <>
      {
        validateHeader
          ? <img className="max-h-[s00px] object-cover" src={headerImg} />
          : <div className="bg-zinc-800" />
      }
    </>
  )
}

export default HeaderImgSM
