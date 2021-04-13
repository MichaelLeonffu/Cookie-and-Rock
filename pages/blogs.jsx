// import { getSortedPostsData } from '../lib/posts'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Image from 'next/image'

export default function Home({ allPostsData }) {
    return (
        <div>

            <head>
                <title>Cookie and Rock Blog</title>
                <link rel="icon" href="/favicon.png" />
            </head>

            <Navbar />

            <header class="header relative fl fl-center fl-column w-full z-index-10 m-b-10 p-20 h-screen">
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                    <p class="relative text-white text-center text-7xl max-w-screen-md mx-auto font-serif mt-16">Coming Soon!</p>
                    <div class="relative grid justify-items-center mx-auto" >
                        <Image src="/logo/cookieandrock-plated.png" alt="Cookie on plate" layout="intrinsic" width={512} height={512} />
                    </div>
                </div>
            </header>


            <Footer />
        </div>
    )
}

// export async function getStaticProps() {
//     const allPostsData = getSortedPostsData()
//     return {
//         props: {
//             allPostsData
//         }
//     }
// }