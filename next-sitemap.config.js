/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://www.bittebrun.se',
  generateRobotsTxt: true,
  exclude: ["/login", "/galleri/*", "/nyheter/*"],
  additionalPaths: async (config) => [
    {
      loc: "/",
      changefreq: 'monthly',
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/kontakt",
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/biografi",
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/galleri",
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/nyheter",
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  ],
};

export default config;