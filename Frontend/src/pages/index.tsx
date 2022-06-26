import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from 'react-daisyui'

const Home: NextPage = () => {
  return (
    <main className="h-screen overflow-hidden max-w-screen-lg mx-auto text-lg">
      <div className="flex items-center justify-center w-full">
        <div className="relative w-2/3 h-hit">
          <img src={"/top/Image-1.png"} alt={"top image"} width="100%" className=""/>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 items-center justify-center my-16 space-x-8">
        <Link href="/create">
          <Button className="bg-primary text-white py-2 px-1" >create</Button>
        </Link>
        <Link href="/list">
          <Button className="bg-primary text-white py-2 px-1">explore</Button>
        </Link>
      </div>    
    </main>
  )
}

export default Home
