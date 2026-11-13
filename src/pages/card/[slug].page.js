import fs from 'fs';
import path from 'path';
import Head from 'next/head';

const allowedSlugs = ['alishbah-touseef', 'wedding-card', 'nikah-invitation'];

const extractTag = (html, tagName) => {
  const pattern = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = html.match(pattern);
  return match ? match[1] : '';
};

const extractBody = html => {
  const pattern = /<body[^>]*>([\s\S]*?)<\/body>/i;
  const match = html.match(pattern);
  return match ? match[1] : html;
};

const extractScripts = html => {
  const pattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  return Array.from(html.matchAll(pattern), match => match[1].trim()).filter(Boolean);
};

export default function CardPage({ slug, html }) {
  const title = slug
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  const style = extractTag(html, 'style');
  const bodyHtml = extractBody(html);
  const scripts = extractScripts(html);

  return (
    <>
      <Head>
        <title>{title} | Nikah Invitation</title>
        <meta
          name="description"
          content="A wedding invitation page for Alishbah and Touseef with timings, venue, and map details."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      {scripts.map((script, index) => (
        <script key={`${slug}-${index}`} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: allowedSlugs.map(slug => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug || 'alishbah-touseef';

  if (!allowedSlugs.includes(slug)) {
    return { notFound: true };
  }

  const htmlPath = path.join(process.cwd(), 'src', 'layouts', 'Home', 'card.html');
  const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf8') : '';

  if (!html) {
    return { notFound: true };
  }

  return {
    props: {
      slug,
      html,
    },
  };
}
