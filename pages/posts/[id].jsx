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
      { postData.title}
      < br />
      { postData.id}
      < br />
      { postData.date}
      < br />
      {/* <div class="auto prose" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
      <div className="p-4 md:p-0 mt-8 mx-auto prose prose-indigo md:prose-lg lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </div>
    </>
  )
}