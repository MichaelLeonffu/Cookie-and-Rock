// import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Navbar from '../../components/navbar'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        {/* <p className="font-black text-center ">{postData.title}</p> */}

        <div class="space-y-1 text-center pt-6 xl:pb-10 ">
          <dl class="space-y-10">
            <div>
              <dt class="sr-only">Published on</dt>
              <dd class="text-base leading-6 font-medium text-gray-500"><time datetime="2021-03-29T19:00:00.000Z">{postData.date}</time>
              </dd>
            </div>
          </dl>
          <div>
            <h1 class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">{postData.title}</h1>
          </div>
        </div>

        <hr className="mt-8 mb-8" />


        {/* <iframe className="block w-full h-96 mx-auto" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d106879.62981732472!2d-117.30759787236836!3d33.16193055252512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x80dc73973bb59d61%3A0x8a81efc96b79400f!2sSage%20Creek%20High%20School%2C%20Cannon%20Road%2C%20Carlsbad%2C%20CA!3m2!1d33.1574185!2d-117.28500389999999!4m5!1s0x80dc75df5f5636c9%3A0x2965eafb1645293!2sDing%20Tea%20San%20Marcos%2C%206%20Creekside%20Dr%20Suite%20500%2C%20San%20Marcos%2C%20CA%2092078!3m2!1d33.1348054!2d-117.17892289999999!5e0!3m2!1sen!2sus!4v1617433936570!5m2!1sen!2sus" loading="lazy"></iframe> */}


        {/* <div class="auto prose" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        <div className="p-4 md:p-0 mt-8 mx-auto prose prose-indigo md:prose-lg lg:prose-xl">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </div>
    </>
  )
}