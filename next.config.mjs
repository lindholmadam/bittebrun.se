export default {
  experimental: {
    optimizeCss: false
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  }
};