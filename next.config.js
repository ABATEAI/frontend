/** @type {import('next').NextConfig} */
const nextConfig = {
    // Route /api requests to http://127.0.0.1:8000 uvicorn development server
    // Referenced:
    // - https://vercel.com/guides/
    //   how-to-use-python-and-javascript-in-the-same-application
    // - https://github.com/digitros/nextjs-fastapi/blob/main/next.config.js
    // - https://github.com/wpcodevo/nextjs-fastapi-framework/
    //   blob/main/next.config.js
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/api/:path*"
                        : "/api/",
            },
        ];
    },
    // https://medium.com/@elifront/best-next-js-docker-compose-hot-reload
    //     -production-ready-docker-setup-28a9125ba1dc
    output: 'standalone',
};

module.exports = nextConfig;
