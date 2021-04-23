// import { getSortedPostsData } from '../lib/posts'
import Navbar from '../components/navbar'
import RichHeader from '../components/richheader'
import Footer from '../components/footer'
import Image from 'next/image'

export async function getServerSideProps(context) {

  // const res = await fetch('http://localhost:1337/blogs?_sort=publishDate:DESC&_limit=6')
  const res = await fetch('http://localhost:1337/blogs?_sort=publishDate:DESC')

  const posts = (await res.json())

  const months = [
    "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  let series_names = [... new Set(Array.from(posts, x => x.seriesName.seriesName))]

  // console.log(series_names)

  let posts_by_series = Array.from(
    series_names, x => ({
      seriesName: x,
      posts: posts.filter((v, i, a) => v.seriesName.seriesName == x)
    })
  )

  // console.log(posts_by_series)

  return {
    props: { posts_by_series, months } // will be passed to the page component as props
  }
}

export default function Home({ posts_by_series, months }) {
  return (
    <div>

      <RichHeader site_name="Cookie and Rock -- blogs" title="Cookie and Rock Blog" description="Our collection of Cookie and Rock blogs!" author="Cookie and Rock" og_type="article" />

      <Navbar />

      {/* <header class="header relative fl fl-center fl-column w-full z-index-10 m-b-10 p-20 h-screen">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <p class="relative text-white text-center text-7xl max-w-screen-md mx-auto font-serif mt-16">Coming Soon!</p>
          <div class="relative grid justify-items-center mx-auto" >
            <Image src="/logo/cookieandrock-plated.png" alt="Cookie on plate" layout="intrinsic" width={512} height={512} />
          </div>
        </div>
      </header> */}

      <header class="header relative fl fl-center fl-column w-full mb-3 p-20 h-auto">
        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
        <p class="relative text-white text-center text-7xl max-w-screen-md mx-auto font-serif my-9">Blogs</p>
      </header>


      <section className="w-full md:w-3/4 mx-auto mt-24">

        {posts_by_series.map(({ seriesName, posts }) => (
          <section>

            <div className="w-full mb-9">
              <h1 className="prose prose-2xl text-center w-full mx-auto tracking-widest text-4xl title-font font-medium text-indigo-500">
                {seriesName}
              </h1>
              <hr />
            </div>

            <div className="h-auto w-full flex flex-row flex-wrap justify-between items-start pt-8 px-2 text-gray-600 body-font">
              {posts.map(({ id, blogid, publishDate, title, seriesName, author, description }) => (
                <div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-72 flex flex-row p-6 pt-0 mx-0">

                  <div className="flex-shrink-0 mr-6">
                    <div className="w-full flex flex-col text-center leading-none">
                      <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                        {months[(new Date(publishDate)).getUTCMonth()]}
                      </span>
                      <span className="font-medium text-lg text-gray-800 title-font leading-none">
                        {(new Date(publishDate)).getUTCDate()}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                      {seriesName.seriesName}
                    </h2> */}

                    <h1 className="block title-font text-xl font-medium text-gray-900 mb-3">
                      <a href={"posts/" + blogid}>{title}</a>
                    </h1>

                    <p className="block leading-relaxed mb-5 mt-4 h-28 overflow-hidden">
                      {description}
                    </p>

                    <a className="absolute bottom-10 h-12 w-auto inline-flex items-center">
                      <img alt="blog" src={author ? author.profileImage.url : "/favicon.ico"} className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center" />
                      <span className="flex-grow flex flex-col pl-3">
                        <span className="title-font font-medium text-gray-900">
                          {author ? author.name : "C&R Staff"}
                        </span>
                      </span>
                    </a>

                  </div>

                </div>
              ))}
            </div>
          </section>
        ))}

      </section>

      <Footer />
    </div>
  )
}