// Post-build step: writes real HTML for every route plus sitemap.xml,
// robots.txt and llms.txt, all generated from src/data/user_info.js so the
// facts never drift between the page, the structured data and the AI summary.
//
// Runs after `vite build` (client) and `vite build --ssr` (server entry).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, routes, user_info: info } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

const SITE = info.site.url;
const TODAY = new Date().toISOString().slice(0, 10);
const PERSON_ID = `${SITE}/#person`;
const ORG_IDS = {
  Trimata: 'https://www.trimata.lt/#organization',
  Bonder: 'https://bonder.lt/#organization',
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// JSON inside <script> must not be able to close the tag.
const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const absolute = (file) => `${SITE}/${file.replace(/^\//, '')}`;

function personNode() {
  const { main, socials, site, education, experience } = info;
  const memberOf = experience
    .filter((e) => e.startDate && e.endDate)
    .map((e) => ({
      '@type': 'OrganizationRole',
      roleName: e.position,
      startDate: e.startDate,
      endDate: e.endDate,
      memberOf: { '@type': 'Organization', name: e.company, url: e.url },
    }));

  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: main.name,
    alternateName: [main.nameNative, 'udevelops'],
    givenName: 'Ugnius',
    familyName: 'Motiejunas',
    url: `${SITE}/`,
    image: absolute(main.photo),
    jobTitle: main.role,
    description: main.bio[0],
    email: `mailto:${main.email}`,
    nationality: { '@type': 'Country', name: 'Lithuania' },
    homeLocation: { '@type': 'Place', name: main.location },
    knowsAbout: site.knowsAbout,
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    worksFor: [{ '@id': ORG_IDS.Trimata }],
    memberOf,
    sameAs: [socials.github, socials.linkedin, socials.upwork.split('?')[0]].filter(Boolean),
  };
}

function organizationNodes() {
  return [
    {
      '@type': 'Organization',
      '@id': ORG_IDS.Trimata,
      name: 'Trimata',
      legalName: 'Trimata, MB',
      url: info.socials.trimata,
      description:
        'Interactive 3D product configurators, 3D product views with AR and 3D visualisation for manufacturers and e-shops.',
      foundingDate: '2026-11-06',
      founder: { '@id': PERSON_ID },
      address: { '@type': 'PostalAddress', addressLocality: 'Vilnius', addressCountry: 'LT' },
    },
    {
      '@type': 'Organization',
      '@id': ORG_IDS.Bonder,
      name: 'Bonder',
      url: info.socials.bonder,
      description: 'Events discovery platform and iOS app for Vilnius.',
    },
    {
      '@type': 'MobileApplication',
      name: 'Bonder - Find & Create Events',
      operatingSystem: 'iOS',
      applicationCategory: 'LifestyleApplication',
      url: info.socials.appStore,
      author: { '@id': PERSON_ID },
      publisher: { '@id': ORG_IDS.Bonder },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
  ];
}

function homeHead() {
  const { site, main } = info;
  return {
    title: site.title,
    description: site.description,
    canonical: `${SITE}/`,
    image: absolute('cover.png'),
    type: 'profile',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfilePage',
          '@id': `${SITE}/#profilepage`,
          url: `${SITE}/`,
          name: site.title,
          dateModified: TODAY,
          mainEntity: { '@id': PERSON_ID },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE}/#website`,
          url: `${SITE}/`,
          name: `${main.name} (udevelops)`,
          publisher: { '@id': PERSON_ID },
          inLanguage: 'en',
        },
        personNode(),
        ...organizationNodes(),
      ],
    },
  };
}

function projectHead(project) {
  const url = `${SITE}/project/${project.slug}/`;
  const description = project.description.length > 158
    ? `${project.description.slice(0, 155).replace(/\s+\S*$/, '')}…`
    : project.description;
  return {
    title: `${project.title} | ${info.main.name}`,
    description,
    canonical: url,
    image: absolute(project.image),
    type: 'article',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CreativeWork',
          '@id': `${url}#work`,
          name: project.title,
          url,
          description: project.details || project.description,
          image: absolute(project.image),
          keywords: project.technologies,
          author: { '@id': PERSON_ID },
          ...(project.link ? { sameAs: project.link } : {}),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: info.main.name, item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: project.title, item: url },
          ],
        },
        { ...personNode(), description: undefined },
      ],
    },
  };
}

function headHtml(head) {
  const { socials, main } = info;
  return [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    `<link rel="canonical" href="${head.canonical}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<meta property="og:site_name" content="${escapeHtml(main.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:url" content="${head.canonical}" />`,
    `<meta property="og:image" content="${head.image}" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(head.description)}" />`,
    `<meta name="twitter:image" content="${head.image}" />`,
    // rel="me" ties this site to the same person's other profiles.
    `<link rel="me" href="${socials.github}" />`,
    `<link rel="me" href="${socials.linkedin}" />`,
    `<link rel="alternate" type="text/plain" title="LLM summary" href="${SITE}/llms.txt" />`,
    jsonLd(head.schema),
  ].map((line) => `  ${line}`).join('\n');
}

function llmsTxt() {
  const { main, experience, projects, education, socials } = info;
  const lines = [
    `# ${main.name}`,
    '',
    `> ${main.bio[0]}`,
    '',
    ...main.bio.slice(1),
    '',
    '## Key facts',
    `- Name: ${main.name} (${main.nameNative})`,
    `- Role: ${main.role}`,
    `- Location: ${main.location}`,
    `- Trimata, 3D product configurators: ${socials.trimata}`,
    `- Built Bonder as full-stack engineer (Aug-Oct 2026): ${socials.bonder} (iOS app: ${socials.appStore})`,
    `- Contact: ${main.email}`,
    '',
    '## Experience',
    ...experience.map(
      (e) => `- ${e.position}, ${e.company} (${e.duration})${e.url ? `: ${e.url}` : ''}. ${e.descriptions[0]}`
    ),
    '',
    '## Education',
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.duration})`),
    '',
    '## Projects',
    ...projects.map((p) => `- [${p.title}](${SITE}/project/${p.slug}/): ${p.description}`),
    '',
    '## Profiles',
    `- Website: ${SITE}/`,
    `- GitHub: ${socials.github}`,
    `- LinkedIn: ${socials.linkedin}`,
    `- Upwork: ${socials.upwork.split('?')[0]}`,
    '',
  ];
  return lines.join('\n');
}

function sitemapXml() {
  const urls = routes.map((route) => {
    const loc = `${SITE}${route}`;
    const priority = route === '/' ? '1.0' : '0.8';
    return `  <url><loc>${loc}</loc><lastmod>${TODAY}</lastmod><priority>${priority}</priority></url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

const robotsTxt = `# Search engines and AI assistants are welcome to read and cite this site.
User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

async function main() {
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const seoBlock = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
  if (!seoBlock.test(template)) throw new Error('index.html is missing the <!--seo:start--> block');
  if (!template.includes('<div id="root"></div>')) throw new Error('index.html is missing <div id="root"></div>');

  for (const route of routes) {
    const slug = route.match(/^\/project\/([^/]+)\/$/)?.[1];
    const project = slug ? info.projects.find((p) => p.slug === slug) : null;
    const head = project ? projectHead(project) : homeHead();
    const appHtml = render(route);
    if (!appHtml || appHtml.length < 500) throw new Error(`Prerender of ${route} produced almost no HTML`);

    const html = template
      .replace(seoBlock, headHtml(head).trimStart())
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const outDir = path.join(distDir, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
    process.stdout.write(`prerendered ${route} (${Math.round(html.length / 1024)} KB)\n`);
  }

  await writeFile(path.join(distDir, 'sitemap.xml'), sitemapXml());
  await writeFile(path.join(distDir, 'robots.txt'), robotsTxt);
  await writeFile(path.join(distDir, 'llms.txt'), llmsTxt());
  await rm(ssrDir, { recursive: true, force: true });
  process.stdout.write('wrote sitemap.xml, robots.txt, llms.txt\n');
}

main().catch((error) => {
  process.stderr.write(`prerender failed: ${error.stack || error}\n`);
  process.exit(1);
});
