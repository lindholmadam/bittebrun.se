/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.bittebrun.se',
  generateRobotsTxt: true,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ["/login"],
};

export default config;