/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me"],
    unoptimized: true,
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

export default nextConfig;