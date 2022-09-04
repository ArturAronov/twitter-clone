import { useRouter } from 'next/router'
import Head from 'next/head'
import ArrowLeft from './buttons/ArrowLeft'

const HeaderTitle = (prop) => {
  const router = useRouter()

  return (
    <div className="flex flex-row hero-content font-bold text-xl">
      <Head>
        <title>{`${prop.component} / Twitter Clone / Artur Aronov`}</title>
      </Head>
      <div onClick={() => router.back()}> <ArrowLeft /> </div>
      <div className="pl-1 flex flex-col">
        { prop.component }
        {
          prop?.userName
          && (
          <div className="text-sm text-zinc-500 font-normal">
            @{prop.userName}
          </div>
          )
        }
      </div>
    </div>
  )
}

export default HeaderTitle
