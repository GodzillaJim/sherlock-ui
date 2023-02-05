/**
 *
 * @type {import('next').NextConfig}
 */
const config = {
    images: {
        domains: ['localhost']
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

module.exports = config