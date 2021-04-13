module.exports = {
    poweredByHeader: false,
    /* Docs https://nextjs.org/docs/api-reference/next.config.js/rewrites */
    async rewrites() {
        return [
            {
                source: '/about',
                destination: '/',
            },
            {
                source: '/uploads/:slug',
                destination: 'http://localhost:1337/uploads/:slug',
            },
        ]
    },
}