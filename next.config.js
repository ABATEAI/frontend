/** @type {import('next').NextConfig} */
const nextConfig = {
    // Route requests starting with /api/google to http://127.0.0.1:8000 server
    // Route requests starting with /api/square to http://127.0.0.1:8001 server
    // uvicorn servers are running at both during development
    // Referenced:
    // - https://vercel.com/guides/
    //   how-to-use-python-and-javascript-in-the-same-application
    // - https://github.com/digitros/nextjs-fastapi/blob/main/next.config.js
    rewrites: async () => {
        return [
            {
                source: "/api/google/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/api/google/:path*"
                        : "/api/google/",
            },
            {
                source: "/google/docs",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/docs"
                        : "/api/google/docs",
            },
            {
                source: "/google/redoc",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/redoc"
                        : "/api/google/redoc",
            },
            {
                source: "/google/openapi.json",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8000/openapi.json"
                        : "/api/google/openapi.json",
            },
            {
                source: "/api/square/:path*",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8001/api/square/:path*"
                        : "/api/square/",
            },
            {
                source: "/square/docs",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8001/docs"
                        : "/api/square/docs",
            },
            {
                source: "/square/redoc",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8001/redoc"
                        : "/api/square/redoc",
            },
            {
                source: "/square/openapi.json",
                destination:
                    process.env.NODE_ENV === "development"
                        ? "http://127.0.0.1:8001/openapi.json"
                        : "/api/square/openapi.json",
            },
        ];
    },
    // https://medium.com/@elifront/best-next-js-docker-compose-hot-reload
    //     -production-ready-docker-setup-28a9125ba1dc
    output: 'standalone',
};

module.exports = nextConfig;
