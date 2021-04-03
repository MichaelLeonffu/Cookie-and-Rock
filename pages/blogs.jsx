import Image from 'next/image'
import { getSortedPostsData } from '../lib/posts'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function Home({ allPostsData }) {
    return (
        <div>

            {/* <head>
        <title>Cookie and Rock!</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head> */}
            <Navbar />

            <section className="text-center font-bold "> Cetnered? </section>
           

            <div className="h-12 w-screen bg-yellow-300" ></div>


            <Footer />
        </div>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}