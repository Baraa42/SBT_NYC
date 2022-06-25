import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
        <h1 className="text-xl font-bold">
        Hello world!
        </h1>
        <Link href="/create">
            <p className="text-xl cursor-pointer">create page</p>
        </Link>
        <Link href="/list">
            <p className="text-xl cursor-pointer">list page</p>
        </Link>
    </div>
  )
}

export default Home
