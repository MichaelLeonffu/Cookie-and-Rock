import Image from 'next/image'
import Layout from '../components/layout'

// export async function getServerSideProps(context) {

//   const res = await fetch('http://localhost:1337/blogs?_sort=publishDate:DESC&_limit=6')

//   const posts = (await res.json())

//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ]

//   return {
//     props: { posts, months } // will be passed to the page component as props
//   }
// }

export default function About() {
  return (
    <Layout>

      <div className="container mx-auto px-4 mt-8 lg:px-4 lg:mt-16 max-w-screen-lg">

        <header className="mb-0 md:mb-4 lg:mb-12">
          <div className="mx-auto">
            <div className="items-center md:flex">
              <div className="w-full md:w-2/3 mr-4">
                <div className="max-w-lg">

                  <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                    What is Cookie and Rock?
                </h1>

                  <hr className="mb-4 border-yellow-500 border-2 rounded-full text-left w-16 text-2xl" />

                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    <em>Cookie and Rock</em> is a bakery, café, bar, among many other things.
                  <br />
                    <br />
                  Its vision and purpose is to be a small and local venue for
                  friends by friends. It's a place where friends can make bread
                  and pastries, mix and brew drinks, and enjoy the ambiance.
                  <br />
                    <br />
                  Every week at C&R, you can try new and unique food and beverages
                  on rotation. During the weekends you might hear some live music
                  featuring our musical friends. But 100% of the time you will
                  experience the unique and passionate craftsmanship of friends at C&R.
                </p>

                </div>

              </div>

              <div className="w-full md:w-1/3">
                <div className="text-center md:text-right">
                  <Image src="/logo/cookieandrock-plated.png" alt="Cookie on plate" layout="intrinsic" width={314} height={314} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto md:px-8">

          <h1 id="authors" className="text-center text-4xl">
            Meet the Authors
          </h1>
          <hr className="mb-4 border-indigo-500 border-2 rounded-full mx-auto w-64 text-2xl" />

          <div className="h-auto w-full flex flex-row flex-wrap justify-around items-start text-gray-600 body-font">
            {[{
              'name': "Michael Leonffu",
              'stuff': "Co-founder, Developer, Baker, Photographer",
              // 'image': "https://cdn.discordapp.com/avatars/176828287509725184/433616541c38d8ddf75fc4eea36532c8.webp?size=1024"
              'image': "/favicon.ico"
            }, {
              'name': "Jill Chiang",
              'stuff': "Co-founder, Barista, Civil Nerd, Badminton Pro",
              'image': "/favicon.ico"
            }, {
              'name': "Diego",
              'stuff': "Pizza, Electric nerd, 3D-design, Programmer, Gamer",
              'image': "/logo/cookieandrock-strong-rock.png"
            }, {
              'name': "Anna Li",
              'stuff': "Baker, Artist, 3D-designer, Gamer, Micro-bio nerd",
              // 'image': "https://cdn.discordapp.com/avatars/185980089811337216/2f436be055d3afa2a2a73356362d2f1a.webp?size=1024"
              'image': "/logo/cookieandrock-smooth-rock.png"
            }, {
              'name': "Emmily Ha",
              'stuff': "Baker, Photographer, Blogger, Dictator",
              'image': "/logo/cookieandrock-plated-empty.png"
            }].map(({ name, stuff, image }) => (
              <div className="flex-shrink-0 w-64 h-60">

                <div className="text-center">
                  <img alt="blog" src={image} className="w-24 h-24 text-center inline object-cover" />
                </div>

                <h1 className="block text-center title-font text-xl font-medium text-gray-900 mt-4">
                  <a href="/authors/meow">{name}</a>
                </h1>

                <p className="block text-center leading-relaxed h-28 overflow-hidden">
                  {stuff}
                </p>

              </div>
            ))}
          </div>

        </section>

        <div class="max-w-xs sm:max-w-sm my-8 mx-auto bg-grey-light rounded-lg shadow p-8">
          <h2 class="italic text-right text-blue-darkest leading-normal">
            Some inspiring quote about how C&R Staff only works here
            because they want and outlet for their passions that aren't
            enough to make a career but enough to share with friends and family.
        </h2>
          <p class="text-center pt-8 text-grey-darker">
            - C&R Staff
        </p>
        </div>

        <section className="mb-0 md:mb-4 lg:mb-12">
          <div className="mx-auto">
            <div className="items-center md:flex">
              <div className="w-full md:w-1/2">
                <div className="text-center md:text-left">
                  <Image src="/logo/cookieandrock-plated.png" alt="Cookie on plate" layout="intrinsic" width={314} height={314} />
                </div>
              </div>

              <div className="w-full md:w-1/2 mr-4">
                <div className="max-w-lg">

                  <h1 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                    Why is Cookie and Rock?
                </h1>

                  <hr className="mb-4 border-yellow-500 border-2 rounded-full text-left w-16 text-2xl" />

                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    <em>Cookie and Rock</em> is a bakery, café, bar, among many other things.
                  <br />
                    <br />
                  Incididunt laboris pariatur mollit nisi laborum nostrud sint reprehenderit. Tempor nisi amet qui tempor qui incididunt minim dolor nostrud mollit dolore commodo mollit. Velit do nostrud commodo laboris mollit sit sit nulla cupidatat velit fugiat tempor.
                  <br />
                    <br />
                  Incididunt laboris pariatur mollit nisi laborum nostrud sint reprehenderit. Tempor nisi amet qui tempor qui incididunt minim dolor nostrud mollit dolore commodo mollit. Velit do nostrud commodo laboris mollit sit sit nulla cupidatat velit fugiat tempor.
                </p>

                </div>

              </div>
            </div>
          </div>
        </section>

      </div>

    </Layout>
  )
}