import { useState, useEffect } from 'react'

const HeaderImg = (props) => {
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
          ? <img className="max-h-[350px] object-cover" src={headerImg} />
          : <div className="h-52 bg-zinc-800" />
      }
    </>
  )
}

export default HeaderImg
