/**
 * Content transcribed or concisely adapted from Shristy_Priyadarshini_Resume.pdf.
 * This one-page PDF is the sole source of personal and professional facts.
 */
export interface Profile {
  name: string;
  title: string;
  specialization: string;
  location: string;
  relocation: string;
  email: string;
  linkedin?: string;
  summary: string;
  positioning: string;
  yearsLabel: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export interface Experience {
  id: string;
  company: string;
  companyDomain?: string;
  location: string;
  role: string;
  roleDomain?: string;
  dates: string;
  periodStart: string;
  bullets: string[];
  technologies: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  company: string;
  category: string;
  title: string;
  summary: string;
  challenge: string;
  approach: string;
  technologies: string[];
  result: string;
  metric?: string;
}

export interface Education {
  degree: string;
  university: string;
  year: string;
  cgpa: string;
}

export interface CareerStage {
  company: string;
  role: string;
  dates: string;
  focus: string;
}

export const profile: Profile = {
  name: 'Shristy Priyadarshini',
  title: 'Software Engineer',
  specialization: 'Java Backend',
  location: 'India',
  relocation: 'Open to Relocation',
  email: 'priyadarshinishristy@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shristy-priyadarshini-395548152',
  summary:
    'I build Java and Spring Boot backends, REST APIs, and enterprise integrations. With 5+ years of experience, my work spans reliable file transfers, secure cloud asset delivery, database migration, automated testing, and end-to-end connector releases.',
  positioning:
    'Java backends and enterprise integrations, with reliable transfers, secure cloud delivery, and tested releases.',
  yearsLabel: '5+ years',
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Languages and Backend',
    items: ['Java (8/11/17)', 'SQL', 'JavaScript', 'Spring Boot', 'REST APIs', 'Hibernate/JPA'],
  },
  {
    id: 'cloud',
    title: 'Databases and Cloud',
    items: ['SQL Server', 'MySQL', 'query optimization', 'indexing', 'AWS S3', 'CloudFront', 'Rekognition'],
  },
  {
    id: 'delivery',
    title: 'CI/CD and Development',
    items: ['GitHub Actions', 'Jenkins', 'Git', 'Maven', 'Azure DevOps (work tracking)'],
  },
  {
    id: 'validation',
    title: 'Environment Validation',
    items: ['Kubernetes (pod logs and preview-environment instances)'],
  },
  {
    id: 'quality',
    title: 'Testing and Security',
    items: ['JUnit', 'Mockito', 'JaCoCo', 'SonarCloud', 'CodeQL', 'Dependabot', 'WebdriverIO', 'Cucumber'],
  },
  {
    id: 'ai-tools',
    title: 'AI Development Tools',
    items: ['GitHub Copilot', 'Cursor'],
  },
];

export const experience: Experience[] = [
  {
    id: 'hyland',
    company: 'Hyland Software',
    location: 'India',
    role: 'Developer 2',
    dates: 'Jul 2025 - Present',
    periodStart: '2025-07',
    bullets: [
      'Enhanced the Java-based IBM Aspera connector’s pause/resume behavior, transfer-state handling, interruption handling, and background processing to improve reliability for large file and folder transfers.',
      'Resolved hierarchical folder-download and metadata-mapping defects across LTS 2023 and LTS 2025 by reproducing upload, transfer, and download workflows and correcting S3 transient-storage configuration issues.',
      'Implemented RSA-signed AWS CloudFront URLs for Nuxeo asset delivery to support continued access to cached content during server downtime; replaced a Lambda-based URL-generation fallback and validated the flow in preview environments.',
      'Implemented and tested nuxeo-ai workflows for image tagging, image and video description generation, and video transcription.',
      'Built multi-module Java coverage reporting with JaCoCo, Maven aggregation, and SonarCloud; maintained above 95% coverage with unit tests and documented Java/JavaScript reporting and quality-gate guidance.',
      'Remediated CodeQL, Dependabot, and dependency security findings, including insecure protocols, escaping defects, workflow permission gaps, and high-severity alerts; verified fixes through pull requests and CI builds.',
      'Owned end-to-end connector releases across LTS 2023 and LTS 2025, including version and branch validation, sanity testing, release documentation, and troubleshooting GitHub Actions and Jenkins workflows.',
      'Automated and stabilized functional tests for the 3D Viewer connector using JavaScript, WebdriverIO, and Cucumber/Gherkin, improving selectors and timeout handling for rendering-dependent CI tests.',
    ],
    technologies: ['Java', 'IBM Aspera', 'AWS CloudFront', 'AWS S3', 'Nuxeo', 'nuxeo-ai', 'JaCoCo', 'Maven', 'SonarCloud', 'GitHub Actions', 'Jenkins', 'WebdriverIO'],
  },
  {
    id: 'accenture',
    company: 'Accenture',
    location: 'India',
    role: 'Java Full Stack Developer',
    dates: 'Oct 2021 - Jul 2025',
    periodStart: '2021-10',
    bullets: [
      'Modernized Java and Spring Boot backend components to support an enterprise migration from Sybase to SQL Server, improving compatibility with the target database platform.',
      'Developed and maintained REST APIs and data-access functionality using Spring Boot, SQL Server, and MySQL.',
      'Optimized SQL queries and indexing strategies to improve data-processing efficiency and application responsiveness.',
    ],
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'Sybase', 'SQL Server', 'MySQL'],
  },
  {
    id: 'dxc',
    company: 'DXC Technology',
    location: 'India',
    role: 'Java Full Stack Developer',
    dates: 'May 2021 - Oct 2021',
    periodStart: '2021-05',
    bullets: [
      'Developed Spring Boot services and SQL Server data-access components for an internal tracking and task-management application; created and documented REST APIs for task-management workflows.',
    ],
    technologies: ['Spring Boot', 'SQL Server', 'REST APIs'],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'content-transfer',
    number: '01',
    company: 'Hyland Software',
    category: 'Enterprise integrations',
    title: 'Reliable enterprise content transfer',
    summary: 'Enhanced IBM Aspera transfer behavior for large files and folders.',
    challenge: 'Pause/resume behavior, interrupted transfers, hierarchical folder downloads, and metadata mapping across LTS 2023 and LTS 2025.',
    approach: 'Enhanced transfer-state handling and background processing; reproduced upload, transfer, and download workflows to correct folder-download defects, metadata mapping, and S3 transient-storage configuration.',
    technologies: ['Java', 'IBM Aspera', 'AWS S3'],
    result: 'Enhanced transfer behavior and resolved hierarchical folder-download and metadata-mapping defects.',
  },
  {
    id: 'secure-asset-delivery',
    number: '02',
    company: 'Hyland Software',
    category: 'Cloud asset delivery',
    title: 'Signed delivery for cached content',
    summary: 'Implemented RSA-signed AWS CloudFront URLs for Nuxeo asset delivery.',
    challenge: 'Supporting continued access to cached content during server downtime and replacing a Lambda-based URL-generation fallback.',
    approach: 'Implemented RSA-signed CloudFront URLs, replaced the fallback, and validated the asset-delivery flow in preview environments.',
    technologies: ['AWS CloudFront', 'RSA-signed URLs', 'Nuxeo'],
    result: 'Implemented and validated a signed-URL delivery flow to support cached-content access during server downtime.',
  },
  {
    id: 'nuxeo-ai-workflows',
    number: '03',
    company: 'Hyland Software',
    category: 'AI workflows',
    title: 'Image and video AI workflows',
    summary: 'Implemented and tested nuxeo-ai workflows for image and video content.',
    challenge: 'Image tagging, image and video description generation, and video transcription in nuxeo-ai workflows.',
    approach: 'Implemented and tested nuxeo-ai image tagging, image and video description generation, and video transcription.',
    technologies: ['nuxeo-ai'],
    result: 'Implemented and tested image tagging, image and video description generation, and video transcription workflows.',
  },
  {
    id: 'java-coverage',
    number: '04',
    company: 'Hyland Software',
    category: 'Coverage reporting',
    title: 'Multi-module coverage and quality guidance',
    summary: 'Built aggregated Java coverage and documented Java/JavaScript reporting guidance.',
    challenge: 'Java coverage reporting across multiple modules, with Java/JavaScript reporting and quality-gate guidance.',
    approach: 'Combined JaCoCo, Maven aggregation, SonarCloud, and unit tests; documented Java/JavaScript reporting and quality-gate guidance.',
    technologies: ['Java', 'JavaScript', 'JaCoCo', 'Maven', 'SonarCloud'],
    result: 'Maintained above 95% coverage with unit tests and documented reporting and quality-gate guidance.',
    metric: 'above 95%',
  },
  {
    id: 'secure-delivery',
    number: '05',
    company: 'Hyland Software',
    category: 'Secure software delivery',
    title: 'Security remediation and CI validation',
    summary: 'Remediated code, dependency, and workflow security findings.',
    challenge: 'Insecure protocols, escaping defects, workflow permission gaps, and high-severity alerts.',
    approach: 'Remediated CodeQL, Dependabot, and dependency findings, verifying fixes through pull requests and CI builds.',
    technologies: ['CodeQL', 'Dependabot'],
    result: 'Verified fixes for code, dependency, and workflow security findings through pull requests and CI builds.',
  },
  {
    id: 'connector-releases',
    number: '06',
    company: 'Hyland Software',
    category: 'Release engineering',
    title: 'End-to-end connector release ownership',
    summary: 'Owned connector releases across LTS 2023 and LTS 2025.',
    challenge: 'Version and branch validation, sanity testing, release documentation, and workflow troubleshooting across two LTS streams.',
    approach: 'Owned release activities from validation and sanity testing through documentation; troubleshot GitHub Actions and Jenkins workflows.',
    technologies: ['GitHub Actions', 'Jenkins'],
    result: 'Owned end-to-end connector releases across LTS 2023 and LTS 2025.',
  },
  {
    id: 'viewer-testing',
    number: '07',
    company: 'Hyland Software',
    category: 'Test automation',
    title: 'Rendering-dependent test stability',
    summary: 'Automated and stabilized functional tests for the 3D Viewer connector.',
    challenge: 'Selectors and timeout handling for rendering-dependent CI tests.',
    approach: 'Automated and stabilized functional tests with JavaScript, WebdriverIO, and Cucumber/Gherkin, improving selectors and timeout handling.',
    technologies: ['JavaScript', 'WebdriverIO', 'Cucumber/Gherkin', '3D Viewer'],
    result: 'Improved selectors and timeout handling for rendering-dependent CI tests.',
  },
  {
    id: 'backend-modernization',
    number: '08',
    company: 'Accenture',
    category: 'Backend engineering',
    title: 'Backend and database modernization',
    summary: 'Modernized Java backends to support an enterprise Sybase-to-SQL Server migration.',
    challenge: 'Backend compatibility with the target database platform, alongside data-processing efficiency and application responsiveness.',
    approach: 'Modernized Java and Spring Boot components to support the migration; optimized SQL queries and indexing strategies.',
    technologies: ['Java', 'Spring Boot', 'Sybase', 'SQL Server', 'SQL'],
    result: 'Improved target-database compatibility and optimized SQL queries and indexing for data-processing efficiency and application responsiveness.',
  },
];

export const certifications: string[] = [
  'Microsoft Certified: Azure Developer Associate (AZ-204)',
  'Azure Administrator Associate (AZ-104)',
];

export const education: Education = {
  degree: 'B.Tech in Computer Science',
  university: 'Amity University, Jharkhand',
  year: '2021',
  cgpa: '9.2/10',
};

const careerFocus: Record<string, string> = {
  dxc: 'Spring Boot services and task-management APIs',
  accenture: 'Java backends and database migration',
  hyland: 'Enterprise integrations, cloud asset delivery, and connector releases',
};

export const careerJourney: CareerStage[] = [...experience].reverse().map((item) => ({
  company: item.company,
  role: item.role,
  dates: item.dates,
  focus: careerFocus[item.id],
}));
