/**
 *
 * @type {import('next').NextConfig}
 */
const config = {
    images: {
        domains: ['localhost', 'lh3.googleusercontent.com']
    },
    rewrites: async () => {
        return [
            {
                source: '/images/:path*',
                destination: 'http://localhost:4000/:path*'
            }
        ]
    },
    reactStrictMode: true
}

// eslint-disable-next-line no-undef
module.exports = config