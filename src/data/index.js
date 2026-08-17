import janeStreetLogo from '../assets/js_logo.jpg';
import stripeLogo from '../assets/stripe_logo.png';
import bloombergLogo from '../assets/bloomberg_logo.jpeg';

export const personal = {
  name: 'June Guo!',
  location: 'Philadelphia, PA',
  email: 'juneguo@seas.upenn.edu',
  github: 'https://github.com/juneguo257',
  githubHandle: '@juneguo257',
  linkedin: 'https://www.linkedin.com/in/june-guo-4b783527a/',
  linkedinHandle: 'in/june-guo',
  tagline:
    "CS @ Penn, systems concentration. Loves teaching and building cool things! Part of CIS 1200 & Penn Labs.",
};

export const education = {
  school: 'University of Pennsylvania',
  schoolDetail: 'School of Engineering & Applied Science',
  degree: 'B.S.E, Computer Science · Systems Concentration',
  location: 'Philadelphia, PA',
  graduation: 'May 2027',
  coursework: [
    'Operating Systems',
    'Internet & Web Systems',
    'Scalable and Cloud Computing',
    'Database & Info Systems',
  ],
};

export const experiences = [
  {
    company: 'Jane Street',
    logo: janeStreetLogo,
    logoBg: '#ffffff',
    role: 'Software Engineer Intern',
    period: 'May 2026',
    location: 'New York, NY',
    accent: 'Incoming · Summer 2026',
  },
  {
    company: 'Stripe',
    logo: stripeLogo,
    logoBg: '#635cff',
    idleBorder: '#635cff',
    role: 'Software Engineer Intern',
    period: 'May — Aug 2025',
    location: 'Seattle, WA',
    summary: 'Designed and implemented an automatic replay testing framework.',
  },
  {
    company: 'Bloomberg',
    logo: bloombergLogo,
    logoBg: '#000000',
    idleBorder: '#316072',
    borderWidth: '1px',
    role: 'Software Engineer Intern',
    period: 'Jun — Aug 2024',
    location: 'New York, NY',
    summary:
      'Constructed a workflow to make it easier to make large updates to routing configurations.',
  },
  {
    company: 'Bloomberg',
    logo: bloombergLogo,
    logoBg: '#000000',
    idleBorder: '#605d38',
    borderWidth: '1px',
    role: 'Software Engineer Intern',
    period: 'Jun — Aug 2023',
    location: 'Princeton, NJ',
    summary:
      'Created a Visual Studio Code extension to let users easily modify internal stream functions.',
  },
];

export const projects = [
  {
    name: 'Bumblewrap',
    link: 'https://github.com/juneguo257/bumblewrap',
    stack: ['eBPF', 'Python', 'C', 'Linux'],
    description: 'Bubblewrap, but eBPF.',
    points: [
      'Engineered a high-performance Linux sandbox via eBPF LSM and syscall probes, with a dynamic control interface (bumblewrapctl) to inject and revoke filesystem and syscall restrictions at runtime via BPF maps.',
    ],
  },
  {
    name: 'Search Engine',
    stack: ['Java', 'AWS'],
    description: 'A cloud-based web search engine, built fully from scratch.',
    points: [
      'Built the distributed web crawler that fans out across EC2 workers, dedupes URLs against a custom KV store, and streams raw HTML downstream for indexing.',
    ],
  },
  {
    name: 'PennOS',
    stack: ['C'],
    description: 'A complete UNIX-like operating system, built from scratch.',
    points: [
      'Priority-based process scheduler, FAT-style file system, and a custom shell with piping and job control.',
    ],
  },
  {
    name: 'Instalite',
    stack: ['AWS', 'JavaScript', 'React', 'Kubernetes'],
    description: 'A social media platform deployed across a Kubernetes cluster on AWS EC2.',
    points: [
      'S3 for media, RDS for structured user data, ChromaDB for recommendations, EMR + Livy for social graph-based ranking, React for frontend.',
    ],
  },
];

export const skills = {
  Languages: ['Java', 'C', 'C++', 'Python', 'OCaml', 'TypeScript', 'SQL'],
  Technologies: [
    'AWS (EC2, EMR, DynamoDB, RDS, S3)',
    'Docker',
    'Kubernetes',
    'Spark',
    'Airflow',
    'Git',
  ],
};
