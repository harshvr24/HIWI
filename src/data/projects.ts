export interface Project {
  id: string;
  name: string;
  slug: string;
  industry: string;
  description: string;
  role: string;
  approach: string; // case-study paragraphs, separated by \n\n
  keyFeatures: string[];
  tech: string[];
  websiteUrl: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "01",
    name: "VEXAGON CLOUDS",
    slug: "vexagon-clouds",
    industry: "Cloud Services & Consulting",
    description:
      "A corporate website for an AWS-focused cloud consultancy helping startups and enterprises adopt cloud and AI.",
    role: "Website Design & Development",
    approach:
      "Vexagon Clouds is an AWS-focused cloud consultancy that partners with startups, scale-ups, and enterprises on cloud architecture, migration, AI adoption, and ongoing optimization. The company needed a website that could present technical services to a business audience — credible enough for enterprise clients, clear enough for founders evaluating their first cloud partner.\n\nHIWI designed and developed the site around the way Vexagon actually engages clients: six core service areas, a five-step engagement methodology (Assess, Architect, Migrate, Optimize, Support), and detailed case studies that let the work speak for itself. The structure guides a visitor from understanding the services to seeing the proof to booking a consultation.\n\nThe site was built with Next.js and React, with a dark, technical visual language that fits the cloud infrastructure space. Every page is fully responsive, and the service and case-study content is structured so the Vexagon team can grow it as the practice grows.",
    keyFeatures: [
      "Six structured service areas",
      "Five-step engagement methodology",
      "Detailed client case studies",
      "Consultation booking & contact flows",
      "Dark, technical visual language",
      "Fully responsive layout",
    ],
    tech: ["Next.js", "React", "Vercel"],
    websiteUrl: "https://vexagonclouds.com/",
    image: "/work/vexagon-clouds.jpg",
  },
  {
    id: "02",
    name: "SANGHI TUBES",
    slug: "sanghi-tubes",
    industry: "Manufacturing — Water Infrastructure",
    description:
      "A corporate website for a manufacturer of ductile and cast iron pipes supplying water infrastructure projects across India.",
    role: "Website Design & Development",
    approach:
      "Sanghi Pipes & Tubes manufactures centrifugally cast pipes for water distribution and industrial infrastructure — ductile iron and cast iron pipes, double-flanged pipes, valves, and specials, with an OPVC line on the way. Their customers are government water authorities, municipalities, and infrastructure contractors: buyers who evaluate suppliers on specifications, certifications, and track record.\n\nHIWI designed and developed a website that puts exactly that information first. The product range — around 500 products across six categories — is organized into clear category pages with technical specifications. Certifications (BIS, ISO 9001:2015), the client roster, and manufacturing facility details each get dedicated space, because for this audience they are the buying decision.\n\nThe site was built with Next.js, React, and Tailwind CSS, with quote-request and contact forms wired into the pages where a procurement team would need them. The layout is fully responsive, so specifications remain readable on site, in the office, or in the field.",
    keyFeatures: [
      "Product catalog across six categories",
      "Technical specification pages",
      "Certifications section (BIS, ISO 9001:2015)",
      "Client roster & facility details",
      "Quote-request and contact forms",
      "Fully responsive layout",
    ],
    tech: ["Next.js", "React", "Tailwind CSS"],
    websiteUrl: "https://sanghitubes.com/",
    image: "/work/sanghi-tubes.jpg",
  },
];
