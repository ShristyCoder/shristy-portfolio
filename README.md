# Shristy Priyadarshini · Portfolio

A complete static portfolio built with React, TypeScript, Vite, Tailwind CSS, React Three Fiber, Drei, Framer Motion, and Lucide. The content is derived only from the replacement **Shristy_Priyadarshini_Resume.pdf**; that PDF is included unchanged for download. The engineering work cards describe professional work, not personal projects.

## Run locally

Install **Node.js 22.12 or newer** and npm. In this project's directory, run:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To compile the production website:

```sh
npm run build
```

The build first checks TypeScript and then writes the deployable static website to `dist/`. To inspect that build locally:

```sh
npm run preview
```

`npm run typecheck` runs the TypeScript check separately. A committed `package-lock.json` makes `npm ci` available for reproducible CI installs. The site needs no API keys, backend, database, authentication, paid assets, or runtime services. All fonts and assets are served locally.

## Project structure

```text
.
├── src/
│   ├── App.tsx                    # Sections, interactions, and navigation
│   ├── main.tsx                   # Application entry and recovery boundary
│   ├── styles.css                 # Responsive visual system and motion rules
│   ├── data/resume.ts             # Resume-derived typed portfolio content
│   ├── hooks/useActiveSection.ts  # Active anchor navigation
│   └── components/
│       ├── AppBoundary.tsx        # Contact/resume recovery on application error
│       ├── EngineeringVisual.tsx  # Capability checks and CSS fallback
│       ├── HeroScene.tsx          # Lazy-loaded infrastructure visualization
│       └── Primitives.tsx         # Reveal, magnetic link, tilt, section heading
├── docs/
│   ├── CONTENT_AUDIT.md           # Resume-to-site factual mapping
│   └── VERIFICATION.md            # Build and browser checks performed
├── public/
│   ├── resume.pdf                 # Unmodified source resume
│   ├── favicon.svg                # Authored vector mark
│   ├── social-card.svg            # Editable social card source
│   ├── social-card.png            # 1200 × 630 social preview
│   └── licenses/                  # Local font licenses
├── scripts/seo.mjs                # Build-time SEO generation
├── site.config.mjs                # Metadata and canonical URL configuration
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.cjs
├── tsconfig*.json
├── package.json
├── package-lock.json
├── netlify.toml
├── vercel.json
└── .github/workflows/deploy-pages.yml
```

## Content and assets

`src/data/resume.ts` holds the visible professional information. Keep changes grounded in an updated resume. Missing values are omitted, and the resume's phone number is not promoted in the interface. The LinkedIn destination is the complete hyperlink embedded in the PDF. `public/resume.pdf` is the replacement Shristy_Priyadarshini_Resume.pdf, copied without modification. The preceding resume has been superseded throughout the portfolio.

The visuals are authored CSS, SVG, and procedural Three.js geometry. No stock photos, external models, or proprietary assets are used. Manrope and Space Grotesk are locally packaged open fonts; their OFL licenses are included in `public/licenses/` and their respective `@fontsource-variable` packages. UI icons come from Lucide.

## Canonical URL and SEO

The single deployment URL setting is `siteUrl` in **`site.config.mjs`**. It is intentionally empty because no public deployment URL was supplied. Once the site has its final HTTPS address, set that value to the complete address, including a repository subpath when applicable, and rebuild. The optional build-time environment variable `SITE_URL` overrides the same setting. Do not set it to a preview URL when that preview should canonicalize to the production site.

The Vite plugin generates the page title, description, Open Graph and Twitter metadata, `Person`/`ProfilePage` JSON-LD, `dist/robots.txt`, and `dist/sitemap.xml`. Until a real URL is configured, canonical and absolute social-image URL tags are omitted, `robots.txt` has no Sitemap directive, and the sitemap is a valid empty URL set. No fake domain is shipped. After configuration, the sitemap contains the portfolio's single canonical page and metadata uses the included PNG social preview. Structured data is present even before a deployment URL is configured and uses only resume-derived facts.

All navigation uses section anchors. Vite's default `base: './'` allows the built assets to be served from a hosting subdirectory. If building for a known repository subpath, set `VITE_BASE` to that path with a trailing slash. The included GitHub workflow obtains both the base path and site URL from GitHub automatically.

## Free deployment

The output is static and can use the hosts' free offerings. A personal domain is optional; the host-provided address works. Choose one host. No backend configuration or secrets are needed for the website itself.

### Cloudflare Pages

1. Put the project files in a GitHub or GitLab repository.
2. In Cloudflare, open **Workers & Pages → Create application → Pages → Import an existing Git repository** and select the repository.
3. Set the framework preset to **React (Vite)**, build command to `npm run build`, and output directory to `dist`. If the project lives inside a larger repository, set the root directory to this project's folder.
4. Set the build environment's Node version to `22` if needed, then deploy.
5. Copy the production Pages address into `site.config.mjs`, or set `SITE_URL` as a production build environment variable, and redeploy.

Alternatively, run `npm run build` locally and create a **Direct Upload** Pages project by dragging the `dist` folder into the dashboard. Set the canonical URL and rebuild before the final upload.

Official references: [Cloudflare build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) and [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

### Netlify

1. Push the project to a Git repository and import it into Netlify using its Git integration.
2. The included `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and Node version to `22`.
3. If importing from a larger repository, set Netlify's base directory to this project's folder.
4. Deploy, then configure the final site address in `site.config.mjs` or a `SITE_URL` environment variable and redeploy.

For a manual deployment, build locally and upload the `dist` folder using Netlify's drag-and-drop deployment. Configure the canonical address and rebuild for the final upload. The single-page site uses hash navigation, so no SPA redirect rule is required.

Official reference: [Netlify's Vite build settings](https://docs.netlify.com/build/frameworks/overview/#vite).

### Vercel

1. Push the project to a Git repository and import it as a new Vercel project.
2. Select the **Vite** framework preset. The included `vercel.json` sets `npm run build` and the `dist` output directory.
3. Use Node `22.x` in the project's build settings. Set the root directory if these files are inside a larger repository.
4. Deploy, then set the final production address in `site.config.mjs` or as the production `SITE_URL` environment variable and redeploy.

Official reference: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite).

### GitHub Pages

1. Put these project files at the root of a **public** GitHub repository for GitHub Free. Commit the provided workflow and lockfile.
2. In the repository's **Settings → Pages**, choose **GitHub Actions** as the build/deployment source.
3. Push to the `main` branch or run **Deploy portfolio to GitHub Pages** from the Actions tab. Change the workflow's branch if your default branch differs.
4. The workflow installs with `npm ci`, builds, uploads `dist`, and deploys it. GitHub's `configure-pages` outputs automatically supply the correct subpath and canonical site URL, including custom domains configured through GitHub Pages settings.

The workflow requires only GitHub's built-in token and Pages permissions, already declared in the YAML. If using a different manual Pages workflow, build with `VITE_BASE` set to your repository subpath and `SITE_URL` set to the final Pages URL. An account-level Pages repository or custom domain uses `/` as its base path.

Official references: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Vite static deployment](https://vite.dev/guide/static-deploy.html).

## Accessibility and performance

The semantic page uses visible focus styles, a skip link, accessible mobile navigation, real links, expandable experience cards, and clipboard feedback. The 3D scene is decorative; the full portfolio remains usable without it. Heavy rendering is lazy-loaded and simplified or replaced by the authored fallback for mobile, reduced motion, limited devices, or unavailable WebGL. Animation pauses outside the hero viewport and when the page is hidden.

To review the result after changes, check desktop and mobile widths, use Tab/Enter/Escape through navigation and expandable cards, enable your operating system's reduced-motion setting, disable WebGL to verify the fallback, and confirm the resume download and contact links. Run `npm run build` after every content or configuration change. The canonical URL and metadata can be checked directly in `dist/index.html`; the sitemap and robots file are emitted alongside it.

The default build targets modern browsers and has no remote font or asset requests. Only the procedural 3D scene needs WebGL; the HTML, content, and CSS fallback do not.
