import Image from 'next/image'
import RichHeader from '../components/richheader'

export default function Custom404() {
    return (

        <>
            <RichHeader title="404 Cookie not found" description="Looks like someone got to the cookies first" image_url="/logo/cookieandrock-plated-empty.png" />

            <div className="absolute flex h-auto top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex-col">
                <h1 className="block mx-auto w-auto text-4xl">
                    404
            </h1>
                <span className="flex-shink-0 mx-auto my-0 w-auto md:mb-24 text-gray-500">
                    <p className="line-through inline">Cookies</p>
                    <p className="inline"> Page not found</p>
                </span>

                {/* This helps contain the image!!! */}
                <div className="flex-shrink-0 w-96 relative self-center h-64 overflow-hidden" >
                    <div className="absolute -top-16 self-center h-96 overflow-hidden" >
                        <Image src="/logo/cookieandrock-plated-empty.png" alt="Cookie on plate" layout="intrinsic" width={512} height={512} />
                    </div>
                    <div className="absolute -top-16 self-center h-96 overflow-hidden opacity-100 hover:opacity-0 transition-all duration-500 ease-in-out transform hover:scale-105" >
                        <Image src="/logo/cookieandrock-plated.png" alt="Cookie on plate" layout="intrinsic" width={512} height={512} />
                    </div>
                </div>
                <h1 className="flex-shink-0 mx-auto mt-0 w-auto text-xl italic text-gray-500 text-center">
                    Looks like someone got to the cookies first.
            </h1>
            </div>
        </>
    )
}