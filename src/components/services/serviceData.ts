export type ServiceCategory =
  | "Driving Licence"
  | "Vehicle Registration"
  | "Challan & Payments"
  | "Permits & NOCs"
  | "Fitness & Insurance"
  | "Transport Professionals";

export type Service = {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  keywords: string[];
  href: string;
};

export type Category = {
  id: string;
  title: ServiceCategory;
  description: string;
  count: number;
  href: string;
};

export type Journey = {
  id: string;
  title: string;
  description: string;
  duration: string;
  href: string;
};

export const categories: Category[] = [
  {
    id: "driving-licence",
    title: "Driving Licence",
    description: "Apply, renew, update or replace your driving licence.",
    count: 12,
    href: "/services/driving-licence",
  },
  {
    id: "vehicle-registration",
    title: "Vehicle Registration",
    description: "Register, transfer, update or manage your vehicle.",
    count: 18,
    href: "/services/vehicle-registration",
  },
  {
    id: "challan",
    title: "Challan & Payments",
    description: "Check, pay or dispute traffic challans.",
    count: 6,
    href: "/services/challan",
  },
  {
    id: "permits",
    title: "Permits & NOCs",
    description: "Apply for permits, NOCs and related services.",
    count: 9,
    href: "/services/permits",
  },
  {
    id: "fitness",
    title: "Fitness & Insurance",
    description: "Manage fitness certificates and insurance services.",
    count: 5,
    href: "/services/fitness",
  },
  {
    id: "professionals",
    title: "Transport Professionals",
    description: "Services for transport operators and professionals.",
    count: 8,
    href: "/services/transport-professionals",
  },
];

export const services: Service[] = [
  {
    id: "renew-dl",
    title: "Renew Driving Licence",
    description: "Renew an existing driving licence online without visiting RTO.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "license", "renew", "renewal", "expiry", "expire"],
    href: "/services/driving-licence/renew",
  },
  {
    id: "apply-dl",
    title: "Apply for Driving Licence",
    description: "Apply for a permanent driving licence after learner licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "license", "apply", "new", "driving", "permanent"],
    href: "/services/driving-licence/apply",
  },
  {
    id: "learner-licence",
    title: "Apply for Learner's Licence",
    description: "Start your learner's licence application and book test.",
    category: "Driving Licence",
    keywords: ["ll", "learner", "licence", "license", "apply", "dl", "test", "slot"],
    href: "/services/driving-licence/learner",
  },
  {
    id: "replace-dl",
    title: "Replace Driving Licence",
    description: "Request a replacement for a lost, torn or damaged driving licence.",
    category: "Driving Licence",
    keywords: ["dl", "licence", "replace", "replacement", "lost", "duplicate", "damaged"],
    href: "/services/driving-licence/replace",
  },
  {
    id: "dl-address",
    title: "Change Address on Driving Licence",
    description: "Update the registered residential address linked to your licence.",
    category: "Driving Licence",
    keywords: ["dl", "address", "change", "update", "residence"],
    href: "/services/driving-licence/address",
  },
  {
    id: "vehicle-registration",
    title: "Vehicle Registration",
    description: "Register a brand new vehicle with temporary or permanent RC.",
    category: "Vehicle Registration",
    keywords: ["vehicle", "registration", "register", "car", "bike", "rc", "new"],
    href: "/services/vehicle-registration",
  },
  {
    id: "ownership-transfer",
    title: "Transfer Vehicle Ownership",
    description: "Transfer vehicle ownership after sale or inheritance.",
    category: "Vehicle Registration",
    keywords: ["rc", "transfer", "ownership", "vehicle", "second hand", "car", "bike", "buy", "sell"],
    href: "/services/vehicle/ownership-transfer",
  },
  {
    id: "duplicate-rc",
    title: "Duplicate RC",
    description: "Request a replacement registration certificate for your vehicle.",
    category: "Vehicle Registration",
    keywords: ["rc", "duplicate", "registration certificate", "lost", "damaged"],
    href: "/services/vehicle/duplicate-rc",
  },
  {
    id: "rc-address",
    title: "Change Address on RC",
    description: "Update the registered owner address on your vehicle RC.",
    category: "Vehicle Registration",
    keywords: ["rc", "address", "vehicle", "change", "update", "move"],
    href: "/services/vehicle/address",
  },
  {
    id: "hypothecation-termination",
    title: "Hypothecation Termination (Loan NOC)",
    description: "Remove hypothecation / bank lien from your vehicle RC after loan payoff.",
    category: "Vehicle Registration",
    keywords: ["loan", "hypothecation", "bank", "noc", "lien", "rc", "finance"],
    href: "/services/vehicle/hypothecation",
  },
  {
    id: "challan-check",
    title: "Check Challan Status",
    description: "View all pending and paid traffic eChallans by vehicle or DL number.",
    category: "Challan & Payments",
    keywords: ["challan", "fine", "traffic", "check", "echallan", "status", "pending"],
    href: "/services/challan",
  },
  {
    id: "challan-pay",
    title: "Pay Challan Online",
    description: "Instantly clear outstanding traffic challan payments securely.",
    category: "Challan & Payments",
    keywords: ["challan", "pay", "payment", "fine", "settle", "clear"],
    href: "/services/challan/pay",
  },
  {
    id: "challan-dispute",
    title: "Dispute / Contest Challan",
    description: "Submit a grievance or dispute for wrongly issued traffic challans.",
    category: "Challan & Payments",
    keywords: ["challan", "dispute", "wrong", "fine", "contest", "grievance"],
    href: "/services/challan/dispute",
  },
  {
    id: "permit-national",
    title: "National Permit for Goods Vehicles",
    description: "Apply for or renew all-India National Permit for commercial vehicles.",
    category: "Permits & NOCs",
    keywords: ["permit", "national permit", "goods", "commercial", "truck", "all india"],
    href: "/services/permits/national",
  },
  {
    id: "permit-tourist",
    title: "All India Tourist Permit (AITP)",
    description: "Apply for tourist bus / taxi permits across Indian states.",
    category: "Permits & NOCs",
    keywords: ["permit", "tourist", "aitp", "bus", "taxi", "cab"],
    href: "/services/permits/tourist",
  },
  {
    id: "noc-state",
    title: "No Objection Certificate (NOC)",
    description: "Apply for vehicle inter-state transfer NOC certificate.",
    category: "Permits & NOCs",
    keywords: ["noc", "certificate", "permit", "apply", "interstate", "transfer"],
    href: "/services/permits/noc",
  },
  {
    id: "fitness-cert",
    title: "Vehicle Fitness Certificate",
    description: "Book an inspection and renew vehicle fitness certificate.",
    category: "Fitness & Insurance",
    keywords: ["fitness", "certificate", "vehicle", "commercial", "inspection", "test"],
    href: "/services/fitness",
  },
  {
    id: "insurance-status",
    title: "Verify Vehicle Insurance (VAHAN)",
    description: "Check valid insurance coverage linked to your vehicle number.",
    category: "Fitness & Insurance",
    keywords: ["insurance", "policy", "verify", "vahan", "coverage"],
    href: "/services/fitness/insurance",
  },
  {
    id: "driving-instructor",
    title: "Driving Instructor & School Licence",
    description: "Register or renew a motor driving school accreditation licence.",
    category: "Transport Professionals",
    keywords: ["school", "instructor", "driving school", "commercial", "training"],
    href: "/services/transport-professionals/driving-school",
  },
  {
    id: "commercial-badge",
    title: "Commercial Driver Badge",
    description: "Apply for or renew public service vehicle (PSV) driver badge.",
    category: "Transport Professionals",
    keywords: ["transport", "professional", "badge", "psv", "commercial", "driver"],
    href: "/services/transport-professionals/badge",
  },
];

export const journeys: Journey[] = [
  {
    id: "renew-dl",
    title: "Renew Driving Licence",
    description: "Expires soon? Renew in minutes.",
    duration: "Takes ~10 mins",
    href: "/services/driving-licence/renew",
  },
  {
    id: "ownership-transfer",
    title: "Transfer Vehicle Ownership",
    description: "Bought or sold a vehicle?",
    duration: "Takes ~15 mins",
    href: "/services/vehicle/ownership-transfer",
  },
  {
    id: "challan",
    title: "Check & Pay Challan",
    description: "Clear pending challans online.",
    duration: "Takes ~5 mins",
    href: "/services/challan",
  },
  {
    id: "rto-appointment",
    title: "Book RTO Appointment",
    description: "Save time, book your slot.",
    duration: "Takes ~5 mins",
    href: "/rto/appointments",
  },
  {
    id: "learner",
    title: "Apply for Learner's Licence",
    description: "First step towards driving.",
    duration: "Takes ~12 mins",
    href: "/services/driving-licence/learner",
  },
  {
    id: "duplicate-rc",
    title: "Duplicate RC",
    description: "Lost your RC? Get a duplicate.",
    duration: "Takes ~10 mins",
    href: "/services/vehicle/duplicate-rc",
  },
];
