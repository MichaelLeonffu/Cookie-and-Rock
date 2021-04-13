import Navbar from '../../components/navbar'
import RichHeader from '../../components/richheader'
import Footer from '../../components/footer'

import remark from 'remark'
import html from 'remark-html'

export async function getServerSideProps(context) {

    console.log("context", context.params.id)
    debugger;
    const res = await fetch('http://localhost:1337/blogs?blogid_eq=' + context.params.id)

    /* Set defaults in case the data isn't complete */
    const postData = {
        title: "Untitled",
        author: "Anonymous",
        description: "The empty blog.",
        content: "Missing Blog? [home](/)",
        publishDate: "2020-03-30",
        coverPhoto: {
            url: "/logo/cookieandrock-plated-empty.png"
        },

        ...(await res.json())[0]
    }

    // const postData = (await res.json())[0]

    const processedContent = await remark()
        .use(html)
        .process(postData.content)
    const contentHtml = processedContent.toString()

    return {
        props: { postData, contentHtml } // will be passed to the page component as props
    }
}

function format_date(input_date) {

    const date = new Date(input_date)
    const named_months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    const named_days = [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
    ]

    return named_days[date.getDay()] + ", " + named_months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
}

export default function Post({ postData, contentHtml }) {

    return (
        <>
            <Navbar />

            <RichHeader site_name="Cookie and Rock -- blogs" title={postData.title} description={postData.description} image_url={postData.coverPhoto.url} author={postData.author} og_type="article" />

            <header className="header relative fl fl-center fl-column w-full z-index-10 m-b-10 p-20 h-360">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500" />
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-40" />
                <p className="relative text-white text-center text-7xl max-w-screen-md mx-auto">{postData.title}</p>
            </header>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                {/* <p className="font-black text-center ">{postData.title}</p> */}

                <div className="space-y-1 text-center pt-6 xl:pb-10 ">
                    <dl className="space-y-10">
                        <div>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base leading-6 font-medium text-gray-500"><time dateTime="2021-03-29T19:00:00.000Z">{format_date(postData.publishDate)}</time>
                            </dd>
                        </div>
                    </dl>
                    {/* <div>
                        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">{postData.title}</h1>
                    </div> */}
                </div>

                {/* <hr className="mt-8 mb-8" /> */}
                {/* <img src={"http://localhost:1337" + postData.coverPhoto[0].url} alt="" /> */}


                {/* <iframe className="block w-full h-96 mx-auto" src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d106879.62981732472!2d-117.30759787236836!3d33.16193055252512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x80dc73973bb59d61%3A0x8a81efc96b79400f!2sSage%20Creek%20High%20School%2C%20Cannon%20Road%2C%20Carlsbad%2C%20CA!3m2!1d33.1574185!2d-117.28500389999999!4m5!1s0x80dc75df5f5636c9%3A0x2965eafb1645293!2sDing%20Tea%20San%20Marcos%2C%206%20Creekside%20Dr%20Suite%20500%2C%20San%20Marcos%2C%20CA%2092078!3m2!1d33.1348054!2d-117.17892289999999!5e0!3m2!1sen!2sus!4v1617433936570!5m2!1sen!2sus" loading="lazy"></iframe> */}


                {/* <div class="auto prose" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
                <div className="p-4 md:p-0 mt-4 mx-auto prose prose-indigo md:prose-lg lg:prose-xl">
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </div>
            </div>

            <Footer />
        </>
    )
}