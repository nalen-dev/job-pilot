/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb"
        }
    },
    images: {
        remotePatterns: [
            {
                hostname: "pub-ffadcbf4b3be4f2f8d06bacd114a80e1.r2.dev",
                port: "",
                protocol: "https",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
