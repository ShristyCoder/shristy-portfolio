# Verification

Reverified on 12 October 2026 after replacing the factual source with Shristy_Priyadarshini_Resume.pdf.

## Content

- The one-page replacement resume is the sole factual source. See `CONTENT_AUDIT.md` for the complete source-to-content mapping.
- All 3 roles, 12 experience bullets, 29 technical skill entries, 2 certifications, education, dates, and resume metrics are represented through visible sections and accessible disclosures.
- The source and production PDF downloads are byte-for-byte identical to the replacement supplied file.
- The actual LinkedIn destination was recovered from the PDF hyperlink. Email and relocation wording match the resume.
- No personal projects, unsupported outcomes, ratings, testimonials, photographs, or fake values were added. Phone contact is omitted from displayed content.

## Build and development

- Dependency installation completed successfully, with a committed lockfile.
- `npm run dev` started successfully with Vite.
- `npm run build` passed TypeScript checks and produced the complete static `dist/` output.
- Production preview served successfully with `npm run preview`.
- The project requires no backend, database, authentication, API key, paid service, or remote asset request.

## Browser checks

Checked the actual production website in Chromium at 320 × 750, 390 × 844, 768 × 1024, 1440 × 1000, and 1920 × 1080. All widths passed with no horizontal overflow or JavaScript runtime errors. Desktop hero and detailed cards, mobile hero, expertise, certifications, education, and contact were visually inspected.

- The work disclosure reveals all 8 professional case studies.
- Case-study and experience disclosures open using Enter; all 12 experience bullets are retained.
- Expertise filters display Backend: 1, Delivery: 3, Quality & AI: 2, All layers: 6 categories. Kubernetes and Azure DevOps scope labels match the replacement resume.
- Mobile navigation opens from the keyboard, closes with Escape, and closes after anchor navigation.
- The skip link is the first Tab target and has a visible focus outline.
- The email copy action writes the exact email to the clipboard and announces success.
- Email links use `mailto:`; LinkedIn uses the complete source URL; the resume download returns a valid PDF.
- The 3D scene renders actual WebGL frames on supported desktops. Measured draw calls stop while the hero is outside the viewport.
- Mobile and reduced-motion preferences render the CSS illustration without mounting a Canvas.
- Disabling WebGL renders the static fallback. Live WebGL context loss replaces the Canvas with the fallback.
- Reduced motion disables smooth scrolling and transform-based interactions.

## Prior design performance baseline

The following Lighthouse 12.8.2 measurements were recorded before the resume replacement, using standard simulated mobile and desktop settings. They are retained as a baseline for the unchanged rendering implementation, rather than claimed as a fresh measurement of this content revision. The replacement build and browser checks above were rerun successfully.

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 98 | 99 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |

Both audits recorded a cumulative layout shift of 0. Mobile fetched the main JavaScript, CSS, and two local font files, with no Three.js/hero chunk request. The heavy scene is a separate lazy bundle: approximately 252.5 KB compressed. No external models or texture assets are loaded.

A wordmark label warning was addressed by using the link's native visible text as its accessible name, with a visually hidden full name and back-to-top description.
The final targeted axe check returned no violations on desktop or mobile.

## Replacement-specific checks

- The rendered portfolio contains the new nuxeo-ai case study and its documented image/video workflow scope.
- The signed-delivery case includes support for cached-content access during server downtime.
- Hibernate/JPA and Mockito appear in the technical skills.
- The prior Cloud & Platform Engineering title, company industry domains, React responsibilities, 10+ test-count metric, obsolete skill entries, Azure Fundamentals, and Jira Fundamentals are absent from rendered content.
- Both certification strings match the replacement resume exactly.
- Person structured data now uses the title Software Engineer | Java Backend. The social card and page metadata match the updated focus.
- No new providers, workflow architectures, performance metrics, or availability guarantees were inferred.

## Deployment metadata

- Build output contains the title, professional description, Open Graph/Twitter metadata, resume-derived Person/ProfilePage JSON-LD, favicon, social preview PNG, robots file, and sitemap.
- The GitHub Pages address returned for `ShristyCoder/shristy-portfolio` is configured in `site.config.mjs`. Build output now includes its canonical, social image, and sitemap URLs. The workflow supplies the repository base path for assets and resume downloads.
- SEO generation was also checked with a temporary subdirectory URL: canonical, social-image, sitemap, and robots URLs resolved correctly. Invalid deployment URLs are rejected.
- Instructions and configuration are included for Cloudflare Pages, Netlify, Vercel, and GitHub Pages. These instructions were checked against the hosts' official documentation.

To reproduce Lighthouse audits, run `npm run build`, start `npm run preview`, and audit its local URL with Chrome's Lighthouse panel or the Lighthouse CLI. Scores can vary with browser version, hosting, network, and device conditions.
