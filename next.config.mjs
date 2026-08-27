/** @type {import('next').NextConfig} */
const nextConfig = {
  // Polling keeps file watching reliable on synced and network-backed folders.
  webpack(config, { dev }) {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.git/**"],
        poll: 1000,
      }
    }

    return config
  },
}

export default nextConfig
