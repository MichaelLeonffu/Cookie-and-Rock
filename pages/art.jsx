import Image from 'next/image'
import Layout from '../components/layout'

export async function getServerSideProps(context) {

  const res = await fetch('http://localhost:1337/arts?_sort=datetime:DESC')

  const arts = (await res.json())

  return {
    props: { arts }
  }
}

export default function Arts({ arts }) {
  return (
    <Layout>

      <div className="flex flex-row flex-wrap m-0 md:m-11">
        {arts.map(({ discord_id, album, art_url, datetime }) => (
          <div className="md:flex-shrink-0 shadow-lg w-screen md:w-1/4 h-auto overflow-hidden border-solid border-2 border-black pb-10 mx-2 mb-2 bg-indigo-200 flex-grow">
            <img src={art_url} alt="Some art from discord!" />
            <p className="prose text-center mt-1 font-mono font-black">{datetime}</p>
          </div>
        ))}
      </div>


    </Layout >
  )
}