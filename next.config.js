/** @type {import('next').NextConfig} */
const nextConfig = {
    // Route /api requests to uvicorn development server at http://backend:8000.
    // Can use http://backend since containers are on custom abateai-net network
    //
    // Referenced:
    // - https://vercel.com/guides/
    //   how-to-use-python-and-javascript-in-the-same-application
    // - https://github.com/digitros/nextjs-fastapi/blob/main/next.config.js
    // - https://github.com/wpcodevo/nextjs-fastapi-framework/
    //   blob/main/next.config.js
    //
    // Somehow I figured out the magic is to use http://backend:8000/api/:path*
    // instead of http://127.0.0.1:8000/api/:path* for development. This allows
    // the frontend container to talk to the backend container over abateai-net.
    rewrites: async () => {
        return [
            {
                source: "/api/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://backend:8000/api/:path*"
                        : process.env.BACKEND_PRODUCTION_URL + "/api/",
            },
        ];
    },
    // https://medium.com/@elifront/best-next-js-docker-compose-hot-reload
    //     -production-ready-docker-setup-28a9125ba1dc
    output: 'standalone',
};

module.exports = nextConfig;
