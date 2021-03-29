import { useRouter } from 'next/router'
import Link from 'next/link'

const Many = () => {
    const router = useRouter()
    const { arr } = router.query

    console.log(router.query)
    console.log("tested")

    return (
        <>
            {/* <p>You are at "{router.query.arr.join(" ") }"</p> */}
            <p>You are at "{ arr }"</p>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </>
    )
}

export default Many