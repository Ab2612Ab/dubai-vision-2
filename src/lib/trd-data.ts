/**
 * CONCEPT DEMO DATA — TheRealtorDubai "Version 2" experience proposal.
 *
 * Content rules applied throughout this file:
 *  - Every property, agent, area and service entry below is transcribed from the
 *    publicly visible pages of https://www.therealtordubai.com (home, /buy-rent,
 *    /team/nadia-cortés, /area-guide/town-square) as read on 4 Sep 2026.
 *  - No testimonials, awards, licence numbers, rental yields, appreciation
 *    figures, ROI, performance statistics or "problems with the current site"
 *    are invented anywhere in this demo.
 *  - Photography is illustrative concept imagery only. It does NOT depict the
 *    actual listed units and is labelled as such wherever it appears.
 *  - This is a separate visual concept. The live website is untouched.
 */

import heroDubai from "@/assets/hero-dubai.jpg";
import propApartment from "@/assets/prop-apartment.jpg";
import propTerrace from "@/assets/prop-terrace.jpg";
import propTownhouse from "@/assets/prop-townhouse.jpg";
import propStudio from "@/assets/prop-studio.jpg";
import propPool from "@/assets/prop-pool.jpg";
import propBedroom from "@/assets/prop-bedroom.jpg";
import areaTownSquare from "@/assets/area-town-square.jpg";
import investDubai from "@/assets/invest-dubai.jpg";

export const images = {
  hero: heroDubai,
  apartment: propApartment,
  terrace: propTerrace,
  townhouse: propTownhouse,
  studio: propStudio,
  pool: propPool,
  bedroom: propBedroom,
  area: areaTownSquare,
  invest: investDubai,
};

export const brand = {
  legalName: "TheRealtorDubai Real Estate Brokerage L.L.C",
  shortName: "TheRealtorDubai",
  address: "Tamani Arts Building - 1417 Al Asayel St - Business Bay - Dubai",
  phone: "+971 55 195 2518",
  email: "info@therealtordubai.com",
  liveSite: "https://www.therealtordubai.com/",
  publicHeadline: "Properties for Sale and Rent in Dubai",
  publicSubline:
    "Explore Dubai properties and investment opportunities with real market insight and personal guidance.",
  publicCount: 55,
} as const;

export type Purpose = "buy" | "rent";
export type Status = "ready" | "not-stated";

export type Agent = {
  slug: string;
  name: string;
  role: string;
  /** Only present where the public site publishes a profile page. */
  hasPublicProfile: boolean;
  bio?: string[];
  expertise?: string[];
  languages?: string;
  areas?: string;
  publicFacts?: { label: string; value: string }[];
};

export const agents: Record<string, Agent> = {
  "nadia-cortes": {
    slug: "nadia-cortes",
    name: "Nadia Cortés",
    role: "CEO, Property Consultant",
    hasPublicProfile: true,
    bio: [
      "Originally from Chihuahua, Mexico, I left home in 2010 to pursue my dream of traveling the world. With a background in Media, Politics, and Customer Service, including as an air hostess with AeroMexico, I transitioned to an international lifestyle when I joined Emirates, flying the Airbus 380 for 9 years and leading teams as Cabin Supervisor.",
      "In 2019, after my Emirates contract ended, I entered Dubai's Real Estate industry, quickly breaking transaction records and building a strong client base. Despite the challenges of Covid-19, I finished 2021 as a Female Leader in my company and was featured in the BBC documentary \u201CDubai, Playground of the Rich\u201D chapter 2.",
      "In 2024, I launched TheRealtorDubai Real Estate Brokerage LLC, where I specialize in representing buyers through my \u201CReal Estate Concierge\u201D service and work with committed sellers.",
      "I'm building a team of highly skilled property consultants who always prioritize client's best interests.",
    ],
    expertise: [
      "Residential Leasing",
      "Residential Sales",
      "Commercial Sales",
      "Commercial Leasing",
      "Off-Plan Sales",
    ],
    languages: "Spanish, English, French & Italian",
    areas: "Town Square, Dubai Land, Majan",
    publicFacts: [
      { label: "Clients served", value: "Over 100" },
      { label: "Nationalities served", value: "Over 30+" },
      { label: "Highest transactions in a month", value: "12" },
      { label: "Areas of specialisation", value: "Town Square, Dubai Land, Majan" },
      { label: "Languages spoken", value: "Spanish, English, French & Italian" },
    ],
  },
  "joseph-ssesimba": {
    slug: "joseph-ssesimba",
    name: "Joseph Ssesimba",
    role: "Senior Property Consultant",
    hasPublicProfile: false,
  },
  "danica-komljenovic": {
    slug: "danica-komljenovic",
    name: "Danica Komljenovic",
    role: "Property Consultant",
    hasPublicProfile: false,
  },
  "ayse-ketani": {
    slug: "ayse-ketani",
    name: "Ayse Ketani",
    role: "Property Consultant",
    hasPublicProfile: false,
  },
};

export const teamOrder = [
  "nadia-cortes",
  "joseph-ssesimba",
  "danica-komljenovic",
  "ayse-ketani",
];

export type Property = {
  id: string;
  project: string;
  area: string;
  headline: string;
  purpose: Purpose;
  price: number;
  /** Rentals are published as a yearly figure on the live site. */
  period?: "yearly";
  beds: number; // 0 = studio
  baths: number;
  sqft: number;
  type: "Apartment" | "Townhouse";
  status: Status;
  /** Listing agent name exactly as published on the live listing card. */
  listingAgent: string;
  agentSlug?: string;
  gallery: (keyof typeof images)[];
};

/**
 * Transcribed from the public listing cards on the live site's Buy | Rent page.
 * Prices, bedrooms, bathrooms, sizes, headlines and listing agents are public.
 * "status: ready" is only set where the public headline itself says so.
 */
export const properties: Property[] = [
  {
    id: "tulip-oasis-10-high-floor",
    project: "Tulip Oasis 10",
    area: "Majan",
    headline: "High Floor | Ready to Move",
    purpose: "buy",
    price: 1965000,
    beds: 2,
    baths: 2,
    sqft: 1576,
    type: "Apartment",
    status: "ready",
    listingAgent: "Joseph Ssesimba",
    agentSlug: "joseph-ssesimba",
    gallery: ["apartment", "bedroom", "terrace", "pool"],
  },
  {
    id: "tulip-oasis-10-terrace",
    project: "Tulip Oasis 10",
    area: "Majan",
    headline: "Spacious 2BR | Huge Terrace | Ready to Move",
    purpose: "buy",
    price: 1865000,
    beds: 2,
    baths: 2,
    sqft: 1963,
    type: "Apartment",
    status: "ready",
    listingAgent: "Joseph Ssesimba",
    agentSlug: "joseph-ssesimba",
    gallery: ["terrace", "apartment", "bedroom"],
  },
  {
    id: "vera-residences",
    project: "Vera Residences",
    area: "Business Bay",
    headline: "Full Burj Khalifa & Fountain view | Investor deal | Negotiable",
    purpose: "buy",
    price: 1300000,
    beds: 1,
    baths: 1,
    sqft: 474,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Joseph Ssesimba",
    agentSlug: "joseph-ssesimba",
    gallery: ["apartment", "terrace", "bedroom"],
  },
  {
    id: "aras-residence",
    project: "Aras Residence",
    area: "Majan",
    headline: "Bright 1BR | Family-Convenient Layout | Negotiable Price",
    purpose: "buy",
    price: 1100000,
    beds: 1,
    baths: 2,
    sqft: 846,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Tarek Kabbani",
    gallery: ["bedroom", "apartment", "pool"],
  },
  {
    id: "azizi-riviera-39",
    project: "Azizi Riviera 39",
    area: "Meydan",
    headline: "Rented unit | Pool view | High floor",
    purpose: "buy",
    price: 800000,
    beds: 0,
    baths: 1,
    sqft: 317,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Nadia Cortes Murillo",
    agentSlug: "nadia-cortes",
    gallery: ["studio", "pool", "apartment"],
  },
  {
    id: "the-community-jvt-studio",
    project: "The Community",
    area: "Jumeirah Village Triangle (JVT)",
    headline: "Exclusive listing | Floor-to-ceiling windows",
    purpose: "buy",
    price: 650000,
    beds: 0,
    baths: 1,
    sqft: 466,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Nadia Cortes Murillo",
    agentSlug: "nadia-cortes",
    gallery: ["studio", "apartment", "pool"],
  },
  {
    id: "hayat-townhouses",
    project: "Hayat Townhouses",
    area: "Town Square",
    headline: "Type 1 | Closer to Pool | Back to Back | Vacant 5th Oct | 4 Cheques",
    purpose: "rent",
    price: 155000,
    period: "yearly",
    beds: 3,
    baths: 3,
    sqft: 2028,
    type: "Townhouse",
    status: "not-stated",
    listingAgent: "Ayse Ketani",
    agentSlug: "ayse-ketani",
    gallery: ["townhouse", "apartment", "bedroom"],
  },
  {
    id: "avencia-damac-hills-2",
    project: "Avencia, DAMAC Hills 2",
    area: "DAMAC Hills 2",
    headline: "Single Row | Private Garden | G+2 Layout",
    purpose: "rent",
    price: 85000,
    period: "yearly",
    beds: 3,
    baths: 3,
    sqft: 1234,
    type: "Townhouse",
    status: "not-stated",
    listingAgent: "Tarek Kabbani",
    gallery: ["townhouse", "bedroom", "apartment"],
  },
  {
    id: "beverly-residence",
    project: "Beverly Residence",
    area: "Jumeirah Village Circle (JVC)",
    headline: "Modern | Furnished | Pool view | 4-6 Cheques",
    purpose: "rent",
    price: 80000,
    period: "yearly",
    beds: 1,
    baths: 2,
    sqft: 735,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Ayse Ketani",
    agentSlug: "ayse-ketani",
    gallery: ["pool", "apartment", "bedroom"],
  },
  {
    id: "the-community-jvt-1br",
    project: "The Community",
    area: "Jumeirah Village Triangle (JVT)",
    headline: "Glass partition | Up to 12 Cheques",
    purpose: "rent",
    price: 70000,
    period: "yearly",
    beds: 1,
    baths: 1,
    sqft: 368,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Nadia Cortes Murillo",
    agentSlug: "nadia-cortes",
    gallery: ["studio", "apartment", "pool"],
  },
  {
    id: "ascot-residences",
    project: "Ascot Residences",
    area: "Town Square",
    headline: "Premium | 50K 1 cheque and 56K 2 cheques | New Building",
    purpose: "rent",
    price: 52000,
    period: "yearly",
    beds: 0,
    baths: 1,
    sqft: 318,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Ayse Ketani",
    agentSlug: "ayse-ketani",
    gallery: ["studio", "townhouse", "apartment"],
  },
  {
    id: "mag-520",
    project: "MAG 520",
    area: "Dubai South",
    headline: "Unfurnished | Vacant | Flexible Cheques Option",
    purpose: "rent",
    price: 40000,
    period: "yearly",
    beds: 0,
    baths: 1,
    sqft: 365,
    type: "Apartment",
    status: "not-stated",
    listingAgent: "Danica Komljenovic",
    agentSlug: "danica-komljenovic",
    gallery: ["studio", "apartment", "bedroom"],
  },
];

export const locations = Array.from(new Set(properties.map((p) => p.area))).sort();
export const propertyTypes = ["Apartment", "Townhouse"] as const;

/** Area guides published on the live site's Area Guide section. */
export const areaGuides = [
  { slug: "town-square", name: "Town Square", status: "Ready", image: "area" as const },
  { slug: "studio-city", name: "Studio City", status: "Ready", image: "apartment" as const },
  { slug: "motor-city", name: "Motor City", status: "Ready", image: "terrace" as const },
];

/** Verbatim from the public Town Square area guide. */
export const townSquareGuide = {
  name: "Town Square",
  status: "Ready",
  about:
    "Town Square Dubai is a master planned residential development located along Al Qudra Road (D63). Developed by Nshama Group, the community spans 154,000 sq. m., housing 16 gardens and an extensive network of cycling, walking and jogging trails.",
  nutshell: [
    "A family-friendly, gated and secure neighbourhood",
    "Features affordable to mid-tier townhouses and apartments",
    "Offers grand green spaces and outdoor recreation facilities",
    "Well-connected via a network of main roads",
    "Popular for renting properties in Dubai",
  ],
  sections: [
    {
      title: "Community overview",
      body: "The gated community of Town Square Dubai features several parks, landscaped gardens and shaded walkways. The emerging family-friendly community features facilities such as community centres, retail shops, entertainment points and parks within its premises.",
    },
    {
      title: "Properties in Town Square",
      body: "Properties in Town Square Dubai real estate include studios, 1-bed, 2-bed and 3-bed apartments alongside 3 to 4-bedroom townhomes. Nshama has also introduced the co-living concept in Town Square's UNA Apartments to appeal to young tenants and investors.",
    },
    {
      title: "Transport and parking",
      body: "All residential projects and properties feature dedicated parking in Town Square. The community has direct access to public transportation, such as bus stops. Bus link J02 passes through Hayat Townhouses 1, Mira Town Centre, Mira Oasis and Mira 5 Community bus stops.",
    },
    {
      title: "Everyday amenities",
      body: "There is a Carrefour Market and Spinneys in Town Square Dubai, with another branch of Spinneys in Mira Town Centre. Jebel Ali School in DAMAC Hills is around 12 minutes away, and Aster Clinic in Arabian Ranches is accessible within 10 minutes by car.",
    },
    {
      title: "Lifestyle and recreation",
      body: "Within Town Square, the Community Centre offers retail outlets including supermarkets, pharmacies and salons. Town Square Recreational Park includes a kids' train, carousel, jungle gym, basketball court, splash pad and a dog park, alongside a skate park, Wave Rider and trampoline park.",
    },
  ],
  location: [
    "Located alongside Al Qudra Road (D63)",
    "31 minutes away from Dubai International Airport",
    "South of The Sustainable City, Dubailand, Mudon and Arabian Ranches 2",
  ],
};

/** Services listed publicly on the live site. */
export const services = [
  "Studio loft services",
  "Property inspection",
  "Property finance & mortgages",
  "Property management",
  "Property valuation",
  "Renovation & construction",
];

/* ---------------------------------- helpers --------------------------------- */

export function formatPrice(p: Property): string {
  const value = new Intl.NumberFormat("en-US").format(p.price);
  return p.period === "yearly" ? `${value} AED / year` : `${value} AED`;
}

export function bedsLabel(beds: number): string {
  return beds === 0 ? "Studio" : `${beds} bed`;
}

export function statusLabel(status: Status): string {
  return status === "ready" ? "Ready" : "Status not stated publicly";
}

export function getProperty(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

/**
 * Builds the WhatsApp / enquiry text shown in the demo's message preview.
 * The demo never sends, dials or opens a chat — the preview is display-only.
 */
export function buildEnquiryMessage(p: Property, intent = "a viewing"): string {
  return [
    `Hello ${p.listingAgent},`,
    `I'm interested in ${p.project} in ${p.area} (${formatPrice(p)}).`,
    `${bedsLabel(p.beds)} · ${p.baths} bath · ${p.sqft} sq. ft. — reference ${p.id}.`,
    `Could we arrange ${intent}?`,
  ].join("\n");
}
