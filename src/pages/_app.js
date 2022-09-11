import '../styles/globals.css'
import UserNav from '../components/UserNav'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="grid grid-rows-12 sm:grid-cols-12 grid-flow-row inline ">
      <div className="flex justify-center sm:col-span-1 order-last sm:order-first row-span-1  ">
        <div className="fixed sm:sticky left-0 bottom-0 sm:top-0 z-10 outline-1 outline-zinc-700 outline w-screen z-20">
          <UserNav />
        </div>
      </div>
      <div className="md:col-span-7 col-span-10 row-span-11 break-all  relative z-10 mb-14 mx-1">
        <div className="sticky top-0 z-10">
          <Header />
        </div>
        <div className="">
          <Component {...pageProps} />
        </div>
      </div>
      <div className="md:col-span-4 col-span-1 hidden sm:inline break-all w-content outline-1 outline-zinc-700 outline sticky right-0 top-0">
        <Sidebar />
      </div>
    </div>
  )
}
