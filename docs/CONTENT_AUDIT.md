# Resume content audit

Sole factual source: `Shristy_Priyadarshini_Resume.pdf`, the supplied one-page replacement resume, preserved as `public/resume.pdf`. The former resume is no longer a source. Portfolio data lives in `src/data/resume.ts`.

## Identity and summary

- `Shristy Priyadarshini`, `Software Engineer`, `Java Backend`, `India`, `Open to Relocation`, and `5+ years` come from the replacement resume.
- Email: `priyadarshinishristy@gmail.com`.
- LinkedIn: `https://www.linkedin.com/in/shristy-priyadarshini-395548152`; the source provides the complete domain and profile path.
- Summary and positioning adapt the resume's Java, Spring Boot, REST API, enterprise integration, file-transfer reliability, secure cloud asset delivery, database migration, automated testing, and connector-release work.
- The phone number is omitted from displayed website content as requested. It remains in the downloadable resume.
- No photographs, testimonials, awards, personal projects, client names, salary, unsupported professional title, or unsupported outcomes are added.

## Technical skills

All six source groups and all 29 source skill entries are retained. No ratings or proficiency percentages are attached.

| Source group | Export ID | Retained entries |
| --- | --- | --- |
| Languages and Backend | `backend` | Java (8/11/17), SQL, JavaScript, Spring Boot, REST APIs, Hibernate/JPA |
| Databases and Cloud | `cloud` | SQL Server, MySQL, query optimization, indexing, AWS S3, CloudFront, Rekognition |
| CI/CD and Development | `delivery` | GitHub Actions, Jenkins, Git, Maven, Azure DevOps (work tracking) |
| Environment Validation | `validation` | Kubernetes (pod logs and preview-environment instances) |
| Testing and Security | `quality` | JUnit, Mockito, JaCoCo, SonarCloud, CodeQL, Dependabot, WebdriverIO, Cucumber |
| AI Development Tools | `ai-tools` | GitHub Copilot, Cursor |

Azure DevOps is scoped explicitly to work tracking. Kubernetes is scoped explicitly to pod logs and preview-environment instances. Neither is presented as broader infrastructure or deployment ownership. Technologies in experience/case-study arrays may also include technologies named in the source experience bullets, such as IBM Aspera, Nuxeo, nuxeo-ai, Sybase, and Cucumber/Gherkin. React is a website implementation dependency, not a claimed resume skill.

## Professional experience and case studies

All three employers, roles, India locations, and displayed dates are retained exactly. The replacement resume does not list company or role domains; those fields are omitted. Machine-readable `periodStart` values are derived from the stated month/year.

All 12 source experience bullets are retained: eight at Hyland Software, three at Accenture, and one at DXC Technology.

| Source bullet | Data mapping | Factual scope |
| --- | --- | --- |
| Hyland 1: Java-based IBM Aspera transfer improvements | `experience[0].bullets[0]`, `content-transfer` | Pause/resume, transfer-state and interruption handling, background processing, and reliability for large files/folders. No reliability percentage added. |
| Hyland 2: folder-download and metadata defects | `experience[0].bullets[1]`, `content-transfer` | LTS 2023 and LTS 2025, upload/transfer/download reproduction, and S3 transient-storage corrections. |
| Hyland 3: RSA-signed CloudFront delivery | `experience[0].bullets[2]`, `secure-asset-delivery` | Nuxeo asset delivery, continued access to cached content during server downtime, Lambda-fallback replacement, preview-environment validation. No uptime or cost metric added. |
| Hyland 4: nuxeo-ai workflows | `experience[0].bullets[3]`, `nuxeo-ai-workflows` | Implementation and testing of image tagging, image/video descriptions, and video transcription. No model provider or workflow architecture inferred. |
| Hyland 5: multi-module coverage and guidance | `experience[0].bullets[4]`, `java-coverage` | JaCoCo, Maven aggregation, SonarCloud, unit tests, `above 95%` coverage, and documented Java/JavaScript reporting and quality-gate guidance. No Istanbul/nyc claim or universal repository-wide coverage assertion. |
| Hyland 6: security remediation | `experience[0].bullets[5]`, `secure-delivery` | CodeQL, Dependabot, dependencies, insecure protocols, escaping defects, workflow permission gaps, high-severity alerts, PR/CI verification. |
| Hyland 7: end-to-end releases | `experience[0].bullets[6]`, `connector-releases` | LTS 2023/2025, version/branch validation, sanity tests, documentation, GitHub Actions/Jenkins troubleshooting. |
| Hyland 8: 3D Viewer functional tests | `experience[0].bullets[7]`, `viewer-testing` | JavaScript, WebdriverIO, Cucumber/Gherkin, selectors, timeout handling, rendering-dependent CI tests. No test-count metric appears in this source. |
| Accenture 1: backend migration support | `experience[1].bullets[0]`, `backend-modernization` | Java/Spring Boot, enterprise migration from Sybase to SQL Server, improved target-platform compatibility. No sole ownership or maintainability claim added. |
| Accenture 2: APIs and data access | `experience[1].bullets[1]` | Spring Boot, SQL Server, MySQL, REST APIs, data-access functionality. |
| Accenture 3: SQL optimization | `experience[1].bullets[2]`, `backend-modernization` | Queries, indexing, processing efficiency, application responsiveness. No latency benchmark added. |
| DXC 1: task-management application | `experience[2].bullets[0]` | Spring Boot services, SQL Server data access, internal tracking/task management, created/documented REST APIs. |

Eight case studies present selected professional engineering work. Every card identifies its employer in the data. Challenge, approach, technologies, and results restate the source's documented scope. They are not described as personal projects. The nuxeo-ai card uses only the workflow name as a technology; no connection to Rekognition is inferred from the separate skills list.

`above 95%` is the source's only engineering-performance metric and is preserved exactly. `5+ years` remains the experience-duration statement. The old `10+ scenarios` metric has been removed.

## Career journey

The journey presents DXC Technology → Accenture → Hyland Software in chronological order, retaining exact roles and dates. Focus labels summarize only the replacement resume's documented responsibilities and do not infer promotions or motivations.

## Certifications and education

Both certification strings are retained exactly:

- `Microsoft Certified: Azure Developer Associate (AZ-204)`
- `Azure Administrator Associate (AZ-104)`

The second name is not prefixed with an additional `Microsoft Certified:` because the source does not include it. No IDs, expiration dates, certification logos, or verification claims are added.

Education is preserved as `B.Tech in Computer Science`, `Amity University, Jharkhand`, `2021`, `CGPA: 9.2/10`. The stored CGPA value is `9.2/10`; `CGPA:` is the presentation label.

## Replacement audit

Facts supported only by the previous resume have been removed: employer industry domains, the broader title specialization, HTML5/CSS3, JSON/XML, Docker/Helm, general Microsoft Azure skill, Bitbucket/Postman/Jira, Istanbul/nyc, Media Manipulation, Data Structures & Algorithms, System Design, Claude/ChatGPT Enterprise/M365 Copilot/Atlassian ROVO, React frontend responsibilities, the `10+` test count, Azure Fundamentals, and Jira Fundamentals.

The replacement retains all source employers, roles, locations, dates, 12 experience bullets, 29 skill entries, two certifications, education, available professional links, and stated metrics. Only the phone number is intentionally omitted from displayed contact details. Missing company domains and unlisted contact values are omitted rather than replaced with placeholders.

Editorial headings and abstract infrastructure diagrams may summarize documented work themes, but must not add professional claims. SEO and social metadata must use the replacement resume's Java Backend specialization. The deployment URL remains omitted until configured in `site.config.mjs`.
