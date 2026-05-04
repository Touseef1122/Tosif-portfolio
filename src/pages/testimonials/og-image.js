const path = require('path');
const fs = require('fs');
const { createHash } = require('crypto');

export async function generateOgImage(props) {
  try {
    const params = new URLSearchParams(props);
    const url = `file:${path.join(
      process.cwd(),
      `src/pages/testimonials/og-image.html?${params}`
    )}`;
    const hash = createHash('md5').update(url).digest('hex');
    const ogImageDir = path.join(process.cwd(), `public/og`);
    const imageName = `${hash}.png`;
    const imagePath = `${ogImageDir}/${imageName}`;
    const publicPath = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/og/${imageName}`;

    try {
      fs.statSync(imagePath);
      return publicPath;
    } catch (error) {
      // file does not exist
    }

    // Puppeteer disabled for Vercel deployment
    return null;
  } catch (error) {
    return null;
  }
}