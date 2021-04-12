import Image from 'next/image'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export async function getServerSideProps(context) {

  const res = await fetch('http://localhost:1337/blogs?_sort=publishDate:DESC&_limit=6')

  const posts = (await res.json())

  const months = [
    "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  return {
    props: { posts, months} // will be passed to the page component as props
  }
}

export default function Home({ posts, months }) {
  return (
    <div>
      
      {/* <head>
        <title>Cookie and Rock!</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head> */}

      <Navbar />

      <header className="bg-white dark:bg-gray-800">
        <div className="container px-6 py-4 mx-auto">
          <div className="items-center md:flex">
            <div className="w-full md:w-1/2">
              <div className="max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white md:text-3xl">Cookie & Rock</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">The best place to find cookies and rocks</p>
                <button className="px-3 py-2 mt-4 text-sm font-medium text-white uppercase bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Read now</button>
              </div>
            </div>

            {/* <div className="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2"> */}
            <div className="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
              <Image className="max-w-2xl" src="/cookieandrock-on-plate-center.png" alt="Cookie on plate" width={762} height={762}/>
            </div>
          </div>
        </div>
      </header>

      <div className="h-12 w-screen bg-yellow-300" ></div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">

            {posts.map(({ id, blogid, publishDate, title, seriesName, author, description }) => (
              <div className="py-8 px-4 lg:w-1/3">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">{months[(new Date(publishDate)).getUTCMonth()]}</span>
                    <span className="font-medium text-lg text-gray-800 title-font leading-none">{(new Date(publishDate)).getUTCDate()}</span>
                  </div>
                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">{seriesName.seriesName}</h2>
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      <a href={"posts-api/" + blogid}>{title}</a>
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