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

      <header class="bg-white dark:bg-gray-800">
        <div class="container px-6 py-4 mx-auto">
          <div class="items-center md:flex">
            <div class="w-full md:w-1/2">
              <div class="max-w-lg">
                <h1 class="text-2xl font-semibold text-gray-800 uppercase dark:text-white md:text-3xl">Cookie & Rock</h1>
                <p class="mt-2 text-gray-600 dark:text-gray-400">The best place to find cookies and rocks</p>
                <button class="px-3 py-2 mt-4 text-sm font-medium text-white uppercase bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Read now</button>
              </div>
            </div>

            <div class="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
              <img class="w-full h-full max-w-2xl" src="cookieandrock-on-plate-center.png" alt="" />
            </div>
          </div>
        </div>
      </header>

      <div className="h-12 w-screen bg-yellow-300" ></div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">

            {allPostsData.map(({ id, month, day, title, series, author, date, description }) => (
              <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{month}</span>
                    <span className="font-medium text-lg text-gray-800 title-font leading-none">{day}</span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">{series}</h2>
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      <a href={"posts/" + id}>{title}</a>
                    </h1>
                    <p className="leading-relaxed mb-5 mt-4 h-8">{description}</p>
                    <a className="inline-flex items-center">
                      <img alt="blog" src="https://pbs.twimg.com/profile_images/1375220842745880576/rUVvwhZQ_400x400.jpg" className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-gray-900">{author}</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>
      </section>

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