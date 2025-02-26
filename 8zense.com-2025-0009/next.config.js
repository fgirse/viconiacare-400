
const nextIntl = require('next-intl/plugin')();

module.exports = nextIntl({
  // Other Next.js configuration options
  images: {
    remotePatterns: [{ hostname: "images.pexels.com" }],
  },
});