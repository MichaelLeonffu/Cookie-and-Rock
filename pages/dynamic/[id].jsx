import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Lol! It's dynamic! "{id}"</p>
}

export default Post