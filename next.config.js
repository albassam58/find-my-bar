/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URI: "mongodb+srv://root:root@cluster0.qtigz.mongodb.net/sample_posts?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
