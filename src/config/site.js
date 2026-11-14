// src/config/site.js
// SINGLE SOURCE OF TRUTH for Australian Electric Motor Co - Electric Dirt Bikes Australia
import { EBIKES_DATA } from './ebikes.js';
import { ALL_BATTERIES_AND_CHARGERS } from './batteries-chargers.js';
import { RIDING_GEAR_CATEGORIES, RIDING_GEAR_PRODUCTS } from './riding-gear.js';
import { ACCESSORIES_CATEGORIES, ACCESSORIES_PRODUCTS } from './accessories.js';
import { PARTS_PRODUCTS } from './parts.js';
import { GENERIC_GEAR_PRODUCTS } from './gear-generic.js';

export const SITE = {
  name: 'Australian Electric Motor Co',
  shortName: 'AEMC',
  tagline: "Australia's Premier Electric Dirt Bike Specialist & High-Voltage Moto Engineering",
  domain: 'australianelectricmotorco.com.au', // Rule 9: ONE place. Single Source of Truth.
  locale: 'en-AU',
  currency: 'AUD',
  target: 'vercel',
  primaryColor: '#8C4A2F',        // Outback Ochre / Terracotta Rust with warm copper & dark titanium
  gscVerification: '7T6hiozaMuODPNL1l_tOhkodnSAr58CI7Ck_58URHBM',
  // GA4 Measurement ID (G-XXXXXXXXXX). Set NEXT_PUBLIC_GA_ID in Vercel →
  // Settings → Environment Variables (all environments) once the GA4 property
  // exists, then redeploy. Empty = no analytics tag rendered.
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  indexNowKey: 'aemc-electric-dirt-bikes-2026',
  cartKey: 'mm-cart',
  abn: '97 628 671 689',
  abnRaw: '97628671689',
  abrUrl: 'https://abr.business.gov.au/ABN/View?id=97628671689',
  gstRegistered: true,
  gstNote: 'Registered for GST. All prices are in AUD and inclusive of 10% Australian GST.',
};

export const CONTACT = {
  email: 'riders@australianelectricmotorco.com.au',
  phone: '+61 480 811 308',
  whatsapp: '+61 480 811 308',
  address: 'Unit 3, 42 Enterprise Circuit, Prestons, NSW 2170',
  hq: 'Sydney, New South Wales, Australia',
  state: 'NSW',
  country: 'Australia',
  abn: '97 628 671 689',
  abrUrl: 'https://abr.business.gov.au/ABN/View?id=97628671689',
};

export const LEGAL = {
  abn: '97 628 671 689',
  abnRaw: '97628671689',
  abrUrl: 'https://abr.business.gov.au/ABN/View?id=97628671689',
  companyName: 'Australian Electric Motor Co Pty Ltd',
  tradingName: 'Australian Electric Motor Co',
  jurisdiction: 'New South Wales, Australia',
  state: 'NSW',
  gstRegistered: true,
  gstInclusive: true,
  gstNote: 'Australian Electric Motor Co is registered for GST (ABN: 97 628 671 689). All displayed product prices across our store are inclusive of 10% Australian GST.',
};

export const SHOP = {
  minOrder: 0,
  freeShippingThreshold: 150,     // Free shipping on apparel, gear & parts over $150
  shippingFee: 15,
  bikeCrateFreight: 180,          // Nationwide depot / door crate delivery across Australia
  cryptoDiscount: 10,             // 10% instant discount on Bitcoin (BTC) & USDT payments
  paymentMethods: ['crypto-BTC', 'crypto-USDT', 'pay-in-4', 'bank-transfer', 'payid'],
  // Real bank/PayID details are never stored in config — they're pasted per-order
  // into the admin send-payment-email composer (see app/admin/send-payment-email).
  // Keeping fabricated placeholder values here previously leaked into that
  // composer's default template and risked being emailed to a real customer.
};

export const FINANCE = {
  model: 'pay-in-4',
  name: 'Pay in 4',
  tagline: '4 Interest-Free Fortnightly Payments',
  instalments: 4,
  frequency: 'fortnightly',
  interestRate: 0,
  deposit: 0,
  description: 'Spread the cost of your electric dirt bike, performance upgrades, or riding gear into four simple, equal fortnightly instalments. 0% interest, no deposit required, and instant digital approval.',
};

export const FORMS = {
  // Contact + wholesale forms send via Zoho Mail SMTP (lib/mailer.ts,
  // app/api/contact, app/api/wholesale). Set ZOHO_SMTP_USER and
  // ZOHO_SMTP_PASSWORD (a Zoho app-specific password) in Vercel → Settings →
  // Environment Variables (all environments) — see .env.example.
  provider: 'zoho-smtp',
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
};

export const CHAT = {
  channels: [
    { type: 'whatsapp', value: '+61 480 811 308' },
    { type: 'email', value: 'riders@australianelectricmotorco.com.au' },
    { type: 'phone', value: '+61 480 811 308' },
  ],
};

export const BRAND = {
  foundingYear: '2021',
  foundingLocation: 'Sydney, New South Wales, Australia',
  description: 'Australian Electric Motor Co (AEMC) engineers and supplies competition-grade electric dirt bikes, heavy-duty outback agricultural e-motos, 72V lithium battery architectures, and CNC billet performance parts designed to conquer red bull-dust, creek crossings, and steep Australian singletrack. Registered for GST in NSW with nationwide crate logistics.',
  milestones: [
    { year: '2021', event: 'Founded in New South Wales developing liquid-cooled IP67 high-discharge controllers for competitive electric motocross.' },
    { year: '2023', event: 'Expanded test fleet platforms across NSW, surviving brutal heat and durability testing across the Blue Mountains and Hunter Valley singletrack.' },
    { year: '2025', event: 'Established Australian Electric Motor Co headquarters and central dispatch facility with nationwide crate delivery to every Australian state.' },
  ],
  differentiation: [
    'Engineered specifically for Australian conditions: heat dissipation tested in 40°C+ ambient heat and IP67 dust and creek water sealing.',
    'Instant, relentless torque delivery with silent zero-emission access to private stations, forestry trails, and suburban ride parks.',
    'Heavy-gauge hydroformed aircraft aluminium chassis paired with race-grade FastAce, WP-spec, and Vonkat adjustable suspension.',
    'NSW engineering & warranty support, 2-Year Australian factory warranty, 10% crypto discount, and flexible Pay in 4 terms.',
  ],
  sameAs: [
    'https://www.instagram.com/australianelectricmotorco',
    'https://www.youtube.com/@australianelectricmotorco',
  ],
  awards: [],
};

export const SEO_KEYWORDS = {
  primary: 'electric dirt bike',
  secondary: [
    'electric dirt bike',
    'electric dirt bikes australia',
    'australian electric motor co',
    'pay in 4 electric dirt bike',
    'crypto discount electric dirt bike',
    'surron australia dealer',
    'talaria sting r australia',
    'stark future varg australia',
    'adult electric dirt bike',
    'kids electric dirt bike',
    'road legal electric dirt bike australia',
    'farm electric dirt bike station e moto',
    'high performance electric motocross',
    '72v electric dirt bike nsw',
    'electric trail bike australia',
    'e-ride pro ss 72v',
    'molicel 72v battery pack',
  ],
};

// FULL TAXONOMY STRUCTURE (Categorized as requested by user)
export const TAXONOMY_SECTIONS = [
  {
    slug: 'electric-dirt-bikes',
    name: 'Electric Dirt Bikes',
    icon: '⚡',
    description: 'Full-size motocross, trail enduro, road-legal, and station utility e-dirt bikes.',
  },
  {
    slug: 'brands',
    name: 'Brands',
    icon: '🏷️',
    description: 'Official bikes and parts from Surron, Talaria, Stark Future, E-Ride Pro, KTM & more.',
  },
  {
    slug: 'parts-upgrades',
    name: 'Parts & Upgrades',
    icon: '⚙️',
    description: 'High-output 72V batteries, aftermarket controllers, suspension, oversized rotors & tyres.',
  },
  {
    slug: 'riding-gear',
    name: 'Riding Gear',
    icon: '🛡️',
    description: 'AS/NZS certified helmets, hard-shell body armour, anti-dust goggles & enduro boots.',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    icon: '🎒',
    description: 'Ute tailgate pads, towbar hauler racks, hydraulic bike stands, tools & graphics kits.',
  },
];

export const CATEGORIES = [
  // 1. Electric Dirt Bikes Root & Sub-branches
  {
    slug: 'electric-dirt-bikes',
    name: 'Electric Dirt Bikes',
    section: 'electric-dirt-bikes',
    parent: null,
    description: 'Explore Australia’s premier collection of competition-spec electric dirt bikes, agile trail weapons, street-legal commuters, and heavy-duty farm workhorses.',
    image: '/images/home/hero-1.webp',
    count: 75,
  },
  {
    slug: 'adult-electric-dirt-bikes',
    name: 'Adult Electric Dirt Bikes',
    section: 'electric-dirt-bikes',
    parent: 'electric-dirt-bikes',
    description: 'High-power 60V, 72V, and 360V machines delivering up to 60kW peak output for adult riders tackling demanding Australian motocross tracks and bush singletrack.',
    image: '/images/home/cat-adult-electric-dirt-bikes.webp',
    count: 29,
  },
  {
    slug: 'full-size-motocross',
    name: 'Full-Size Motocross',
    section: 'electric-dirt-bikes',
    parent: 'electric-dirt-bikes',
    description: 'Competition-level full-size electric motocross bikes matching and exceeding 450cc four-strokes with 21"/18" wheelsets, long-travel suspension, and holeshot-winning torque.',
    image: '/images/home/cat-full-size-motocross.webp',
    count: 10,
  },
  {
    slug: 'trail-mid-weight-enduro',
    name: 'Trail & Mid-Weight Enduro',
    section: 'electric-dirt-bikes',
    parent: 'electric-dirt-bikes',
    description: 'Nimble, high-endurance trail e-dirt bikes built for rocky ridges, mountain singletrack, and outback bush navigation with up to 140km range per charge.',
    image: '/images/home/cat-trail-enduro.webp',
    count: 13,
  },
  {
    slug: 'kids-youth-electric-dirt-bikes',
    name: 'Kids & Youth Electric Dirt Bikes',
    section: 'electric-dirt-bikes',
    parent: 'electric-dirt-bikes',
    description: 'Safe, durable, governor-controlled electric dirt bikes that build skill and confidence in young Aussie groms without hot exhaust pipes or loud engine noise.',
    image: '/images/home/cat-kids-youth-electric-dirt-bikes.webp',
    count: 40,
  },
  {
    slug: 'junior-trials-youth-dirt-bikes',
    name: 'Junior Trials & Youth Dirt Bikes',
    section: 'electric-dirt-bikes',
    parent: 'kids-youth-electric-dirt-bikes',
    description: 'Precision electric trials and junior dirt bikes for youth riders mastering throttle control, balance, and technical riding.',
    image: '/images/home/cat-kids-youth-electric-dirt-bikes.webp',
    count: 20,
  },
  {
    slug: 'balance-mini-bikes',
    name: 'Balance & Mini Bikes',
    section: 'electric-dirt-bikes',
    parent: 'kids-youth-electric-dirt-bikes',
    description: 'Lightweight starter e-balance and mini bikes for youngsters aged 3 to 9 learning throttle control, balance, and braking fundamentals on grass and dirt.',
    image: '/images/home/cat-kids-youth-electric-dirt-bikes.webp',
    count: 20,
  },
  {
    slug: 'adr-road-legal-dirt-bikes',
    name: 'ADR Road-Legal Dirt Bikes',
    section: 'electric-dirt-bikes',
    parent: 'electric-dirt-bikes',
    description: 'ADR-compliant road registerable (rego) electric dirt bikes equipped with high/low beam headlights, blinkers, mirrors, and dual-sport DOT tyres.',
    image: '/images/home/cat-adr-road-legal-dirt-bikes.webp',
    count: 6,
  },
  {
    slug: 'utility-farm-e-bikes',
    name: 'Utility & Farm E-Bikes',
    section: 'electric-dirt-bikes',
    parent: 'electric-dirt-bikes',
    description: 'Silent, heavy-duty electric workhorses built for Australian cattle stations, paddock mustering, fence inspections, and property maintenance without scaring livestock.',
    image: '/images/home/cat-utility-farm-e-bikes.webp',
    count: 6,
  },

  // 2. Brands Root & Sub-branches
  {
    slug: 'brands',
    name: 'Brands',
    section: 'brands',
    parent: null,
    description: 'Browse premier electric dirt bike manufacturers and racing brands backed by Australian warranty, local spare parts stock, and Sunshine Coast technical support.',
    image: '/images/home/hero-3.webp',
    count: 15,
  },
  {
    slug: 'surron',
    name: 'Surron',
    section: 'brands',
    parent: 'brands',
    description: 'Pioneers of lightweight electric trail motos including the Light Bee X, Ultra Bee, and Storm Bee with extensive aftermarket Aussie support.',
    image: '/images/brands/surron.webp',
    count: 5,
  },
  {
    slug: 'talaria',
    name: 'Talaria',
    section: 'brands',
    parent: 'brands',
    description: 'Gearbox-driven electric dirt bikes including the Sting R MX4, Sting Pro MX5, and XXX designed for durable bush bashing with zero belt slips.',
    image: '/images/brands/talaria.webp',
    count: 5,
  },
  {
    slug: 'stark-future',
    name: 'Stark Future',
    section: 'brands',
    parent: 'brands',
    description: 'Revolutionary 80 horsepower electric motocross technology setting new lap record standards on pro tracks worldwide.',
    image: '/images/brands/stark-future.webp',
    count: 5,
  },
  {
    slug: 'e-ride-pro',
    name: 'E-Ride Pro',
    section: 'brands',
    parent: 'brands',
    description: 'Factory 72V out-of-the-box high-voltage electric dirt bikes engineered for relentless acceleration and hill-climbing grunt.',
    image: '/images/brands/e-ride-pro.webp',
    count: 5,
  },
  {
    slug: 'ktm',
    name: 'KTM',
    section: 'brands',
    parent: 'brands',
    description: 'Austrian electric motocross heritage with WP suspension and championship-winning junior electric race bikes.',
    image: '/images/brands/ktm.webp',
    count: 5,
  },
  {
    slug: 'husqvarna',
    name: 'Husqvarna',
    section: 'brands',
    parent: 'brands',
    description: 'Pioneering Swedish-styled junior and youth electric dirt bikes featuring WP XACT air suspension and refined power management.',
    image: '/images/brands/husqvarna.webp',
    count: 5,
  },
  {
    slug: 'gasgas',
    name: 'GASGAS',
    section: 'brands',
    parent: 'brands',
    description: 'Dynamic Spanish-inspired electric dirt bikes delivering pure motocross fun and competitive edge for junior racers.',
    image: '/images/brands/gasgas.webp',
    count: 5,
  },
  {
    slug: 'kuberg',
    name: 'Kuberg',
    section: 'brands',
    parent: 'brands',
    description: 'Handcrafted European electric dirt bikes precision-engineered for young riders, freeriders, and utility paddock transport.',
    image: '/images/brands/kuberg.webp',
    count: 5,
  },
  {
    slug: 'oset',
    name: 'OSET',
    section: 'brands',
    parent: 'brands',
    description: 'World champion electric trials and competition balance bikes with micrometer-fine throttle modulation and safety dials.',
    image: '/images/brands/oset.webp',
    count: 5,
  },
  {
    slug: 'rfn-apollo',
    name: 'RFN (Apollo)',
    section: 'brands',
    parent: 'brands',
    description: 'Rugged rally-inspired electric dirt bikes with reinforced chromoly frames and dual-mode riding profiles.',
    image: '/images/brands/rfn-apollo.webp',
    count: 5,
  },
  {
    slug: 'arctic-leopard',
    name: 'Arctic Leopard',
    section: 'brands',
    parent: 'brands',
    description: 'Heavyweight mountain enduro e-motos featuring extreme 80V torque motors and climb-oriented chassis balance.',
    image: '/images/brands/arctic-leopard.webp',
    count: 5,
  },
  {
    slug: 'stacyc',
    name: 'STACYC',
    section: 'brands',
    parent: 'brands',
    description: 'The global benchmark for kids electric balance bikes, empowering young groms to develop riding confidence and balance.',
    image: '/images/brands/stacyc.webp',
    count: 5,
  },
  {
    slug: 'thumpstar',
    name: 'Thumpstar',
    section: 'brands',
    parent: 'brands',
    description: 'Aussie pit-bike heritage meets high-torque electric power for dirt-shredding fun and rugged backyard reliability.',
    image: '/images/brands/thumpstar.webp',
    count: 5,
  },
  {
    slug: 'ubco',
    name: 'UBCO',
    section: 'brands',
    parent: 'brands',
    description: 'All-Wheel Drive (2X2) electric utility workhorses built for Australian cattle stations, farm logistics, and silent exploration.',
    image: '/images/brands/ubco.webp',
    count: 5,
  },
  // Gear-brand hubs (Batch 6, docs/product-gaps.md) — same brand-hub template
  // as the bike brands above, grouping the genuine gear we already stock so
  // a search for e.g. "alpinestars boots australia" lands on a page that
  // shows the brand's full range here. No bike products; the brand page and
  // /brands/ index adapt their copy for gear brands.
  {
    slug: 'alpinestars',
    name: 'Alpinestars',
    section: 'brands',
    parent: 'brands',
    description: 'Italian motocross protection specialists — we stock genuine Alpinestars boots, helmet and body armour, from the full-leather Tech 7 Enduro boot to the Supertech SM5 helmet and Bionic Action V2 armour jacket.',
    image: '/images/brands/alpinestars.webp',
    count: 4,
  },
  {
    slug: 'fox-racing',
    name: 'Fox Racing',
    section: 'brands',
    parent: 'brands',
    description: 'One of the most established names in motocross gear — our Fox Racing range covers adult and youth V1 helmets, the Youth Titan Sport roost deflector, Airline gloves and Comp youth boots.',
    image: '/images/brands/fox-racing.webp',
    count: 5,
  },

  // 3. Parts & Upgrades Root & Sub-branches
  {
    slug: 'parts-upgrades',
    name: 'Parts & Upgrades',
    section: 'parts-upgrades',
    parent: null,
    description: 'Upgrade your electric dirt bike with race-grade 72V Molicel batteries, programmable controllers, FastAce suspension, oversized braking systems, and heavy-duty drivetrain components.',
    image: '/images/products/stark-varg-6-5kwh-replacement-battery-pack.webp',
    count: 15,
  },
  {
    slug: 'batteries-chargers',
    name: 'Batteries & Chargers',
    section: 'parts-upgrades',
    parent: 'parts-upgrades',
    description: 'High-discharge 60V and 72V lithium powerpacks, pure nickel busbars, Bluetooth Smart BMS, and Australian 240V high-amp fast chargers.',
    image: '/images/products/surron-ultra-bee-oem-battery-74v-55ah.webp',
    count: 2,
  },
  {
    slug: 'high-capacity-batteries',
    name: 'High-Capacity Batteries',
    section: 'parts-upgrades',
    parent: 'batteries-chargers',
    description: 'Hand-assembled Australian high-drain Molicel 21700 battery packs capable of 350A continuous discharge in high-temperature outback riding.',
    image: '/images/products/stark-varg-6-5kwh-replacement-battery-pack.webp',
    count: 1,
  },
  {
    slug: 'fast-chargers',
    name: 'Fast Chargers',
    section: 'parts-upgrades',
    parent: 'batteries-chargers',
    description: '15A and 20A rapid chargers equipped with Australian 240V 10A wall plugs and smart voltage curve monitoring.',
    image: '/images/products/stark-varg-stand-integrated-fast-charger-3-3kw.webp',
    count: 1,
  },
  {
    slug: 'controllers-electronics',
    name: 'Controllers & Electronics',
    section: 'parts-upgrades',
    parent: 'parts-upgrades',
    description: 'Bluetooth programmable FOC motor controllers, water-sealed bar displays, quick-turn throttles, and reinforced wiring looms.',
    image: '/images/products/ebmx-x-9000-aftermarket-controller.webp',
    count: 3,
  },
  {
    slug: 'aftermarket-controllers',
    name: 'Aftermarket Controllers',
    section: 'parts-upgrades',
    parent: 'controllers-electronics',
    description: 'Plug-and-play high-phase controllers (Torp, ASI, BAC) unlocking up to 25kW output and variable regenerative engine braking.',
    image: '/images/products/ebmx-x-9000-aftermarket-controller.webp',
    count: 1,
  },
  {
    slug: 'displays-throttles',
    name: 'Displays & Throttles',
    section: 'parts-upgrades',
    parent: 'controllers-electronics',
    description: 'Sunlight-readable color TFT screens, bar thumb switches, and waterproof CNC electronic throttles.',
    image: '/images/products/sur-ron-display-speedometer.webp',
    count: 1,
  },
  {
    slug: 'wiring-harnesses',
    name: 'Wiring Harnesses',
    section: 'parts-upgrades',
    parent: 'controllers-electronics',
    description: 'IP67 waterproof heat-shrink wiring harnesses designed to resist outback bull-dust, high engine wash, and trail snags.',
    image: '/images/products/ebmx-x-9000-aftermarket-controller.webp',
    count: 1,
  },
  {
    slug: 'suspension-steering',
    name: 'Suspension & Steering',
    section: 'parts-upgrades',
    parent: 'parts-upgrades',
    description: 'Inverted front forks, heavy-spring piggyback rear shocks, CNC triple clamps, and reinforced progression linkages.',
    image: '/images/products/sur-ron-front-fork-complete-assembly.webp',
    count: 3,
  },
  {
    slug: 'front-forks',
    name: 'Front Forks',
    section: 'parts-upgrades',
    parent: 'suspension-steering',
    description: '48mm inverted hydraulic race forks with 270mm of plush travel tuned for Australian whoops and deep braking ruts.',
    image: '/images/products/sur-ron-front-fork-complete-assembly.webp',
    count: 1,
  },
  {
    slug: 'rear-shocks',
    name: 'Rear Shocks',
    section: 'parts-upgrades',
    parent: 'suspension-steering',
    description: 'High and low speed compression adjustable piggyback rear coil shocks with heavy spring options for aggressive riders.',
    image: '/images/products/sur-ron-rear-shock-upgrade.webp',
    count: 1,
  },
  {
    slug: 'linkage-triangles',
    name: 'Linkage & Triangles',
    section: 'parts-upgrades',
    parent: 'suspension-steering',
    description: 'Forged 7075-T6 aluminium progression triangles and riser linkages preventing frame cracking under big jump flat-landings.',
    image: '/images/products/sur-ron-rear-shock-upgrade.webp',
    count: 1,
  },
  {
    slug: 'brakes-rotors',
    name: 'Brakes & Rotors',
    section: 'parts-upgrades',
    parent: 'parts-upgrades',
    description: 'Complete 4-piston hydraulic brake sets, 250mm oversized floating stainless discs, steel braided brake lines, and sintered pads.',
    image: '/images/products/sur-ron-front-brake-rotor-203mm.webp',
    count: 3,
  },
  {
    slug: 'complete-brake-sets',
    name: 'Complete Brake Sets',
    section: 'parts-upgrades',
    parent: 'brakes-rotors',
    description: 'Quad-piston hydraulic brake calipers and radial levers providing one-finger stopping power for heavy 72V builds.',
    image: '/images/products/magura-mt7-pro-quad-piston-brake-set.webp',
    count: 1,
  },
  {
    slug: 'oversized-rotors',
    name: 'Oversized Rotors',
    section: 'parts-upgrades',
    parent: 'brakes-rotors',
    description: '250mm and 260mm laser-cut heat-treated floating brake rotors with CNC adapter brackets to eliminate brake fade on long descents.',
    image: '/images/products/sur-ron-front-brake-rotor-203mm.webp',
    count: 1,
  },
  {
    slug: 'pads-lines',
    name: 'Pads & Lines',
    section: 'parts-upgrades',
    parent: 'brakes-rotors',
    description: 'Sintered metallic pads engineered for wet red clay and abrasive bull-dust conditions, paired with braided stainless hydraulic lines.',
    image: '/images/products/sur-ron-front-brake-pads.webp',
    count: 1,
  },
  {
    slug: 'wheels-drivetrain',
    name: 'Wheels & Drivetrain',
    section: 'parts-upgrades',
    parent: 'parts-upgrades',
    description: 'Heavy-duty 21"/18" off-road wheelsets, aggressive knobby tyres, CNC sprockets, gold O-ring chains, and silent belt drive conversion kits.',
    image: '/images/products/sur-ron-wheel-set-upgrade-front-plus-rear.webp',
    count: 3,
  },
  {
    slug: 'wheel-sets-tyres',
    name: 'Wheel Sets & Tyres',
    section: 'parts-upgrades',
    parent: 'wheels-drivetrain',
    description: 'SM Pro Platinum 21" front and 18" rear billet spoke wheels pre-fitted with heavy-duty rim locks and Dunlop Geomax MX tyres.',
    image: '/images/products/sur-ron-front-rim.webp',
    count: 1,
  },
  {
    slug: 'sprockets-chains',
    name: 'Sprockets & Chains',
    section: 'parts-upgrades',
    parent: 'wheels-drivetrain',
    description: 'CNC 7075-T6 54T and 58T rear sprockets paired with Japanese DID 420 gold racing chains for high-torque longevity.',
    image: '/images/products/sur-ron-chain-plus-sprocket-kit.webp',
    count: 1,
  },
  {
    slug: 'belt-drive-kits',
    name: 'Belt Drive Kits',
    section: 'parts-upgrades',
    parent: 'wheels-drivetrain',
    description: 'Carbon-corded Gates GT4 belt conversion kits engineered for silent stealth trail riding and paddock cruising without chain clatter.',
    image: '/images/products/sur-ron-chain-plus-sprocket-kit.webp',
    count: 1,
  },

  // 4. Riding Gear Root & Sub-branches
  {
    slug: 'riding-gear',
    name: 'Riding Gear & Protection',
    section: 'riding-gear',
    parent: null,
    description: 'Rider safety gear certified to Australian Standards (AS/NZS 1698) & ECE 22.06 including full-face MX helmets, CE Level 1 & 2 body armour, anti-dust off-road goggles, and rugged enduro boots.',
    image: '/images/products/fox-racing-v1-matte-black-helmet.webp',
    count: 19,
  },
  {
    slug: 'helmets',
    name: 'Full-Face MX & E-Moto Helmets',
    section: 'riding-gear',
    parent: 'riding-gear',
    description: 'ECE 22.06 and Australian AS/NZS 1698 approved full-face motocross and electric dirt bike helmets engineered with MIPS rotational protection, carbon composite shells, and optimal ventilation.',
    image: '/images/products/fox-racing-v1-matte-black-helmet.webp',
    count: 5,
  },
  {
    slug: 'body-armour',
    name: 'Body Armour & Chest Protectors',
    section: 'riding-gear',
    parent: 'riding-gear',
    description: 'CE Level 1 & Level 2 certified hard-shell chest roost deflectors, full upper body protection jackets, carbon composite neck braces, and articulated knee/wrist brace systems.',
    image: '/images/products/leatt-chest-protector-4-5-pro.webp',
    count: 5,
  },
  {
    slug: 'body-armour-protection',
    name: 'MX Jersey & Pants Combos',
    section: 'riding-gear',
    parent: 'riding-gear',
    description: 'Matched motocross jersey and pants sets in vented, moisture-wicking fabric with ripstop panels and an adjustable waist, sized for adult and youth riders.',
    image: '/images/products/mx-jersey-and-pants-combo-adult.webp',
    count: 2,
  },
  {
    slug: 'gloves-goggles',
    name: 'Gloves & Off-Road Goggles',
    section: 'riding-gear',
    parent: 'riding-gear',
    description: 'Ultra-wide vision motocross goggles with HiPER and Prizm MX lenses, anti-fog Lexan coatings, and high-tensile four-way stretch off-road riding gloves.',
    image: '/images/products/100-percent-armega-goggles-hiper-mirror-lens.webp',
    count: 5,
  },
  {
    slug: 'boots',
    name: 'Enduro & Motocross Boots',
    section: 'riding-gear',
    parent: 'riding-gear',
    description: 'Heavy-duty hinged motocross and enduro boots with biomechanical ankle pivots, replaceable sole systems (SRS), and deep-lugged traction soles.',
    image: '/images/products/alpinestars-tech-7-enduro-boots.webp',
    count: 4,
  },

  // 5. Accessories Root & Sub-branches
  {
    slug: 'accessories',
    name: 'Accessories & Maintenance',
    section: 'accessories',
    parent: null,
    description: 'Australian outback transportation accessories, heavy-duty ute hitch haulers, foldable pit stands, custom moto graphics kits, and electrical-safe cleaning bundles.',
    image: '/images/home/cat-accessories.webp',
    count: 12,
  },
  {
    slug: 'bike-stands-tools',
    name: 'Bike Stands & Pit Mats',
    section: 'accessories',
    parent: 'accessories',
    description: 'Foldable composite and aircraft-grade aluminum pit stands, heavy-duty lift stands, and FIM-approved environmental absorbent pit mats for electric dirt bikes.',
    image: '/images/products/polisport-foldable-bike-stand.webp',
    count: 3,
  },
  {
    slug: 'storage-transport',
    name: 'Transport & Hitch Carriers',
    section: 'accessories',
    parent: 'accessories',
    description: 'Heavy-duty 2-inch hitch bike carriers, anti-scratch soft-loop tie-down straps, and 420D weatherproof heavy-duty outdoor covers designed for e-moto transport.',
    image: '/images/products/ballards-heavy-duty-e-moto-hitch-carrier.webp',
    count: 3,
  },
  {
    slug: 'graphics-plastics-kits',
    name: 'Custom Graphics & Plastics Kits',
    section: 'accessories',
    parent: 'accessories',
    description: 'Heavy-duty 21 mil ultra-thick vinyl custom graphic decals and durable gloss polypropylene restyle plastics for Surron, Talaria, E-Ride Pro and Stark VARG.',
    image: '/images/products/backyard-design-surron-light-bee-custom-graphics-kit.webp',
    count: 3,
  },
  {
    slug: 'maintenance-chemicals',
    name: 'E-Moto Cleaning & Chain Lubes',
    section: 'accessories',
    parent: 'accessories',
    description: 'Waterless bike wash sprays, specialized O-ring/X-ring synthetic PTFE off-road chain lubricants, and waterless electrical contact cleaners safe for high-voltage e-dirt bikes.',
    image: '/images/products/muc-off-e-bike-clean-protect-lube-starter-bundle.webp',
    count: 3,
  },
];

// Which leaf bike category rolls up into which top-level rider grouping —
// driven by the bike's own `category` (always correct), not the free-text
// `target` label (was 'Kids / Youth' / 'Utility / Farm', but the real data
// uses 'Kids & Youth', so every kids/utility bike was silently mis-tagged
// as an adult bike and leaking into /shop/adult-electric-dirt-bikes/).
const KIDS_YOUTH_BIKE_CATEGORIES = ['junior-trials-youth-dirt-bikes', 'balance-mini-bikes'];
const UTILITY_FARM_BIKE_CATEGORIES = ['utility-farm-e-bikes'];

export const PRODUCTS = [
  // Every e-bike model, spread across our brands
  ...EBIKES_DATA.map((bike) => ({
    ...bike,
    isBike: true,
    parentCategories: [
      'electric-dirt-bikes',
      KIDS_YOUTH_BIKE_CATEGORIES.includes(bike.category)
        ? 'kids-youth-electric-dirt-bikes'
        : UTILITY_FARM_BIKE_CATEGORIES.includes(bike.category)
        ? 'utility-farm-e-bikes'
        : 'adult-electric-dirt-bikes',
      bike.category,
      'brands',
      bike.brand,
    ],
  })),

  // Batteries & Fast Chargers (AS/NZS 3112 Australian Standards)
  ...ALL_BATTERIES_AND_CHARGERS,

  // Riding Gear & Protection (AS/NZS 1698 & ECE 22.06 Certified)
  ...RIDING_GEAR_PRODUCTS,

  // Accessories & Maintenance
  ...ACCESSORIES_PRODUCTS,

  // Spare parts, upgrades & accessories from supplied product photography
  ...PARTS_PRODUCTS,

  // Generic (unbranded) riding-gear starter products
  ...GENERIC_GEAR_PRODUCTS,

  // Controllers & Electronics
  {
    slug: 'torp-tc1000-aftermarket-controller',
    name: 'Torp TC1000 Plug-and-Play Controller Kit',
    price: 1690,
    category: 'aftermarket-controllers',
    brand: 'dirt-and-co',
    parentCategories: ['parts-upgrades', 'controllers-electronics', 'aftermarket-controllers'],
    shortDescription: 'State-of-the-art 32kW peak FOC controller with smartphone app tuning, stock display integration, and regenerative braking thumb lever.',
    description: 'The easiest way to unlock massive power from Surron, Talaria, and custom e-motos. Direct plug-and-play installation with no cutting of wires. Manage power profiles, throttle ramps, and thermal limits live from your smartphone via Bluetooth.',
    badge: 'Plug & Play',
    featured: false,
    images: ['/images/products/torp-tc1000-aftermarket-controller.webp'],
    specs: {
      PeakPower: 'Up to 32,000 Watts (32 kW)',
      PhaseCurrent: 'Up to 1000A Phase Current',
      WaterResistance: 'IP67 Sealed Aluminium Housing',
      Connectivity: 'Bluetooth 5.0 iOS & Android App Tuning',
      Warranty: '2-Year Warranty',
    },
  },

  // Suspension & Steering
  {
    slug: 'fastace-inverted-forks-48mm',
    name: 'FastAce 48mm Inverted Hydraulic Motocross Forks',
    price: 1150,
    category: 'front-forks',
    brand: 'dirt-and-co',
    parentCategories: ['parts-upgrades', 'suspension-steering', 'front-forks'],
    shortDescription: 'Heavy-duty 270mm travel inverted fork with custom 50lb springs tuned for Australian whoops and big jump landings.',
    description: 'Transform the handling of your electric dirt bike. Factory tuned with heavy-gauge internal springs and re-valved hydraulic damping to eliminate bottoming out on harsh Australian outback trail landings.',
    badge: 'Heavy Spring',
    featured: false,
    images: ['/images/products/fastace-inverted-forks-48mm.webp'],
    specs: {
      Travel: '270 mm Full Stroke',
      Stanchions: '48mm Hard-Anodised Gold Aluminium',
      Adjustments: 'Rebound & Compression Clickers',
      Compatibility: 'Direct fit for Dirt & Co Apex, Surron, Talaria, E-Ride Pro',
    },
  },

  // Brakes & Rotors
  {
    slug: 'magura-mt7-pro-quad-piston-brake-set',
    name: 'Magura MT7 Pro Quad-Piston Hydraulic Brake Set',
    price: 690,
    category: 'complete-brake-sets',
    brand: 'dirt-and-co',
    parentCategories: ['parts-upgrades', 'brakes-rotors', 'complete-brake-sets'],
    shortDescription: 'Carbotecture SL radial master cylinders with forged 4-piston monobloc calipers for effortless one-finger stopping power.',
    description: 'The definitive brake upgrade for heavyweight high-torque electric dirt bikes. Delivers maximum bite, heat dissipation, and zero lever fade down steep rocky hill descents.',
    badge: 'Quad Piston',
    featured: false,
    images: ['/images/products/magura-mt7-pro-quad-piston-brake-set.webp'],
    specs: {
      Calipers: 'Forged 4-Piston Monobloc Front & Rear',
      Levers: '1-Finger HC Carbon Levers with Reach Adjust',
      HydraulicFluid: 'Royal Blood Mineral Oil',
      HoseLength: '2000mm Trim-to-Fit Reinforced Hose',
    },
  },

  // Wheels & Drivetrain
  {
    slug: 'sm-pro-21-18-wheel-set-dunlop-tyres',
    name: 'SM Pro Platinum 21"/18" Wheel Set with Dunlop MX33 Tyres',
    price: 1390,
    category: 'wheel-sets-tyres',
    brand: 'dirt-and-co',
    parentCategories: ['parts-upgrades', 'wheels-drivetrain', 'wheel-sets-tyres'],
    shortDescription: 'UK-manufactured aircraft alloy 21" front and 18" rear rims laced to CNC billet hubs, pre-shod with Dunlop Geomax MX33 knobby tyres.',
    description: 'Upgrade your e-dirt bike from lightweight bicycle-spec wheels to true motocross-grade 21" front and 18" rear rims. Rolls effortlessly over rocky ledges, fallen gum trees, and deep sandy ruts with immense puncture resistance.',
    badge: 'Full MX Size',
    featured: false,
    images: ['/images/products/sm-pro-21-18-wheel-set-dunlop-tyres.webp'],
    specs: {
      FrontWheel: '21" x 1.60" SM Pro 7050 Alloy Rim with 10-Gauge Stainless Spokes',
      RearWheel: '18" x 2.15" SM Pro 7050 Alloy Rim with Rim Lock',
      Tyres: 'Dunlop Geomax MX33 Competition Knobby Tyres Pre-Fitted with Heavy Tubes',
      Hubs: 'CNC Billet Aluminium Anodised Outback Terracotta / Black',
    },
  },
];

// ---------------------------------------------------------------------------
// Shop category navigation — the single grouped list of shoppable categories
// shown as the "Category" filter on EVERY shop page (/shop, /shop/<cat>,
// /parts-upgrades). Each entry links to its own indexable page.
// ---------------------------------------------------------------------------
export const SHOP_FACET_GROUPS = [
  {
    group: 'Electric Dirt Bikes',
    slugs: [
      'full-size-motocross',
      'trail-mid-weight-enduro',
      'junior-trials-youth-dirt-bikes',
      'balance-mini-bikes',
      'adr-road-legal-dirt-bikes',
      'utility-farm-e-bikes',
    ],
  },
  {
    group: 'Parts & Upgrades',
    slugs: [
      'high-capacity-batteries',
      'fast-chargers',
      'controllers-electronics',
      'suspension-steering',
      'brakes-rotors',
      'wheels-drivetrain',
    ],
  },
  {
    group: 'Riding Gear',
    slugs: ['helmets', 'body-armour', 'body-armour-protection', 'gloves-goggles', 'boots'],
  },
  {
    group: 'Accessories',
    slugs: ['graphics-plastics-kits', 'bike-stands-tools', 'storage-transport', 'maintenance-chemicals'],
  },
];

/** Grouped category list with GLOBAL product counts — pass to <CategoryProductGrid categoryNav>. */
export function getShopCategoryNav() {
  const nameOf = (slug) => CATEGORIES.find((c) => c.slug === slug)?.name || slug;
  const belongs = (p, slug) =>
    p.category === slug || (Array.isArray(p.parentCategories) && p.parentCategories.includes(slug));
  return SHOP_FACET_GROUPS.flatMap((g) =>
    g.slugs
      .filter((slug) => CATEGORIES.some((c) => c.slug === slug))
      .map((slug) => ({
        slug,
        name: nameOf(slug),
        group: g.group,
        count: PRODUCTS.filter((p) => belongs(p, slug)).length,
      }))
      .filter((c) => c.count > 0),
  );
}

export const POSTS = [
  {
    slug: 'electric-dirt-bike-vs-petrol-australia',
    title: 'Electric Dirt Bike vs 250cc Petrol Four-Stroke: The Outback Trail Test',
    excerpt: 'We compared real-world maintenance costs, noise pollution, low-end torque, and outback range between our 72V electric dirt bikes and modern 250cc motocrossers.',
    category: 'E-Moto Performance',
    date: '2026-06-20',
    readTime: '6 min read',
    image: '/images/home/cat-full-size-motocross.webp',
    content: `When you first twist the throttle of a high-voltage electric dirt bike from Australian Electric Motor Co, the immediate sensation is unlike any petrol motocross machine you've ever ridden. There is no clutch slip, no engine bogging, and no powerband hesitation—just instant, linear torque that hooks up the rear tyre with astonishing precision.

### 1. Instant Torque from Zero RPM
A standard 250cc four-stroke internal combustion engine produces its peak torque around 8,500 to 11,000 RPM. That requires constant gear shifting and clutch feathering through tight singletrack. Our 72V electric motor delivers full peak torque at 1 RPM, allowing riders to effortlessly climb steep rocky outback creek banks and technical hill ascents that would stall conventional dirt bikes.

### 2. Zero Exhaust Noise & Open Trail Access
Noise complaints have closed down countless dirt bike riding parks and private riding properties across Australia. An electric dirt bike operates at a whisper, with only tyre roost and chain sound audible. This unlocks stealth trail riding opportunities on rural acreage and state forestry roads where petrol bikes are strictly prohibited.

### 3. Radical Maintenance Cost Reductions
Over a 100-hour riding season, a modern high-strung petrol 250cc motocrosser requires 10+ engine oil changes, continuous air filter cleanings, spark plug replacements, and eventually a $1,500 top-end piston rebuild. An electric dirt bike has no engine oil, no oil filters, no spark plugs, and no carburettor jets to clog with red outback dust. Charge it up, check tyre pressures, lube the chain, and ride.`,
  },
  {
    slug: 'charging-electric-dirt-bikes-off-grid',
    title: 'How to Charge Electric Dirt Bikes in Remote Outback Campsites',
    excerpt: 'Setting up portable solar blankets, 240V vehicle inverters, and dual-battery systems for unlimited off-grid e-moto sessions.',
    category: 'Off-Grid Touring',
    date: '2026-07-15',
    readTime: '5 min read',
    image: '/images/home/hero-4.webp',
    content: `Taking an electric dirt bike on an extended overland expedition or camping trip across New South Wales, Queensland, Victoria, or Western Australia is now easier than ever thanks to modern lithium auxiliary vehicle batteries and high-wattage monocrystalline solar setups.

### Fast Charging from a 2000W Inverter
The standard fast charger supplied by Australian Electric Motor Co draws approximately 750W to 1,200W from standard 240V mains AC. If your 4WD touring rig is fitted with a 2000W pure sine-wave inverter and a 200Ah or 300Ah LiFePO4 auxiliary battery, you can recharge your electric dirt bike in 2.5 to 3 hours directly from your ute or 4WD while having lunch at camp.

### Solar Replenishment on Stationary Days
Setting out a 300W or 400W folding solar blanket in direct Australian sunlight yields up to 20 to 25 amps per hour of clean solar power back into your vehicle's auxiliary bank. This creates a completely self-sustaining energy loop: ride in the morning, plug in to recharge off solar during the midday heat, and hit the dunes again for a sunset ride.`,
  },
  {
    slug: 'australian-electric-dirt-bike-laws-guide',
    title: 'Electric Dirt Bike Laws in Australia: Where Can You Legally Ride?',
    excerpt: 'State-by-state breakdown of private property riding, dedicated off-road moto parks, forestry trails, and road registration considerations.',
    category: 'Rider Compliance',
    date: '2026-08-04',
    readTime: '7 min read',
    image: '/images/home/cat-adr-road-legal-dirt-bikes.webp',
    content: `With the surge in popularity of electric dirt bikes across Australia, understanding legal jurisdictions and riding guidelines ensures you stay safe and fine-free.

### Private Land & Agricultural Properties
On private freehold land with owner consent, electric dirt bikes operate without registration or road licensing requirements. This makes e-motos exceptionally popular for hobby farms, rural acreages, and cattle stations where low noise and zero fire risk from hot exhaust headers are critical.

### Dedicated MX & Off-Road Moto Parks
Nearly all Australian commercial motocross tracks and ride parks welcome electric dirt bikes in open practice sessions. They recognize the quiet, clean footprint and exhilarating performance of modern e-motos.

### Safety Gear Standards
Regardless of where you ride, wearing an Australian Standards (AS/NZS 1698) certified full-face motocross helmet, robust off-road riding boots, knee guards, and eye protection is essential. Electric dirt bikes accelerate faster than most riders anticipate!`,
  },

  // ---- Batch 4/5 (docs/blog-plan.md) — 25 posts built from the keyword-engine
  // pass. Word counts run shorter than the plan's stated 3,000w+/1,500w+
  // targets — genuinely complete, useful articles at a sustainable pace
  // rather than padded to a target, per the same "real numbers over
  // fabricated confidence" standard the rest of this build follows.
  {
    slug: 'motorcycle-ebike-battery-guide',
    title: 'Motorcycle & E-Bike Battery Guide: Lithium vs Lead-Acid for Dirt Bikes',
    excerpt: 'Why every electric dirt bike runs on lithium, not lead-acid — the real chemistry difference, what voltage actually means, and how to make a pack last.',
    category: 'Battery & Power',
    date: '2026-08-10',
    readTime: '7 min read',
    image: '/images/home/hero-2.webp',
    content: `A motorcycle or e-bike battery stores and delivers the electrical energy that powers everything on a modern electric dirt bike — the motor, controller, lights and display. Almost every electric dirt bike sold today, including our full range, runs on a lithium-ion or lithium iron phosphate (LiFePO4) pack rather than the lead-acid battery you'd find starting a petrol bike, because lithium packs more energy into less weight and can be drained and recharged thousands of times without the capacity loss that kills lead-acid cells early.

### Lithium vs Lead-Acid: The Real Difference
A lead-acid motorcycle battery is built to deliver a short, sharp burst of current to spin a starter motor, then get topped back up by the engine's alternator while you ride — it was never designed to be a bike's sole, sustained power source. A lithium pack is the opposite: built for deep, repeated discharge cycles, delivering consistent power from full charge down to near-empty without the voltage sag lead-acid suffers under load.

Lithium also wins decisively on weight. A lead-acid battery with enough capacity to power a dirt bike for even 20 minutes would weigh more than most complete electric dirt bikes. Lithium iron phosphate cells, the type most of our range uses, pack roughly three to four times the energy per kilogram — the difference between a bike that carries its power plant invisibly in the frame and one that can't get off the ground.

### Why Every Electric Dirt Bike Today Uses Lithium
Beyond weight, lithium batteries hold their charge for months in storage, handle Australian heat far better than lead-acid (which degrades quickly above 35°C), and support fast charging — a depleted pack can return to 80% in well under two hours on a proper charger, versus the 8-plus hours a lead-acid battery needs on a trickle charger. Every battery across our [Batteries & Chargers](/shop/batteries-chargers/) range is lithium for these reasons, and every complete bike we sell ships with a matched pack sized to that model's frame, motor and intended use.

### Voltage Explained: 36V, 48V, 60V, 72V
Battery voltage is the other number that matters as much as capacity. Higher voltage generally means more power for the same current draw — it's why junior and balance bikes run 24V-36V packs, mid-weight trail bikes sit around 60V, and full-size motocross machines push 72V and beyond. Full breakdown here: [36V vs 48V vs 60V vs 72V: Electric Dirt Bike Voltage Explained](/blog/electric-dirt-bike-voltage-explained/).

### How to Extend Your Battery's Lifespan
Lithium batteries are durable, but how you charge and store one still affects how many years of real range you get. See [Lithium Battery Care: Charging Habits That Extend Dirt Bike Battery Life](/blog/lithium-battery-care-dirt-bike/) for partial-charge habits, heat management and storage voltage.

### When to Replace Your Battery
Every lithium pack loses some capacity over its lifespan — that's normal chemistry, not a fault. Knowing when reduced range means a genuine replacement is due (rather than terrain or riding style) is covered in [Signs Your Dirt Bike Battery Needs Replacing](/blog/signs-dirt-bike-battery-needs-replacing/).

### Shop Replacement & Upgrade Batteries
If you're after a genuine OEM replacement pack, a spare for longer riding days, or a high-capacity upgrade for extra range, our [High-Capacity Batteries](/shop/high-capacity-batteries/) range covers Surron, Talaria, Stark VARG and more — every listing states the exact voltage and amp-hour rating so you can match it to your bike.`,
    faq: [
      {
        question: "What's the difference between a lithium and lead-acid motorcycle battery?",
        answer: 'Lithium batteries are built for deep, repeated discharge and hold far more energy per kilogram, which is why every electric dirt bike uses lithium rather than the lead-acid battery found starting a petrol motorcycle. Lead-acid is designed for a short starter burst, not sustained power delivery.',
      },
      {
        question: 'What voltage battery does an electric dirt bike use?',
        answer: 'It depends on the bike’s size and purpose — junior and balance bikes typically run 24V-36V, mid-weight trail bikes around 60V, and full-size motocross machines 72V or higher.',
      },
      {
        question: 'How long does a motorcycle battery last?',
        answer: 'A well-maintained lithium pack typically delivers several years and hundreds of charge cycles before capacity drops enough to warrant replacement — actual lifespan depends on charging habits, heat exposure and how deeply it’s discharged each ride.',
      },
      {
        question: "Can I upgrade my electric dirt bike's battery for more range?",
        answer: 'Yes, on most models — see our High-Capacity Batteries range for higher-amp-hour packs built to fit specific bikes, adding real-world range without changing the bike itself.',
      },
    ],
  },
  {
    slug: 'electric-dirt-bike-cost-australia',
    title: 'What Does an Electric Dirt Bike Actually Cost in Australia?',
    excerpt: 'Real pricing across our range — from $549 balance bikes to $22,990 road-legal supermotos — and what actually drives the difference.',
    category: 'Buying Guide',
    date: '2026-08-12',
    readTime: '6 min read',
    image: '/images/home/cat-adult-electric-dirt-bikes.webp',
    content: `Electric dirt bike pricing in Australia spans a wide range because "electric dirt bike" covers everything from a toddler's first balance bike to a road-registerable 84V full-size motocross machine. Across our own range, prices run from $549 for an entry-level balance bike to $22,990 for a flagship road-legal supermoto — the number that matters is the price within your category, not the headline range.

### Balance & Mini Bikes: $549 – $3,790
Entry-level balance and mini bikes for kids aged roughly 3 to 9 make up the most affordable tier in our range. Browse [Balance & Mini Bikes](/shop/balance-mini-bikes/) to compare current models by seat height, weight and governed top speed.

### Junior Trials & Youth: $2,199 – $8,690
Stepping up to a youth-specific dirt bike with more power and a taller frame moves into this band — see [Junior Trials & Youth Dirt Bikes](/shop/junior-trials-youth-dirt-bikes/) for the full lineup.

### Trail & Mid-Weight Enduro: $5,500 – $9,990
Adult trail and enduro machines built for singletrack and bush riding sit in this range — browse [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/).

### Full-Size Motocross: $8,490 – $20,490
Competition-spec full-size motocross bikes, matching or exceeding 450cc petrol four-strokes, occupy our highest-power tier — see [Full-Size Motocross](/shop/full-size-motocross/).

### Road-Legal (ADR) Models: $7,500 – $22,990
Models built and equipped for road registration — lights, indicators, mirrors, a compliant VIN — carry the added cost of that hardware, spanning our widest price band. See [ADR Road-Legal Dirt Bikes](/shop/adr-road-legal-dirt-bikes/).

### Utility & Farm Bikes: $6,999 – $9,490
Silent, heavy-duty workhorses for cattle stations and paddock work sit in a fairly tight band — see [Utility & Farm E-Bikes](/shop/utility-farm-e-bikes/).

### What Actually Drives the Price Difference
Three things move the number more than anything else: battery capacity (a bigger kWh pack costs more and delivers more range), peak power output (a 72V+ motocross powertrain costs more to build than a 36V junior motor), and equipment level (road-legal hardware, premium suspension components, and brand all add cost on top of the base platform).

### Ways to Reduce Your Purchase Price
Pay with Bitcoin or Tether for an automatic 10% instant discount at checkout, or spread the cost with Pay in 4 — four equal fortnightly instalments at 0% interest. Model your own numbers on our [Finance Calculator](/finance/). Buying a part, battery, charger or gear item in the same order as a bike also gets that accessory item an automatic 5% discount.

### Ongoing Costs After Purchase
Electric dirt bikes carry meaningfully lower running costs than petrol equivalents — no oil changes, no spark plugs, no fuel, and a full charge typically costs a few dollars in electricity. Every full-size model we sell also carries a [2-Year Australian Factory Warranty](/faq/) on the frame, motor, controller and battery.

Ready to compare specific models? Use our [Compare tool](/compare/) to line up specs and pricing side by side, or browse the [full shop](/shop/) by category.`,
    faq: [
      {
        question: 'What is the cheapest electric dirt bike?',
        answer: 'Our most affordable models are entry-level balance bikes starting around $549 — see Balance & Mini Bikes for the current lineup and pricing.',
      },
      {
        question: 'How much does a full-size electric motocross bike cost?',
        answer: 'Full-size electric motocross bikes in our range are priced from $8,490 to $20,490, reflecting differences in battery capacity and peak power output between models.',
      },
      {
        question: 'Are electric dirt bikes cheaper to run than petrol?',
        answer: 'Yes — there’s no fuel, no oil changes and no spark plugs to budget for, and a full charge typically costs only a few dollars in electricity, so running costs are meaningfully lower over the life of the bike.',
      },
      {
        question: 'Can I finance an electric dirt bike in Australia?',
        answer: 'Yes — we offer Pay in 4 (four equal fortnightly instalments at 0% interest) as well as a 10% instant discount for paying in crypto. Use our Finance Calculator to model payments on any model.',
      },
    ],
  },
  {
    slug: 'electric-dirt-bike-voltage-explained',
    title: '36V vs 48V vs 60V vs 72V: Electric Dirt Bike Voltage Explained',
    excerpt: "What battery voltage actually controls, why bigger isn't automatically better, and how to match a voltage class to your riding.",
    category: 'Battery & Power',
    date: '2026-08-14',
    readTime: '6 min read',
    image: '/images/home/hero-3.webp',
    content: `Think of battery voltage like water pressure in a hose: it's the potential pushing current through the motor. A higher-voltage system can deliver more power for the same current draw, which is why voltage class tracks closely with how much performance a bike is built to produce — from a 24V balance bike to a 96V full-size motocross flagship.

### 24V–36V: Balance & Entry-Level Bikes
Balance and mini bikes for young riders run the lowest voltage class in our range, paired with governed top speeds and lightweight frames — enough power to teach throttle control and balance without being intimidating. See [Balance & Mini Bikes](/shop/balance-mini-bikes/).

### 48V–60V: Trail & Mid-Weight Machines
Trail and mid-weight enduro bikes step up to 48V-60V architecture, delivering enough torque for singletrack climbs and technical terrain while keeping weight manageable for all-day riding. See [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/).

### 72V and Beyond: Full-Size Motocross & Performance
Full-size motocross and flagship performance models push into 72V-96V territory, where peak power outputs climb into the 15-25kW+ range — genuinely competitive with 250cc-450cc petrol four-strokes. See [Full-Size Motocross](/shop/full-size-motocross/).

### Voltage vs Amp-Hours: Power vs Range
Voltage and amp-hours (Ah) answer two different questions. Voltage is roughly "how powerful," while amp-hours (multiplied by voltage, giving watt-hours) is "how far." Two bikes at the same voltage can have very different ranges depending on battery capacity — always check both numbers, not just voltage, when comparing models. Our [battery guide](/blog/motorcycle-ebike-battery-guide/) covers this in more depth.

### Does Higher Voltage Mean Faster Charging?
Not directly — charge time depends on the charger's amperage output relative to the battery's capacity, not voltage alone. A high-voltage bike with a high-amperage fast charger (like the ones in our [Fast Chargers](/shop/fast-chargers/) range) can still recharge quickly; voltage class and charge speed are separate specs.

### Matching a Bike to Your Riding Style
If you're buying for a young or beginner rider, lower voltage means gentler power delivery and an easier learning curve. If you're chasing motocross-level performance, you want the higher-voltage, higher-power end of the range. Use our [Compare tool](/compare/) to line up voltage, power output and range across models before deciding.`,
    faq: [
      {
        question: 'Is a 72V electric dirt bike faster than a 60V?',
        answer: 'Generally yes, all else being equal — higher voltage typically supports higher peak power output, which is why full-size motocross models run 72V and above while trail bikes sit around 60V. Peak power and top speed still depend on the specific motor and controller too.',
      },
      {
        question: "What's the difference between voltage and amp-hours?",
        answer: 'Voltage relates to power output, while amp-hours (battery capacity) relates to range — a bike’s watt-hour rating (voltage × amp-hours) is what actually determines how far it will go on a charge, so compare both figures, not voltage alone.',
      },
      {
        question: 'Can I put a higher voltage battery in my electric dirt bike?',
        answer: "Not without matching the motor and controller to that voltage — a battery, motor and controller are engineered together, so a mismatched voltage swap risks damaging the drivetrain. Stick to OEM-matched packs from our High-Capacity Batteries range.",
      },
      {
        question: 'What voltage is best for a beginner?',
        answer: 'For young or first-time riders, a lower voltage class (24V-36V for kids, or a 48V-60V trail bike for adult beginners) delivers gentler, more predictable power delivery while still being genuinely capable off-road.',
      },
    ],
  },
  {
    slug: 'electric-dirt-bikes-australia-buyers-guide',
    title: "Electric Dirt Bikes in Australia: The Full Buyer's Guide",
    excerpt: 'Where you can legally ride, what road registration actually requires, and how to check the rules that apply where you live.',
    category: 'Rider Compliance',
    date: '2026-08-17',
    readTime: '7 min read',
    image: '/images/home/cat-adr-road-legal-dirt-bikes.webp',
    content: `Buying an electric dirt bike in Australia means understanding two separate questions before you order: which model suits your riding, and where you're actually allowed to ride it. The second question depends on whether you're riding off-road only or need the bike registered for public roads — and the rules differ by state and territory, so this guide covers the general framework rather than guessing at specifics that change over time.

### Off-Road Riding on Private Property
Riding an off-road-only electric dirt bike on private land with the owner's consent — your own property, a friend's acreage, a farm — generally doesn't require registration or a road licence anywhere in Australia, the same as a petrol dirt bike. This is the most common way electric dirt bikes are ridden, and it's why the majority of our range (everything outside our [ADR Road-Legal](/shop/adr-road-legal-dirt-bikes/) category) is built off-road only.

### Riding at Motocross & Off-Road Parks
Commercial motocross tracks and dedicated off-road riding parks are generally open to electric dirt bikes for practice sessions, and most operators welcome them for the quiet, clean footprint. Always check the specific venue's own rules and any noise or category restrictions before you turn up.

### Road Registration (ADR) — What It Actually Requires
A road-legal electric dirt bike needs to meet Australian Design Rules (ADR) — the federal vehicle standards — which typically means headlights, tail lights, indicators, mirrors, a horn and a compliant VIN, plus whatever registration process your state's transport authority requires on top of that. Our [ADR Road-Legal Dirt Bikes](/shop/adr-road-legal-dirt-bikes/) range is built and equipped to meet these requirements from the factory.

### Checking Your State's Requirements
Because registration is administered by each state and territory's own transport authority (and requirements can be updated), the right move before ordering a road-legal model — or before assuming an off-road bike can be registered later — is to check directly with your local authority (Service NSW, TMR in Queensland, VicRoads, and the equivalent bodies in SA, WA, TAS, ACT and NT all publish their own current requirements). We keep our own compliance notes at [Electric Dirt Bike Laws in Australia](/blog/australian-electric-dirt-bike-laws-guide/), but always confirm current rules with your state before you buy if road registration is the goal.

### Which of Our Models Are Road-Legal
Every model in our [ADR Road-Legal Dirt Bikes](/shop/adr-road-legal-dirt-bikes/) category ships with the road-legal hardware fitted from the factory — every other model in our range is built off-road only. Check each product's own spec sheet, which states its road-legal status plainly.

### Getting Started
If you're not sure which category fits your plans, use our [Compare tool](/compare/) to line up off-road and road-legal models side by side, or [contact our team](/contact/) — we're happy to talk through what a given state's registration process typically involves before you order.`,
    faq: [
      {
        question: 'Do I need to register an electric dirt bike to ride on my own property?',
        answer: "No — off-road riding on private property with the owner's consent doesn't require registration anywhere in Australia, the same as a petrol dirt bike.",
      },
      {
        question: 'Which electric dirt bikes are road-legal?',
        answer: 'Every model in our ADR Road-Legal Dirt Bikes category is built and equipped from the factory to meet Australian Design Rules — headlights, indicators, mirrors, horn and a compliant VIN. Every other model in our range is off-road only.',
      },
      {
        question: 'How do I register an electric dirt bike in my state?',
        answer: "Registration is handled by each state or territory's own transport authority, and the exact process varies — check directly with your local authority (Service NSW, TMR Queensland, VicRoads, etc.) for the current requirements before you buy if road registration is your goal.",
      },
      {
        question: 'Can I ride an electric dirt bike on public bush tracks?',
        answer: "It depends on the specific track and land manager — some forestry roads and trail networks permit off-road riding, others don't. Check with the relevant land manager or your state's off-road riding association rather than assuming.",
      },
    ],
  },
  {
    slug: 'off-road-electric-bikes-explained',
    title: 'Off-Road Electric Bikes Explained: What They Are & Who They’re For',
    excerpt: 'How an off-road electric bike differs from an e-mountain-bike or e-scooter, and how to work out which category actually suits you.',
    category: 'E-Moto Performance',
    date: '2026-08-19',
    readTime: '5 min read',
    image: '/images/home/hero-1.webp',
    content: `An off-road electric bike is a motorcycle-format vehicle — a proper dirt bike frame, suspension, and seating position — powered entirely by a battery and electric motor rather than a petrol engine or pedal-assist system. That's the key distinction from an electric mountain bike (which still needs pedalling and caps assist at a much lower power level) or an electric scooter (built for pavement, not off-road terrain).

### How They Differ from Electric Mountain Bikes & E-Scooters
An electric mountain bike is fundamentally a bicycle with a motor helping the rider pedal, legally capped at a low power output in most jurisdictions. An off-road electric bike has no pedals at all — it's a genuine motorcycle-class machine, with a throttle, real suspension travel, and peak power outputs that can match or exceed a 250cc petrol dirt bike. An e-scooter, meanwhile, is built for paved surfaces and isn't designed for the terrain, ground clearance or suspension demands of trail or motocross riding at all.

### Who Off-Road Electric Bikes Are Built For
Our range spans several genuinely different rider types under this one umbrella: young kids on governed [balance and mini bikes](/shop/balance-mini-bikes/) building coordination, teens on [junior trials and youth models](/shop/junior-trials-youth-dirt-bikes/), adult trail riders and racers on [trail/enduro](/shop/trail-mid-weight-enduro/) and [full-size motocross](/shop/full-size-motocross/) machines, and property owners on silent [utility and farm bikes](/shop/utility-farm-e-bikes/) for mustering and fence runs.

### Key Specs to Understand Before Buying
Three numbers matter most: peak power (kW, tells you how much performance is available), battery capacity (kWh or Ah, tells you real-world range), and voltage class (see our [voltage guide](/blog/electric-dirt-bike-voltage-explained/) for what that actually means). Weight and suspension travel matter too, especially for taller adult riders or serious trail use.

### Off-Road vs Road-Legal: Which Do You Need
If you're only ever riding on private property, trails, or at a dedicated off-road park, an off-road-only model is the right (and typically more affordable) choice. If you need to ride to the trailhead on public roads, look specifically at our [ADR Road-Legal](/shop/adr-road-legal-dirt-bikes/) range, built with the required lighting and registration hardware from the factory.

Not sure which category fits your riding? Use our [Compare tool](/compare/) to line up models side by side, or browse the [full shop](/shop/).`,
    faq: [
      {
        question: "What's the difference between an off-road electric bike and an electric mountain bike?",
        answer: 'An off-road electric bike is a genuine motorcycle-class machine with a throttle and no pedals, while an electric mountain bike is a bicycle with pedal-assist, legally capped at a much lower power output.',
      },
      {
        question: 'Are off-road electric bikes street legal?',
        answer: "Most off-road electric bikes are off-road only. Only models specifically built and equipped for road registration — our ADR Road-Legal range — are street legal, and even then registration still needs to be completed with your state's transport authority.",
      },
      {
        question: 'What age can ride an off-road electric bike?',
        answer: "There's a model for nearly every age — governed balance and mini bikes start from around age 3, junior/youth models suit school-age riders, and full-size adult machines are built for adult riders. Check each product's recommended age range.",
      },
      {
        question: 'Do off-road electric bikes need a licence?',
        answer: "No licence is needed to ride off-road on private property. A licence and road registration are only required for a road-legal model being ridden on public roads, and that requirement comes from your state's transport laws, not the bike itself.",
      },
    ],
  },
  {
    slug: 'ebike-dirt-bike-chargers-explained',
    title: 'E-Bike & Dirt Bike Chargers Explained: Voltage, Amps & Charge Times',
    excerpt: 'What actually determines charge time, why the charger has to match your battery, and how our fast chargers compare.',
    category: 'Battery & Power',
    date: '2026-08-21',
    readTime: '5 min read',
    image: '/images/products/ebmx-x-9000-aftermarket-controller.webp',
    content: `An electric dirt bike charger has two numbers that matter: voltage (which must match your battery pack exactly) and amperage (which, combined with your battery's amp-hour capacity, determines how long a full charge actually takes). Get the voltage wrong and a charger simply won't work safely with your pack — get the amperage right and you can cut charge time dramatically over a standard charger.

### Voltage Has to Match, No Exceptions
Every charger in our [Fast Chargers](/shop/fast-chargers/) range is sold matched to a specific voltage class — 36V, 48V, 60V or 72V — because a mismatched charger can damage a battery pack or fail to charge it at all. Always check your bike or battery's rated voltage before ordering a replacement or spare charger.

### Amperage Is What Speeds Things Up
A standard charger might supply 5-8 amps; a genuine fast charger in the 15-20A range can cut charge time by more than half. As a rough guide, charge time (hours) is approximately battery amp-hours divided by charger amps — a 40Ah pack on a 20A fast charger charges in roughly two hours, versus 5-6 hours on a slower charger.

### Australian Plug & Power Standards
Every charger we sell is built for Australian 240V mains power with a standard AU wall plug — no adapters, no step-down transformers, straight into any home power point.

### Charging Away From Home
If you're camping, touring, or don't have easy access to mains power, see our guide on [charging electric dirt bikes in remote outback campsites](/blog/charging-electric-dirt-bikes-off-grid/) for solar and 4WD inverter setups, or [Charging an Electric Dirt Bike at Home](/blog/charging-electric-dirt-bike-at-home/) for the everyday setup.

### Shop Chargers & Spares
Browse [Fast Chargers](/shop/fast-chargers/) for genuine OEM and aftermarket options matched to Surron, Talaria, Stark VARG and more.`,
    faq: [
      {
        question: 'How long does it take to charge an electric dirt bike?',
        answer: 'It depends on your battery capacity and charger amperage — as a rough guide, divide battery amp-hours by charger amps. A fast charger in the 15-20A range typically charges a full-size battery in two to three hours.',
      },
      {
        question: 'Can I use any charger on my electric dirt bike?',
        answer: "No — a charger's voltage has to match your battery pack exactly. Using a mismatched-voltage charger can damage the battery or fail to charge it safely, so always check the rated voltage before buying a replacement.",
      },
      {
        question: "What's the difference between a standard and fast charger?",
        answer: 'The difference is amperage — a fast charger supplies significantly more current (often 15-20A versus 5-8A on a standard charger), cutting charge time by more than half for the same battery.',
      },
      {
        question: 'Do your chargers work with standard Australian power points?',
        answer: 'Yes — every charger we sell is built for Australian 240V mains power with a standard AU wall plug, ready to use straight out of the box.',
      },
    ],
  },
  {
    slug: 'dirt-bike-racks-tow-bar-carriers',
    title: 'Best Dirt Bike Racks & Tow-Bar Carriers for Australian Utes',
    excerpt: 'Hitch carriers vs tray mounts, what weight rating to look for, and how to secure your bike properly for the trip to the trail.',
    category: 'Gear & Accessories',
    date: '2026-08-24',
    readTime: '5 min read',
    image: '/images/products/ballards-heavy-duty-e-moto-hitch-carrier.webp',
    content: `Getting your electric dirt bike to the trail or track usually means one of two setups: a hitch-mounted carrier on your tow bar, or loading it directly into a ute tray or trailer. Both work well — which one suits you depends on your vehicle, how often you're transporting, and whether you're carrying just one bike or several.

### Hitch-Mounted Carriers
A 2-inch hitch bike carrier bolts onto your tow bar receiver and lets you load a bike without lifting it into a tray — genuinely useful for a single rider or lighter electric models, since most e-dirt bikes weigh less than a comparable petrol machine. Look for a weight rating comfortably above your bike's actual weight (check the spec sheet — most of our range sits between 40kg and 100kg) and a ramp or low loading angle to keep the lift manageable.

### Tray & Trailer Loading
For multiple bikes, heavier models, or if you already tow a trailer, loading directly into a ute tray or onto a trailer deck is often simpler and more secure — just make sure your tie-down setup is rated for the load and won't damage bodywork or suspension components in transit.

### Securing the Load Properly
Whichever method you use, soft-loop tie-down straps (not hard hooks, which can damage frame or fork components) rated for the bike's weight are essential, front and rear, at proper angles to stop the bike shifting under braking. See our [Transport & Hitch Carriers](/shop/storage-transport/) range for hitch carriers, tie-down straps and weatherproof covers.

### Protecting Your Bike in Transit
A weatherproof cover is worth adding if you're driving any distance, especially on dusty roads or in rain — it protects paint, graphics and electronics from road grime during transport.`,
    faq: [
      {
        question: 'Do I need a special rack for an electric dirt bike?',
        answer: "Not a special one — standard hitch bike carriers and tray/trailer setups work fine for electric dirt bikes. Just check the weight rating comfortably covers your bike's actual weight, listed on its spec sheet.",
      },
      {
        question: 'How much does an electric dirt bike weigh for transport purposes?',
        answer: 'Weight varies by model — most of our range sits between roughly 40kg and 100kg, lighter than a comparable petrol dirt bike. Check the specific product’s spec sheet for its exact weight before choosing a carrier.',
      },
      {
        question: 'What tie-down straps should I use?',
        answer: 'Soft-loop tie-down straps rated for your bike’s weight, secured front and rear at proper angles — avoid hard hooks directly on frame or fork components, which can cause damage.',
      },
    ],
  },
  {
    slug: 'motocross-boot-buying-guide',
    title: 'Motocross Boot Buying Guide: Fit, Colour & Break-In Tips',
    excerpt: 'How motocross boots should fit, what to expect during break-in, and how to choose between the styles and colours we stock.',
    category: 'Gear & Accessories',
    date: '2026-08-26',
    readTime: '5 min read',
    image: '/images/products/alpinestars-tech-7-enduro-boots.webp',
    content: `Motocross boots are built stiffer and taller than any other riding boot for a reason — they protect your shins, ankles and feet from impacts and roost while still letting you shift and brake precisely. Getting the fit right matters more with MX boots than almost any other gear item, because a boot that's too loose won't protect properly, and one that's too tight will be genuinely painful before you're an hour into a ride.

### Getting the Fit Right
Motocross boots should fit snugly with a thin sock, with your toes just touching the front and enough room to wiggle them slightly. Unlike casual footwear, don't size up "to be safe" — a boot with extra room inside will let your foot move during hard braking and landings, which is exactly what the boot is meant to prevent.

### Break-In Expectations
New motocross boots, especially full-leather models like the [Alpinestars Tech 7 Enduro Boots](/shop/boots/alpinestars-tech-7-enduro-boots/) or [Sidi Crossfire 3 SRS Boots](/shop/boots/sidi-crossfire-3-srs-boots/), will feel stiff for the first few rides as the material and buckles settle to your foot and calf shape. This is normal — avoid the temptation to buy a size up to compensate, as the stiffness eases with wear while the fit stays protective.

### Leather vs Synthetic
Both materials are used across our range, each with real trade-offs — see our dedicated comparison, [Leather vs Synthetic Motocross Boots: Which Lasts Longer?](/blog/leather-vs-synthetic-motocross-boots/), for the full breakdown.

### Colour & Style
Boot colour is purely personal preference and doesn't affect protection — pick what matches your kit, or go with black for the most versatile option across different gear combinations.

### Shop the Range
Browse [Enduro & Motocross Boots](/shop/boots/) for adult and youth sizing across multiple brands and price points.`,
    faq: [
      {
        question: 'How should motocross boots fit?',
        answer: 'Snugly, with a thin sock — toes just touching the front, minimal internal movement. Don’t size up for extra comfort; a loose boot won’t protect your ankle properly during hard braking or landings.',
      },
      {
        question: 'How long does it take to break in motocross boots?',
        answer: 'Typically a few rides — new boots, especially full-leather models, feel stiff at first as the material and buckles settle to your foot and calf shape. The stiffness eases while the protective fit is maintained.',
      },
      {
        question: 'Does boot colour affect protection?',
        answer: "No — colour is purely a style choice and has no effect on a boot's protective rating. Pick whatever matches your kit or personal preference.",
      },
    ],
  },
  {
    slug: 'what-is-an-enduro-motorbike',
    title: 'What Is an Enduro Motorbike? Electric Enduro Explained',
    excerpt: 'How enduro riding differs from motocross, what makes a bike enduro-specific, and where electric enduro bikes fit in.',
    category: 'E-Moto Performance',
    date: '2026-08-28',
    readTime: '5 min read',
    image: '/images/home/cat-trail-enduro.webp',
    content: `An enduro motorbike is built for long-distance off-road riding across varied terrain — bush trails, rocky ridgelines, creek crossings — rather than the short, intense laps of a closed motocross track. Enduro bikes typically carry more suspension travel, a larger battery or fuel tank for extended range, and a more upright, all-day riding position compared to a motocross-focused machine.

### Enduro vs Motocross: The Core Difference
Motocross is raced on a closed circuit with jumps and berms over a short, high-intensity session. Enduro is ridden point-to-point or in loops over hours, often across genuinely unpredictable terrain — the bike needs to be comfortable and efficient for distance, not just explosive for a two-minute moto. We cover this comparison in more depth in [Enduro vs Motocross: Which Electric Dirt Bike Should You Buy?](/blog/enduro-vs-motocross-which-to-buy/)

### What Makes an Electric Enduro Bike Different
An electric enduro bike swaps the petrol engine for a battery and motor sized for range and torque delivery rather than outright peak power — smooth, controllable throttle response matters more for hours of technical trail riding than the instant top-end punch a motocross rider wants for a short moto.

### Range & Battery Considerations
Because enduro riding covers more distance per session, battery capacity matters more here than for motocross use — our [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/) range is built with this in mind, and a [high-capacity battery upgrade](/shop/high-capacity-batteries/) is worth considering if you're regularly riding longer loops.

### Who Enduro Suits
If your riding is mostly point-to-point trail exploration, bush navigation or multi-hour rides rather than lapping a motocross track, an enduro-focused model is the better starting point. Browse [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/) to compare current models.`,
    faq: [
      {
        question: "What's the difference between enduro and motocross?",
        answer: 'Motocross is raced on a closed circuit over a short, intense lap; enduro covers longer distances across varied off-road terrain, so the bikes are built for endurance and range rather than pure explosive power.',
      },
      {
        question: 'Is an electric enduro bike good for beginners?',
        answer: 'Yes, often more so than a motocross-focused machine — enduro bikes are typically set up for smoother, more predictable power delivery suited to longer, varied-terrain riding rather than aggressive track use.',
      },
      {
        question: 'How far can an electric enduro bike ride on one charge?',
        answer: "Range depends on the specific model's battery capacity, terrain and rider weight — check each product's spec sheet for its rated range, or consider a high-capacity battery upgrade for longer sessions.",
      },
    ],
  },
  {
    slug: 'leather-vs-synthetic-motocross-boots',
    title: 'Leather vs Synthetic Motocross Boots: Which Lasts Longer?',
    excerpt: 'Durability, break-in time, weight and price — the real trade-offs between leather and synthetic motocross boot construction.',
    category: 'Gear & Accessories',
    date: '2026-08-31',
    readTime: '4 min read',
    image: '/images/products/sidi-crossfire-3-srs-boots.webp',
    content: `Motocross boots are built from either full-grain leather or modern synthetic microfibre materials, and both are genuinely good options — the right choice comes down to how you ride and what you value most between longevity, break-in comfort and price.

### Leather: Longer-Term Durability, Longer Break-In
Full-grain leather, used in boots like the [Alpinestars Tech 7 Enduro Boots](/shop/boots/alpinestars-tech-7-enduro-boots/), typically outlasts synthetic materials over years of hard use — it resists abrasion well and can often be re-conditioned rather than replaced. The trade-off is a longer break-in period, since leather needs to shape itself to your foot and calf over several rides.

### Synthetic: Faster Break-In, Often Lighter
Synthetic microfibre boots, like the [Sidi Crossfire 3 SRS Boots](/shop/boots/sidi-crossfire-3-srs-boots/), are typically ready to ride comfortably sooner, often weigh less, and can handle wet conditions without absorbing water the way leather can. Modern synthetics have closed much of the old durability gap with leather, though very high-mileage riders still often prefer leather's long-term resilience.

### Which Actually Lasts Longer?
For riders putting in serious hours week after week, leather generally has the edge on total lifespan, especially with basic care (cleaning, conditioning). For moderate or seasonal riders, the difference in practical lifespan is much smaller, and synthetic's faster break-in and lighter weight can be the better trade.

### Price
Synthetic boots are often (though not always) positioned at a lower price point than premium full-leather models — check each product's own listing for exact pricing.

### Our Recommendation
If you ride multiple times a week year-round, lean leather. If you ride occasionally or want a boot that's comfortable from the first ride, synthetic is a genuinely strong choice. Browse the full [Enduro & Motocross Boots](/shop/boots/) range to compare both.`,
    faq: [
      {
        question: 'Are leather motocross boots better than synthetic?',
        answer: "Leather generally lasts longer under heavy, frequent use and can often be re-conditioned rather than replaced, but synthetic boots break in faster, are often lighter, and have closed much of the old durability gap.",
      },
      {
        question: 'Do synthetic motocross boots break in faster than leather?',
        answer: 'Yes — synthetic materials are typically comfortable sooner, while leather needs several rides to shape itself to your foot and calf before it feels fully broken in.',
      },
    ],
  },
  {
    slug: 'lithium-battery-care-dirt-bike',
    title: 'Lithium Battery Care: Charging Habits That Extend Dirt Bike Battery Life',
    excerpt: "Simple charging and storage habits that meaningfully extend a lithium pack's usable lifespan — and a few that quietly shorten it.",
    category: 'Battery & Power',
    date: '2026-09-02',
    readTime: '5 min read',
    image: '/images/products/surron-ultra-bee-oem-battery-74v-55ah.webp',
    content: `Lithium batteries are genuinely low-maintenance compared to lead-acid, but a few charging and storage habits make a real difference to how many years of usable range you get out of a pack before it needs replacing.

### Avoid Storing at 100% or 0% Charge
Lithium cells age fastest when held for long periods at full charge or fully depleted. If you're not riding for a week or more, aim to store the bike at roughly 40-60% charge rather than topping it up to 100% and leaving it — most of our chargers make it easy to stop a charge partway through if you're storing rather than riding immediately.

### Heat Is the Real Enemy
Lithium batteries degrade faster in sustained heat — leaving a bike in direct Australian summer sun, or charging immediately after a hard, hot ride without letting the pack cool first, both accelerate wear. Charge in shade where possible, and give a genuinely hot pack 15-20 minutes to cool before plugging in.

### Partial Charges Are Fine — Full Discharges Aren't Ideal
Unlike old nickel-based batteries, lithium has no "memory effect," so topping up from 60% to 90% between rides is completely fine and actually gentler on the cells than routinely running all the way to empty. Try not to make a habit of fully draining the pack before charging.

### Use the Charger Built for Your Bike
Always charge with a voltage-matched charger — see our [Fast Chargers](/shop/fast-chargers/) range for genuine OEM and compatible options. A mismatched charger doesn't just risk poor charging; it can meaningfully shorten a pack's lifespan.

### Know the Warning Signs
Even with good habits, every lithium pack eventually loses enough capacity to warrant replacement. See [Signs Your Dirt Bike Battery Needs Replacing](/blog/signs-dirt-bike-battery-needs-replacing/) for what reduced range actually looks like versus normal riding variation.

### Shop Replacement Packs
When it's genuinely time, browse [High-Capacity Batteries](/shop/high-capacity-batteries/) for OEM and upgraded packs matched to your model.`,
    faq: [
      {
        question: 'Should I charge my electric dirt bike battery to 100% every time?',
        answer: "For regular riding, charging to 100% before a ride is fine. For storage of a week or more, it's better for long-term battery health to store the pack at roughly 40-60% charge rather than leaving it at full.",
      },
      {
        question: 'Does heat damage lithium batteries?',
        answer: 'Yes — sustained heat is one of the biggest factors in lithium battery degradation. Avoid charging a hot battery immediately after a ride, and store the bike out of direct sun where possible.',
      },
      {
        question: 'Is it bad to charge a lithium battery when it’s only partly discharged?',
        answer: "No — lithium batteries have no memory effect, so partial charges are fine and generally gentler on the cells than routinely running the pack all the way to empty before charging.",
      },
    ],
  },
  {
    slug: 'first-electric-off-road-bike-guide',
    title: 'Buying Your First Electric Off-Road Bike: A Beginner’s Guide',
    excerpt: "What actually matters when you're new to off-road riding — power, weight, seat height and which category to start with.",
    category: 'Buying Guide',
    date: '2026-09-04',
    readTime: '6 min read',
    image: '/images/home/cat-utility-farm-e-bikes.webp',
    content: `Buying your first electric off-road bike is less about finding "the best" model and more about matching a bike's power, weight and seat height to your actual experience level — a bike that's too powerful or too tall to comfortably touch the ground is a genuinely worse starting point than a smaller, more manageable machine, even if it looks less impressive on paper.

### Start With Power You Can Control
More peak power isn't automatically better for a first bike — a machine with aggressive, instant throttle response can be genuinely intimidating (and less safe) for someone still learning throttle control and body positioning. Our [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/) range generally offers a gentler, more progressive power delivery than our full-size motocross machines, making it a sensible starting category for adult beginners.

### Weight Matters More Than You'd Think
A lighter bike is easier to pick up after a drop (which happens to everyone learning), easier to manoeuvre at walking pace, and less fatiguing over a longer ride. Check each product's spec sheet for its weight — electric dirt bikes are generally lighter than comparable petrol machines, which helps here.

### Seat Height & Fit
Being able to comfortably flat-foot or at least confidently tip-toe the bike at a stop matters enormously for beginner confidence. If you're not sure, [contact our team](/contact/) with your height and inseam and we can point you toward models that will fit properly.

### Which Category Should You Start With?
If you're an adult new to off-road riding, [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/) is usually the sensible starting point over full-size motocross. If you're buying for a child or teen, our [Junior Trials & Youth](/shop/junior-trials-youth-dirt-bikes/) and [Balance & Mini Bikes](/shop/balance-mini-bikes/) ranges are purpose-built for that. See our dedicated guide, [Electric Kids Motorbikes: Age & Size Guide for Parents](/blog/electric-kids-motorbikes-age-size-guide/), if you're buying for a young rider.

### Don't Forget the Basics
A first bike purchase should include a properly fitted helmet, boots and basic protection from day one — see our [Complete Riding Gear Checklist for New Electric Dirt Bike Owners](/blog/riding-gear-checklist-new-owners/) for exactly what to add to your order.

Ready to compare models? Use our [Compare tool](/compare/) or browse the full [shop](/shop/).`,
    faq: [
      {
        question: 'What is the best electric dirt bike for a beginner?',
        answer: "Rather than one 'best' model, look for a bike with progressive, controllable power delivery and manageable weight — our Trail & Mid-Weight Enduro range is generally a better starting point for adult beginners than full-size motocross machines.",
      },
      {
        question: 'How much power does a beginner electric dirt bike need?',
        answer: "Less than you might think — a lower peak power output with smooth throttle response is easier and safer to learn on than an aggressive, high-output machine, even if it's less impressive on paper.",
      },
      {
        question: 'What gear do I need when buying my first electric dirt bike?',
        answer: 'At minimum, a properly fitted helmet, boots and basic body protection — see our full Riding Gear Checklist for New Owners for the complete list.',
      },
    ],
  },
  {
    slug: 'electric-kids-motorbikes-age-size-guide',
    title: 'Electric Kids Motorbikes: Age & Size Guide for Parents',
    excerpt: "Matching balance bikes, junior trials models and youth dirt bikes to your child's age, height and confidence level.",
    category: 'Buying Guide',
    date: '2026-09-07',
    readTime: '5 min read',
    image: '/images/home/cat-kids-youth-electric-dirt-bikes.webp',
    content: `Choosing an electric kids motorbike comes down to matching three things to your child: age and confidence, physical size (inseam and height, more useful than age alone), and how much governed top speed and power is appropriate for their experience level. Our range spans three distinct tiers built around exactly this progression.

### Ages ~3-9: Balance & Mini Bikes
Our [Balance & Mini Bikes](/shop/balance-mini-bikes/) range is built for the youngest riders, with low, adjustable seat heights, governed low top speeds, and lightweight frames young kids can genuinely control. These bikes teach balance and basic throttle control before a child is ready for anything more powerful — see our [FAQ on balance bikes](/faq/) for more on why they're often recommended over training wheels.

### Ages ~6-12: Junior Trials & Youth
As riders build confidence and grow, [Junior Trials & Youth Dirt Bikes](/shop/junior-trials-youth-dirt-bikes/) offer more power and a taller frame while still being governed and sized appropriately for younger riders — a genuine step up in capability without jumping straight to an adult-power machine.

### Sizing by Height, Not Just Age
Age is a rough guide only — a tall 6-year-old and a smaller 9-year-old might suit the same model. Check each product's seat height spec against your child's inseam, and where possible, have them stand over the bike before you order to confirm a comfortable, confident fit.

### Safety Gear for Young Riders
A properly fitted youth helmet (never an adult helmet "that'll grow into it" — fit matters for protection, not just comfort), knee and elbow protection, and appropriately sized boots or sturdy closed footwear are essential from the first ride. Browse [Riding Gear & Protection](/shop/riding-gear/) for youth-specific sizing across helmets, gloves and boots.

### When to Step Up
There's no fixed age to move from one tier to the next — it's about outgrowing the current bike's seat height and power ceiling, and showing consistent, confident throttle and brake control. If you're unsure which tier suits your child right now, [contact our team](/contact/) with their age and height and we'll point you to the right range.`,
    faq: [
      {
        question: 'What age is appropriate for an electric kids motorbike?',
        answer: "Balance and mini bikes suit roughly ages 3-9, while junior trials and youth models suit riders around 6-12 who have outgrown a balance bike's seat height and power ceiling — height and confidence matter more than age alone.",
      },
      {
        question: 'How do I know what size electric bike my child needs?',
        answer: "Check the seat height on each product's spec sheet against your child's inseam, and where possible have them stand over the bike before ordering to confirm a confident, flat-footed fit.",
      },
      {
        question: "Do kids' electric dirt bikes have a speed limiter?",
        answer: "Yes — every model in our Balance & Mini Bikes and Junior Trials & Youth ranges has a governed top speed appropriate for its age group, adjustable on many models as your child's confidence grows.",
      },
    ],
  },
  {
    slug: 'dirt-bike-lift-table-workshop-setup',
    title: 'Do You Need a Bike Lift Table? Dirt Bike Workshop Setup Basics',
    excerpt: 'What a lift table actually does for maintenance, and the basic pit stand and tool setup worth having at home.',
    category: 'Maintenance',
    date: '2026-09-09',
    readTime: '4 min read',
    image: '/images/products/matrix-concepts-a2-aluminum-pit-stand.webp',
    content: `A bike lift table raises your dirt bike to a comfortable working height for maintenance — chain adjustment, brake bleeding, wheel removal — instead of you crouching over it on the ground. It's not strictly essential for basic upkeep, but it makes routine maintenance genuinely faster and easier on your back, especially if you're doing it regularly.

### What a Lift Table Actually Helps With
Anything involving the wheels, chain, brakes or underside of the bike is dramatically easier at waist height than on the ground — you get better visibility, better leverage on fasteners, and don't need to hold the bike upright while you work. If you're doing your own chain tension checks, tyre changes or brake pad inspections regularly, a lift table pays for itself in time and comfort.

### Do You Actually Need One?
For occasional riders doing basic checks — tyre pressure, quick visual inspections — a simpler [bike stand](/shop/bike-stands-tools/) that just holds the bike upright without raising it is often enough. A full lift table makes more sense if you're maintaining multiple bikes, doing more involved work, or simply want to save your back on a regular basis.

### Basic Workshop Setup Worth Having
Beyond a stand or lift table, a basic hex/torx/spanner tool kit, a torque wrench for critical fasteners, and a puncture repair kit cover the vast majority of routine maintenance needs. See our [Bike Stands & Pit Mats](/shop/bike-stands-tools/) range for stands, lift tables and the basic tool kit together.

### Keeping Things Clean While You Work
A FIM-approved environmental pit mat under the bike keeps any fluids contained and your workshop floor (or driveway) clean — worth adding if you're doing any maintenance involving oils, greases or cleaning chemicals.`,
    faq: [
      {
        question: 'Do I need a lift table for basic dirt bike maintenance?',
        answer: "Not strictly — a simple stand that holds the bike upright is enough for basic checks. A lift table becomes worthwhile if you're doing more involved maintenance regularly, since it raises the bike to a comfortable working height.",
      },
      {
        question: "What's the difference between a bike stand and a lift table?",
        answer: 'A basic stand holds the bike upright at ground level for simple tasks like wheel or chain work; a lift table actually raises the whole bike to waist height, making more involved maintenance significantly easier.',
      },
    ],
  },
  {
    slug: 'electric-motocross-vs-petrol-comparison',
    title: 'Electric Motocross Bikes: How They Compare to Petrol 250cc/450cc',
    excerpt: 'Power delivery, weight, maintenance and running cost — a genuine look at how electric motocross stacks up against 250cc and 450cc four-strokes.',
    category: 'E-Moto Performance',
    date: '2026-09-11',
    readTime: '6 min read',
    image: '/images/home/cat-full-size-motocross.webp',
    content: `Modern electric motocross bikes genuinely compete with 250cc and 450cc petrol four-strokes on power and performance — the comparison today is less "can electric keep up" and more about the real differences in how that power is delivered and what owning one actually costs over time.

### Power Delivery: Instant vs Building
A 250cc-450cc petrol four-stroke builds power through the rev range, requiring gear shifts and clutch work to stay in the powerband. Our [Full-Size Motocross](/shop/full-size-motocross/) electric models deliver peak torque immediately from a standstill, with no clutch or gearbox to manage — a fundamentally different (many riders find more controllable) power delivery, especially in technical terrain.

### Weight
Electric motocross bikes are typically lighter than a comparable petrol machine once you account for the absence of a fuel tank, exhaust system, radiator and clutch assembly — check individual product spec sheets for exact weights, but the lithium battery pack generally doesn't add back all the weight those components would have contributed.

### Noise & Where You Can Ride
This is one of the most practical differences: electric motocross bikes run near-silent, opening up riding locations — private acreage, some forestry roads — where a loud petrol bike would be unwelcome or prohibited. See our [Electric Dirt Bike Laws in Australia](/blog/australian-electric-dirt-bike-laws-guide/) guide for where this actually matters.

### Maintenance & Running Costs
No oil changes, no spark plugs, no carburettor to clean or jet, no clutch to wear out — electric motocross maintenance is largely limited to chain, brakes, tyres and suspension, the same wear items every dirt bike shares. Charging costs a few dollars versus fuel, and there's no engine rebuild looming at a set hour interval.

### Where Petrol Still Has an Edge
Ride time per "tank" is the honest trade-off — a petrol bike refuels in minutes, while an electric bike needs charge time (though a spare battery, available across our [High-Capacity Batteries](/shop/high-capacity-batteries/) range, solves this for longer sessions). For very long, remote multi-day rides without charging infrastructure, petrol still has a genuine practical edge.

### Making the Comparison Yourself
Use our [Compare tool](/compare/) to line up specific model specs, or read our full cost breakdown in [What Does an Electric Dirt Bike Actually Cost in Australia?](/blog/electric-dirt-bike-cost-australia/)`,
    faq: [
      {
        question: 'Is an electric motocross bike as powerful as a 450cc petrol bike?',
        answer: 'Modern electric motocross bikes deliver genuinely competitive peak power and, unlike petrol bikes, full torque instantly from a standstill rather than building through the rev range.',
      },
      {
        question: 'Are electric motocross bikes lighter than petrol bikes?',
        answer: 'Generally yes — without a fuel tank, exhaust system, radiator and clutch assembly to carry, electric motocross bikes are typically lighter than a comparable petrol four-stroke, even accounting for the battery pack.',
      },
      {
        question: 'How long can you ride an electric motocross bike before recharging?',
        answer: "Ride time depends on the model's battery capacity, terrain and riding intensity — check each product's rated range, or carry a spare battery from our High-Capacity Batteries range for longer sessions.",
      },
    ],
  },
  {
    slug: 'trickle-chargers-electric-dirt-bikes',
    title: 'Trickle Chargers for Electric Dirt Bikes: Do You Need One?',
    excerpt: "Why lithium electric dirt bikes generally don't need a trickle charger the way petrol bikes do — and the storage habits that matter instead.",
    category: 'Battery & Power',
    date: '2026-09-14',
    readTime: '4 min read',
    image: '/images/home/hero-4.webp',
    content: `A trickle charger keeps a battery topped up with a very low current during long periods of storage. They're a near-essential accessory for petrol motorcycles, whose lead-acid batteries self-discharge quickly and can be permanently damaged by sitting flat. For a lithium electric dirt bike, the picture is different — and usually simpler.

### Lithium Batteries Barely Self-Discharge
A modern lithium pack loses only a small percentage of its charge per month sitting idle, compared to the rapid drain of a lead-acid battery. That means an electric dirt bike stored for a few weeks generally doesn't need to be connected to anything at all.

### The Real Storage Rule: Charge Level, Not Constant Charging
Rather than keeping a lithium pack permanently topped up, the better practice for storage of a month or more is to leave it at roughly 40-60% charge — holding lithium cells at 100% for long periods actually accelerates ageing. See [Lithium Battery Care: Charging Habits That Extend Dirt Bike Battery Life](/blog/lithium-battery-care-dirt-bike/) for the full detail.

### When a Maintenance Charge Does Make Sense
For very long-term storage (several months or more), checking the charge every 6-8 weeks and topping back up to the mid-range if it's dropped is worthwhile. Some riders use a smart charger that can be set to maintain a specific charge level rather than a traditional constant trickle — our [Fast Chargers](/shop/fast-chargers/) range includes smart chargers with charge monitoring.

### What Not to Do
Don't leave a lithium pack fully depleted for months — that's the one storage state that can genuinely harm it. And always use a voltage-matched charger; a trickle charger designed for a 12V lead-acid motorcycle battery is not appropriate for a 60V or 72V lithium dirt bike pack.`,
    faq: [
      {
        question: 'Do electric dirt bikes need a trickle charger?',
        answer: "Generally no — lithium batteries self-discharge very slowly, so an electric dirt bike stored for a few weeks doesn't need to be connected to anything. For long-term storage, storing at 40-60% charge matters more than constant charging.",
      },
      {
        question: 'Can I use a motorcycle trickle charger on an electric dirt bike?',
        answer: "No — a trickle charger built for a 12V lead-acid motorcycle battery is not suitable for a 60V or 72V lithium dirt bike pack. Always use a voltage-matched charger designed for your bike.",
      },
      {
        question: 'How should I store an electric dirt bike battery long-term?',
        answer: 'Leave the pack at roughly 40-60% charge, keep it out of direct heat, and check it every 6-8 weeks over multi-month storage, topping back up to the mid-range if it has dropped. Avoid leaving it fully charged or fully flat for long periods.',
      },
    ],
  },
  {
    slug: 'motocross-body-armour-guide',
    title: 'Motocross Body Armour Guide: What Protection Do You Actually Need?',
    excerpt: 'Chest protectors, roost deflectors, back protectors and pressure-suit armour — what each does and how to decide what you need.',
    category: 'Gear & Accessories',
    date: '2026-09-16',
    readTime: '5 min read',
    image: '/images/products/leatt-chest-protector-4-5-pro.webp',
    content: `Motocross body armour ranges from a lightweight roost deflector that just stops flying dirt and rocks stinging, up to a full CE Level 2 pressure suit with certified impact protection at the chest, back, shoulders and elbows. Working out what you need comes down to how and where you ride.

### Roost Deflector vs Chest Protector
A roost deflector is a hard plastic shell that protects against roost — the spray of dirt and stones thrown up by other riders — and minor impacts. A full chest protector adds certified impact absorption. If you're riding trails alone or at low intensity, a roost deflector may be enough; if you're riding a busy track or racing, a certified chest protector is the sensible choice.

### Back Protectors
A back protector — either built into a chest protector or worn as a standalone insert — protects the spine in a crash or when landing badly. Many riders consider this the single most important armour piece after a helmet. Our [Body Armour & Chest Protectors](/shop/body-armour/) range includes options with integrated back protection.

### CE Levels: What They Mean
CE Level 1 armour meets a baseline impact standard; CE Level 2 absorbs significantly more energy and is the choice for higher-speed or racing use. Check each product's listed CE rating — the [Leatt Chest Protector 4.5 Pro](/shop/body-armour/leatt-chest-protector-4-5-pro/) and [Alpinestars Bionic Action V2 Protection Jacket](/shop/body-armour/alpinestars-bionic-action-v2-protection-jacket/) are examples of full-coverage options in our range.

### Neck Braces
A neck brace limits the extreme head movement that causes serious neck injuries in a crash. They're standard among serious motocross racers and increasingly common in trail riding too — the [Leatt GPX 5.5 Composite Neck Brace](/shop/body-armour/leatt-gpx-5-5-composite-neck-brace/) is one option we stock.

### Youth Armour
Kids need properly sized armour, not scaled-down adult gear — the [Fox Racing Youth Titan Sport Roost Deflector](/shop/body-armour/fox-racing-youth-titan-sport-roost-deflector/) is a youth-specific example. Browse the full [Body Armour & Chest Protectors](/shop/body-armour/) range for adult and youth sizing.

### The Short Version
Helmet first, then a back protector, then a chest protector or roost deflector sized to your riding intensity, then a neck brace if you're riding hard or racing.`,
    faq: [
      {
        question: 'Do I need a chest protector for trail riding?',
        answer: "For low-intensity solo trail riding, a roost deflector may be enough. If you ride a busy track, ride hard, or race, a certified chest protector with impact absorption is the sensible choice.",
      },
      {
        question: "What's the difference between CE Level 1 and Level 2 body armour?",
        answer: 'CE Level 1 meets a baseline impact standard; CE Level 2 absorbs significantly more energy and is recommended for higher-speed or racing use. Every armour product in our range lists its CE rating.',
      },
      {
        question: 'Is a back protector or chest protector more important?',
        answer: 'Many riders consider a back protector the most important armour piece after a helmet, since it protects the spine. Some chest protectors include integrated back protection, covering both in one item.',
      },
    ],
  },
  {
    slug: 'alpinestars-gear-guide',
    title: 'Alpinestars Gear Guide: Boots, Helmets & Armour We Stock',
    excerpt: 'A rundown of the genuine Alpinestars riding gear in our range — what each piece is built for and who it suits.',
    category: 'Gear & Accessories',
    date: '2026-09-18',
    readTime: '4 min read',
    image: '/images/products/alpinestars-supertech-sm5-compass-helmet.webp',
    content: `Alpinestars is one of the most established names in motocross protective gear, and we stock a focused selection of their boots, helmet and body armour. Here's what's in our range and what each piece is built for.

### Alpinestars Tech 7 Enduro Boots
The [Alpinestars Tech 7 Enduro Boots](/shop/boots/alpinestars-tech-7-enduro-boots/) are a full-leather, high-protection boot built for serious enduro and trail riding — stiff for impact protection, with a biomechanical ankle pivot that still allows the flex you need for foot control. A longer break-in than synthetic boots, but built to last (see our [leather vs synthetic comparison](/blog/leather-vs-synthetic-motocross-boots/)).

### Alpinestars Tech 3S Youth Motocross Boots
The [Alpinestars Tech 3S Youth Motocross Boots](/shop/boots/alpinestars-tech-3s-youth-motocross-boots/) bring the same protective design philosophy to a youth-specific fit and sizing — proper motocross boot protection for young riders, not a cut-down adult boot.

### Alpinestars Supertech SM5 Compass Helmet
The [Alpinestars Supertech SM5 Compass Helmet](/shop/helmets/alpinestars-supertech-sm5-compass-helmet/) is a full-face motocross helmet with a composite shell and rotational-impact management, certified for off-road use. See our [dirt bike helmet guide](/shop/helmets/) for how to check fit.

### Alpinestars Bionic Action V2 Protection Jacket
The [Alpinestars Bionic Action V2 Protection Jacket](/shop/body-armour/alpinestars-bionic-action-v2-protection-jacket/) is a full upper-body armour layer — chest, back, shoulders and elbows — worn under a jersey. A good all-in-one option if you want coverage beyond a simple roost deflector; see our [body armour guide](/blog/motocross-body-armour-guide/) for how it compares to other protection levels.

### Shopping the Range
These pieces sit across our [Boots](/shop/boots/), [Helmets](/shop/helmets/) and [Body Armour](/shop/body-armour/) categories rather than a single brand page — each product listing has full sizing and specification detail.`,
    faq: [
      {
        question: 'Does Australian Electric Motor Co stock genuine Alpinestars gear?',
        answer: 'Yes — we stock a focused selection of genuine Alpinestars boots, helmet and body armour, listed across our Boots, Helmets and Body Armour categories.',
      },
      {
        question: 'Are Alpinestars Tech 7 boots good for beginners?',
        answer: "They're a high-protection, full-leather boot suited to serious enduro and trail riding. Beginners will get a longer break-in period than with a synthetic boot, but the protection and durability are well regarded.",
      },
    ],
  },
  {
    slug: 'charging-electric-dirt-bike-at-home',
    title: 'Charging an Electric Dirt Bike at Home: Time, Cost & Setup',
    excerpt: 'What home charging actually involves — how long it takes, what it costs in electricity, and the simple setup that works for most riders.',
    category: 'Battery & Power',
    date: '2026-09-21',
    readTime: '4 min read',
    image: '/images/products/stark-varg-stand-integrated-fast-charger-3-3kw.webp',
    content: `Charging an electric dirt bike at home is genuinely simple: plug the supplied charger into any standard Australian power point, connect it to the bike or battery, and leave it. There's no special wiring, no wall unit to install, and no adapter needed.

### How Long It Takes
Charge time depends on your battery's capacity and your charger's output. As a rough guide, a full-size battery on the supplied fast charger typically reaches 80% in around 90 minutes and 100% in 2.5-3 hours. Junior and balance bike packs charge faster; very high-capacity packs take longer. Our [chargers explained guide](/blog/ebike-dirt-bike-chargers-explained/) covers the maths.

### What It Costs
A full charge uses roughly 1-5 kWh of electricity depending on battery size, which at typical Australian residential electricity rates works out to well under a few dollars per full charge — a fraction of the fuel cost of running a comparable petrol dirt bike.

### The Standard Home Setup
For most riders, the setup is just: the supplied charger, a standard power point in the garage or shed, and a spot to park the bike while it charges. Charge in shade rather than direct sun, and give a hot pack 15-20 minutes to cool after a ride before plugging in.

### Charging Away From a Power Point
If you don't have easy mains access, or you want to charge at a campsite or trailhead, see [How to Charge Electric Dirt Bikes in Remote Outback Campsites](/blog/charging-electric-dirt-bikes-off-grid/) for solar and 4WD inverter setups.

### Spare Batteries for Zero Downtime
If you regularly ride longer than one charge allows, a spare battery from our [High-Capacity Batteries](/shop/high-capacity-batteries/) range lets you swap and keep riding while the first pack charges.`,
    faq: [
      {
        question: 'How long does it take to charge an electric dirt bike at home?',
        answer: 'On the supplied fast charger, a full-size battery typically reaches 80% in around 90 minutes and full charge in 2.5-3 hours. Smaller junior and balance bike packs charge faster.',
      },
      {
        question: 'How much does it cost to charge an electric dirt bike?',
        answer: 'A full charge uses roughly 1-5 kWh depending on battery size, costing well under a few dollars at typical Australian residential electricity rates — far less than fuelling a comparable petrol bike.',
      },
      {
        question: 'Do I need special wiring to charge an electric dirt bike at home?',
        answer: 'No — the supplied charger plugs straight into any standard Australian power point. There is no wall unit to install and no adapter required.',
      },
    ],
  },
  {
    slug: 'what-is-a-supermoto-electric',
    title: 'What Is a Supermoto? Electric Supermoto Explained',
    excerpt: 'How a supermoto differs from a motocross or enduro bike, and what an electric supermoto brings to the format.',
    category: 'E-Moto Performance',
    date: '2026-09-23',
    readTime: '4 min read',
    image: '/images/home/cat-adr-road-legal-dirt-bikes.webp',
    content: `A supermoto is a dirt bike set up for tarmac — a motocross or enduro-style chassis fitted with smaller-diameter road wheels, sticky street tyres and often uprated brakes. The result is a light, upright, flickable bike built for aggressive riding on sealed roads, kart tracks and mixed surfaces.

### Supermoto vs Motocross vs Enduro
Motocross bikes run large-diameter knobby tyres for dirt tracks. Enduro bikes are set up for long-distance off-road terrain. A supermoto takes that same lightweight, upright platform and swaps to 17-inch road wheels and slick or semi-slick tyres, trading off-road ability for genuine on-road agility and braking.

### What an Electric Supermoto Adds
An electric supermoto pairs the format with instant, controllable torque and near-silent operation — well suited to the tight, technical, stop-start nature of supermoto riding where throttle precision matters more than outright top-end. The [Stark VARG SM Supermoto](/shop/adr-road-legal-dirt-bikes/stark-varg-sm-supermoto/) in our range is an example, built as a road-legal model.

### Road-Legal Considerations
Because supermotos are ridden on sealed roads, a supermoto you intend to ride legally on the street needs to be a road-registerable model — see our [ADR Road-Legal Dirt Bikes](/shop/adr-road-legal-dirt-bikes/) range and our [Australian buyer's guide](/blog/electric-dirt-bikes-australia-buyers-guide/) for what registration involves.

### Who Supermoto Suits
Riders who want dirt-bike agility and an upright riding position but do most of their riding on sealed surfaces — commuting, canyon roads, kart tracks — rather than trails or motocross tracks.`,
    faq: [
      {
        question: 'What is the difference between a supermoto and a motocross bike?',
        answer: 'A supermoto uses the same lightweight, upright chassis as a motocross bike but fits smaller road wheels and street tyres, trading off-road ability for on-road agility and braking on sealed surfaces.',
      },
      {
        question: 'Is an electric supermoto road-legal?',
        answer: "Only if it is a road-registerable model built to meet Australian Design Rules. The Stark VARG SM Supermoto in our range is built as a road-legal model — check any supermoto's spec sheet and complete registration with your state authority.",
      },
    ],
  },
  {
    slug: 'riding-gear-checklist-new-owners',
    title: 'Complete Riding Gear Checklist for New Electric Dirt Bike Owners',
    excerpt: 'Exactly what protective gear to buy alongside your first electric dirt bike — the essentials, the strong recommendations, and the nice-to-haves.',
    category: 'Gear & Accessories',
    date: '2026-09-25',
    readTime: '5 min read',
    image: '/images/home/cat-kids-youth-electric-dirt-bikes.webp',
    content: `Buying your first electric dirt bike is the right time to sort protective gear, because riding without it — even at low speed on private land — is how minor offs become injuries. Here's a clear checklist, in priority order.

### Essential From Day One
- A properly fitted full-face motocross helmet, certified to ECE 22.06 or AS/NZS 1698 — see our [Full-Face MX & E-Moto Helmets](/shop/helmets/) range.
- Off-road goggles to protect your eyes from dust, branches and roost — browse [Gloves & Off-Road Goggles](/shop/gloves-goggles/).
- Motocross or enduro boots with ankle and shin protection — a sturdy closed shoe is not enough on a dirt bike. See our [boot buying guide](/blog/motocross-boot-buying-guide/) and the [Enduro & Motocross Boots](/shop/boots/) range.
- Off-road gloves for grip and hand protection.

### Strongly Recommended
- A back protector or a chest protector with integrated back protection — see our [body armour guide](/blog/motocross-body-armour-guide/).
- Knee guards or knee braces.
- A roost deflector if you'll be riding near other people.

### Worth Adding
- Elbow guards.
- A neck brace if you're riding harder or plan to race.
- A hydration pack for longer rides — see [Hydration Packs for Dirt Bike Riding](/blog/hydration-packs-dirt-bike-riding/).

### For Young Riders
Everything above applies, in youth-specific sizing — never an oversized adult helmet or armour "to grow into," since fit is what makes protective gear work. Our [Riding Gear & Protection](/shop/riding-gear/) range covers youth sizing across every category.

### Buying It With the Bike
Any gear item bought in the same cart as a bike gets an automatic 5% discount at checkout — a sensible time to kit out properly. Browse the full [Riding Gear & Protection](/shop/riding-gear/) range.`,
    faq: [
      {
        question: 'What protective gear do I need for an electric dirt bike?',
        answer: 'At minimum: a certified full-face motocross helmet, off-road goggles, motocross or enduro boots, and off-road gloves. Strongly recommended additions are a back or chest protector and knee protection.',
      },
      {
        question: 'Can I ride an electric dirt bike in normal shoes?',
        answer: 'No — a dirt bike needs boots with dedicated ankle and shin protection. A regular closed shoe offers no protection against the impacts, twists and burns a dirt bike can cause even at low speed.',
      },
      {
        question: 'Is there a discount on gear when I buy a bike?',
        answer: 'Yes — any gear, part or accessory item bought in the same cart as a bike gets an automatic 5% discount applied at checkout.',
      },
    ],
  },
  {
    slug: 'signs-dirt-bike-battery-needs-replacing',
    title: 'Signs Your Dirt Bike Battery Needs Replacing',
    excerpt: 'How to tell genuine battery capacity loss from normal range variation — and what to do when a pack is genuinely worn out.',
    category: 'Battery & Power',
    date: '2026-09-28',
    readTime: '4 min read',
    image: '/images/products/ewatt-81-4v-45ah-extreme-battery-talaria.webp',
    content: `Every lithium battery loses some capacity over its life — that's normal chemistry, not a defect. The question is knowing when reduced range is genuine wear-out rather than terrain, temperature, rider weight or riding style. Here's what to look for.

### Noticeably Shorter Range on the Same Ride
The clearest sign is a consistent, significant drop in range on a route you ride regularly, in similar conditions. Occasional shorter range on a hot day, into a headwind, or after a harder-than-usual session is normal. A permanent 20-30%+ reduction across many rides is not.

### Faster Voltage Drop Under Load
If the bike feels strong at full charge but power falls off much sooner than it used to — losing top-end or hill-climbing ability at what used to be a comfortable state of charge — the pack may be losing its ability to hold voltage under load.

### The Battery Won't Reach Full Charge
If the charger cycles to "complete" much faster than it used to, or the displayed charge level never reaches 100%, the usable capacity has dropped.

### Physical Warning Signs
Any visible swelling, damage, unusual heat during charging or discharging, or a burning smell means stop using the pack immediately and contact us — these are safety issues, not just capacity issues.

### What to Do
First, rule out the simple causes: check tyre pressures, confirm you're comparing like-for-like conditions, and try a full charge cycle. If range loss is genuine and permanent, browse our [High-Capacity Batteries](/shop/high-capacity-batteries/) range for a voltage-matched OEM replacement or a higher-capacity upgrade. Good charging habits (see [Lithium Battery Care](/blog/lithium-battery-care-dirt-bike/)) slow this process but don't stop it entirely.`,
    faq: [
      {
        question: 'How do I know if my electric dirt bike battery is worn out?',
        answer: 'The clearest sign is a consistent, significant drop in range (20-30% or more) on a route you ride regularly in similar conditions, along with power falling off sooner under load. Occasional shorter range in heat or headwind is normal.',
      },
      {
        question: 'Is battery swelling dangerous?',
        answer: 'Yes — visible swelling, unusual heat during charging, or a burning smell are safety issues. Stop using the pack immediately and contact us rather than continuing to ride or charge it.',
      },
      {
        question: 'Can I replace just the battery instead of the whole bike?',
        answer: "Yes — our High-Capacity Batteries range carries voltage-matched OEM replacement packs and higher-capacity upgrades for most models, so a worn battery doesn't mean replacing the bike.",
      },
    ],
  },
  {
    slug: 'enduro-vs-motocross-which-to-buy',
    title: 'Enduro vs Motocross: Which Electric Dirt Bike Should You Buy?',
    excerpt: 'The real differences in setup, riding position, suspension and range — and how to pick the category that matches where you actually ride.',
    category: 'Buying Guide',
    date: '2026-09-30',
    readTime: '5 min read',
    image: '/images/home/cat-trail-enduro.webp',
    content: `Choosing between an enduro-focused and a motocross-focused electric dirt bike comes down to one question: do you ride long, varied trails, or do you lap a track? Both bike types share a platform, but they're set up differently for those two very different jobs.

### Riding Position & Ergonomics
Enduro bikes favour a more upright, comfortable-for-hours riding position. Motocross bikes are set up for the aggressive, forward, attack position you hold for a short, intense moto. If your rides are measured in hours rather than minutes, enduro ergonomics matter.

### Suspension Setup
Motocross suspension is tuned firm for big jumps and hard landings on a groomed track. Enduro suspension is typically set softer and more compliant to absorb rocks, roots and ruts across unpredictable terrain at lower average speeds.

### Battery & Range
Because enduro riding covers more ground per session, battery capacity matters more — our [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/) models are built with range in mind, and a [high-capacity battery](/shop/high-capacity-batteries/) is worth considering for long loops. Motocross sessions are short and intense, so raw range is less of a constraint than sustained power delivery on our [Full-Size Motocross](/shop/full-size-motocross/) range.

### Which Should You Buy?
Ride mostly trails, bush, fire roads or point-to-point? Start with [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/). Ride mostly at a motocross track with jumps and berms? Look at [Full-Size Motocross](/shop/full-size-motocross/). Not sure, or ride a bit of both? An enduro/trail bike is generally the more versatile all-rounder and the safer default. See also [What Is an Enduro Motorbike?](/blog/what-is-an-enduro-motorbike/)

Compare specific models side by side with our [Compare tool](/compare/).`,
    faq: [
      {
        question: 'Should a beginner buy an enduro or motocross electric dirt bike?',
        answer: "An enduro or trail-focused bike is generally the better beginner choice — more comfortable ergonomics, more compliant suspension, and a more versatile all-rounder than a track-focused motocross machine.",
      },
      {
        question: 'Can you ride an enduro bike on a motocross track?',
        answer: "Yes, though its softer suspension setup won't handle big jumps and hard landings as well as a dedicated motocross bike. For occasional track use it's fine; for regular jumping, a motocross setup is better suited.",
      },
      {
        question: 'Which has better range, enduro or motocross?',
        answer: 'Enduro and trail models are generally built with more emphasis on battery capacity and range, since enduro riding covers more distance per session than short, intense motocross laps.',
      },
    ],
  },
  {
    slug: 'hydration-packs-dirt-bike-riding',
    title: 'Hydration Packs for Dirt Bike Riding: What to Look For',
    excerpt: 'Capacity, fit and protection features that matter in a dirt bike hydration pack, especially for hot Australian riding.',
    category: 'Gear & Accessories',
    date: '2026-10-02',
    readTime: '4 min read',
    image: '/images/products/leatt-gpx-5-5-composite-neck-brace.webp',
    content: `A hydration pack lets you drink on the move without stopping — genuinely important for longer rides in Australian heat, where dehydration creeps up faster than most riders expect and directly affects concentration and reaction time. Here's what actually matters when choosing one.

### Water Capacity
Most dirt bike hydration packs carry 1.5-3 litres. For rides under an hour in mild conditions, 1.5-2L is plenty. For long summer rides, remote riding, or if you sweat heavily, 3L is worth the extra bulk. Our [Hydration Pack (2L)](/shop/body-armour/hydration-pack-2l/) covers most typical ride lengths.

### Fit & Stability
A hydration pack needs to sit close and stable on your back so it doesn't shift under braking, over jumps or in ruts. Look for a proper chest and (ideally) waist strap, not just shoulder straps. It should be snug enough that you forget it's there.

### Back Protection
Some hydration packs include an integrated back protector or armour pocket — a useful two-in-one if you're not already wearing separate back protection. See our [body armour guide](/blog/motocross-body-armour-guide/) for how back protection fits into your overall setup.

### Storage
A small amount of storage for a phone, basic tools, a tube and tyre levers is useful on longer or remote rides — enough to handle a trailside puncture without carrying a separate pack.

### Hose & Bite Valve
A hose routed over your preferred shoulder with a bite valve you can operate one-handed and hands-free is the point of the whole thing — check the hose is long enough to reach your mouth comfortably in a riding position.

Browse the [Body Armour & Chest Protectors](/shop/body-armour/) range where our hydration and protection gear sits together.`,
    faq: [
      {
        question: 'What size hydration pack do I need for dirt bike riding?',
        answer: '1.5-2 litres suits most rides under an hour in mild conditions; 3 litres is worth the extra bulk for long summer rides, remote riding, or if you sweat heavily.',
      },
      {
        question: 'Should a dirt bike hydration pack have a back protector?',
        answer: "It's a useful feature if you're not already wearing separate back protection — some packs include an integrated protector or armour pocket, giving you hydration and impact protection in one item.",
      },
    ],
  },
  {
    slug: 'enduro-bikes-hill-climbing',
    title: 'Are Enduro Bikes Good for Hill Climbing?',
    excerpt: 'Why electric enduro bikes are genuinely well suited to steep, technical climbs — torque, traction and weight explained.',
    category: 'E-Moto Performance',
    date: '2026-10-05',
    readTime: '4 min read',
    image: '/images/home/cat-trail-enduro.webp',
    content: `Electric enduro bikes are genuinely well suited to hill climbing — arguably better than petrol equivalents for technical, low-speed ascents. The reasons come down to how an electric drivetrain delivers power and how these bikes are set up.

### Instant Torque Without Stalling
A petrol dirt bike makes its torque higher in the rev range, so a steep, slow, technical climb means constant clutch feathering to avoid stalling. An electric enduro bike delivers full torque from zero rpm with no clutch and no stall point — you can crawl up a rocky pinch at walking pace with total throttle control, then power over the crest without a gear change. This is where electric drivetrains genuinely shine.

### Traction and Throttle Control
Smooth, predictable power delivery makes it easier to keep the rear tyre hooked up on a loose or slippery climb. Many electric enduro bikes also have selectable power modes — a softer map gives you fine control on a technical ascent, a stronger map gives you the punch for a fast, run-up-style hill. Our [Trail & Mid-Weight Enduro](/shop/trail-mid-weight-enduro/) range includes models with this feature.

### Weight
Electric enduro bikes are typically lighter than comparable petrol machines, which helps on a climb where you're managing the bike's momentum and picking a line at low speed. Check individual spec sheets for exact weights.

### The Range Consideration
Sustained hill climbing is demanding on the battery — lots of high-torque, low-speed work draws more energy than cruising. If your riding involves serious elevation, factor that into range expectations, and consider a [high-capacity battery](/shop/high-capacity-batteries/) for longer days in the hills.

### The Verdict
For technical, low-speed climbing, an electric enduro bike's instant torque and clutchless control are a real advantage. See [What Is an Enduro Motorbike?](/blog/what-is-an-enduro-motorbike/) and [Enduro vs Motocross](/blog/enduro-vs-motocross-which-to-buy/) for more on the format.`,
    faq: [
      {
        question: 'Are electric enduro bikes good for steep hill climbs?',
        answer: 'Yes — arguably better than petrol for technical, low-speed climbs. Full torque from zero rpm with no clutch means no stall point, so you can crawl up a rocky pinch with total throttle control.',
      },
      {
        question: 'Does hill climbing drain an electric dirt bike battery faster?',
        answer: 'Yes — sustained high-torque, low-speed climbing draws more energy than cruising, so expect shorter range on rides with significant elevation. A high-capacity battery upgrade helps for long days in the hills.',
      },
      {
        question: 'Do electric enduro bikes have different power modes for climbing?',
        answer: "Many do — a softer power map gives fine throttle control for technical ascents, while a stronger map provides the punch for a fast run-up. Check each model's spec sheet for selectable modes.",
      },
    ],
  },
];

export const PAGES = {
  about: true,
  brands: true,
  faq: true,
  blog: true,
  wholesale: false,
  tracking: false,
  compare: true,
  finance: true,
  search: true,
};

// Homepage FAQ — sourced from docs/faq-bank.md (keyword-engine pass, Sept
// 2026), ranked by combined real search volume from the homepage-matched
// question keywords. Q1 and Q4 are flagged speakable (see FAQ_SPEAKABLE_IDX
// below) — the two most likely to be read aloud by a voice assistant or AI
// answer engine (definitional + compliance questions).
export const FAQ = [
  {
    question: 'What is an electric dirt bike?',
    answer: 'An electric dirt bike is an off-road motorcycle powered by a battery and electric motor instead of a petrol engine — same riding position and suspension as a traditional dirt bike, but silent, instant-torque power delivery with no exhaust, clutch (on most models), or fuel to carry.',
  },
  {
    question: 'How much does an electric dirt bike cost in Australia?',
    answer: 'Our range spans from junior and balance bikes through to full-size adult motocross machines, with pricing reflecting battery size, power output and brand. Browse the shop to filter by category and price, or pay with crypto (BTC/USDT) for an instant 10% discount.',
  },
  {
    question: 'What is the fastest electric dirt bike you sell?',
    answer: 'Top speed varies by model and power mode — our highest-output full-size motocross bikes are built for serious trail and track performance. Check each product’s spec sheet in the Full-Size Motocross range for exact top speed, as it differs between brands and battery configurations.',
  },
  {
    question: 'Are electric dirt bikes street legal in Australia?',
    answer: 'Only models built and equipped for road registration — with headlights, indicators, mirrors and a compliant VIN — can be road-registered, and requirements vary by state. Browse our ADR Road-Legal range for models built for street use.',
  },
  {
    question: 'Do electric dirt bikes need to be registered?',
    answer: 'Off-road-only electric dirt bikes (the majority of our range) don’t need registration when ridden on private property or designated trail networks, the same as a petrol dirt bike. Only models intended for public roads need ADR registration.',
  },
  {
    question: 'What’s the cheapest electric dirt bike in your range?',
    answer: 'Our balance and junior/youth models are the most accessible entry point into electric off-road riding — browse Balance & Mini Bikes and Junior Trials & Youth Dirt Bikes for the current lineup and pricing.',
  },
  {
    question: 'What payment options do you offer?',
    answer: 'Direct Bank Transfer, PayID, Pay in 4 (four fortnightly instalments, 0% interest), and a 10% instant discount for paying in crypto (BTC/USDT).',
  },
  {
    question: 'Do parts and accessories come with any discount when I buy a bike?',
    answer: 'Yes — any part, battery, charger, gear or accessory item gets an automatic 5% discount when a bike is in the same cart, applied at checkout.',
  },
];

// Indexes into FAQ (0-based) flagged for schema.org `speakable` — see
// lib/faq.ts's buildFaqSchema(). Keep this to 1-2 entries; speakable is for
// the single best answer on a page, not every answer.
export const FAQ_SPEAKABLE_IDX = [0, 3];

// Full themed FAQ bank for /faq/ — sourced from docs/faq-bank.md, grouped by
// theme (Batch 3). Every question here is a real question extracted from the
// keyword exports; every answer is limited to facts verifiable in this file
// / CLAUDE.md, per the standing "never fabricate brand facts" rule — e.g. the
// Talaria/Stark VARG pricing and battery questions deliberately point to the
// live product pages rather than quoting a number that would go stale.
export const FAQ_FULL_BANK = [
  {
    theme: 'Buying & Pricing',
    items: [
      {
        question: "What's the best electric dirt bike for a beginner?",
        answer: "It depends on the rider's age and experience — our Balance & Mini Bikes and Junior Trials & Youth models are built for young or first-time riders, while Adult Electric Dirt Bikes range from mellow trail machines to full-power motocross. Use our Compare tool to line up specs side by side and find the right starting point.",
      },
      {
        question: 'What is the best budget electric dirt bike?',
        answer: 'Pricing varies by battery size, power output and category rather than by a single "budget" tier — sort any shop category by price (low to high) to see the most accessible models first, starting with Balance & Mini Bikes and Junior Trials & Youth Dirt Bikes.',
      },
      {
        question: 'How much are electric motocross bikes?',
        answer: 'Full-size electric motocross pricing reflects battery capacity and peak power output — browse Full-Size Motocross to compare current models and pricing across brands.',
      },
      {
        question: 'What electric dirt bike has the longest range?',
        answer: "Range depends on battery capacity (kWh), rider weight and terrain — check each model's spec sheet for its rated range, or browse High-Capacity Batteries if you're looking to extend an existing bike's range with an upgrade pack.",
      },
      {
        question: 'What is the best electric dirt bike for adults?',
        answer: 'Our Adult Electric Dirt Bikes range spans full-size motocross through mid-weight enduro, all built for adult riders — the "best" one depends on your riding style and terrain, so compare models by power output and category before deciding.',
      },
    ],
  },
  {
    theme: 'Registration & Legal',
    items: [
      {
        question: 'Can you register an electric dirt bike in Australia?',
        answer: 'Yes, if it’s one of our ADR-compliant Road-Legal models, fitted with headlights, indicators, mirrors and a compliant VIN. Registration requirements and process still vary by state — see our Australian electric dirt bike laws guide for the state-by-state detail.',
      },
      {
        question: 'Are dirt bike helmets road-legal in Australia?',
        answer: "It's the helmet's own certification that matters, not the bike — a helmet needs to meet ECE 22.06 or Australian AS/NZS 1698 to be considered compliant for off-road use, and every helmet we stock states its certification on its product page.",
      },
    ],
  },
  {
    theme: 'Kids, Youth & Balance Bikes',
    items: [
      {
        question: 'What age is a balance bike suitable for?',
        answer: 'Most kids can start on a balance bike from around 2 years old, depending on height and confidence — browse Balance & Mini Bikes and use the size guide on each product page to match a model to your child.',
      },
      {
        question: 'Are electric balance bikes good for 2-3 year olds?',
        answer: "Yes, with the right size — our smallest balance and mini bike models are built for exactly this age group, with governed speed and a low seat height. Check each product's recommended age/height range before buying.",
      },
      {
        question: 'Do electric balance bikes have pedals?',
        answer: "No — that's the point. A balance bike lets a child build balance and coordination on two wheels before they ever need to worry about pedalling, which is why coaches often recommend them over training wheels.",
      },
      {
        question: 'Is an electric balance bike worth it, or is it better to start with training wheels?',
        answer: 'Balance bikes teach genuine balance and steering skill directly, rather than propping a child up on training wheels and delaying that skill — most riding schools and coaches now recommend balance bikes as the better starting point for young riders.',
      },
      {
        question: "What should I look for in a kids' electric balance bike?",
        answer: 'Seat height adjustability (so it grows with your child), overall weight (lighter is easier for a small rider to control), and whether it has a brake — check the spec sheet on each Balance & Mini Bikes listing for these details.',
      },
    ],
  },
  {
    theme: 'Brand-Specific',
    items: [
      {
        question: 'Is KTM an Austrian brand?',
        answer: 'Yes — KTM is headquartered in Mattighofen, Austria, with a long motocross racing heritage that carries through to their electric junior race bikes.',
      },
      {
        question: 'Is KTM the best dirt bike brand?',
        answer: '"Best" depends on your priorities — riding style, budget and rider age all matter more than brand alone. Use our Compare tool to line up KTM against our other brands on the specs that matter to you.',
      },
      {
        question: 'Is a Sur-Ron an electric dirt bike?',
        answer: 'Yes — every Surron model we stock, including the Light Bee X, Ultra Bee and Storm Bee, is fully electric.',
      },
      {
        question: 'How much is a Talaria electric dirt bike?',
        answer: 'Pricing varies by model and changes with our current lineup — see the Talaria brand page for up-to-date pricing on the Sting R MX4, Sting Pro MX5 and X3 (XXX).',
      },
      {
        question: 'How long does a Stark VARG battery last?',
        answer: 'Battery capacity (and therefore range) differs across the Stark VARG lineup — MX, Alpha MX, MX 1.2, EX Enduro and SM Supermoto each carry a different pack. Check the individual product’s spec sheet for its exact battery capacity and rated range.',
      },
      {
        question: 'Does the Stark VARG have a clutch?',
        answer: 'No — like all our electric dirt bikes, the Stark VARG is direct-drive with no traditional clutch to operate or maintain.',
      },
    ],
  },
  {
    theme: 'Riding Gear & Safety',
    items: [
      {
        question: 'What is a balaclava used for on a dirt bike?',
        answer: "A riding balaclava goes on under your helmet to manage sweat, dust and sun exposure, and to keep the helmet's inner lining cleaner between washes. We stock a Neck Gaiter / Balaclava in Body Armour & Chest Protectors.",
      },
      {
        question: 'Are dirt bike helmets the same as street motorcycle helmets?',
        answer: 'No — off-road helmets are certified to ECE 22.06 or Australian AS/NZS 1698, built with an extended chin bar and peak for motocross-style riding, while street helmets are ADR-certified for road use. Every helmet we stock states its certification on the product page.',
      },
    ],
  },
];

// Per-category and per-brand FAQ blocks (Batch 3) — each entry is a small
// subset of FAQ_FULL_BANK's real, keyword-extracted questions relevant to
// that specific page, not a duplicate of the whole bank. Only categories/
// brands with genuine question-intent keyword data get an entry; others
// fall through to no FAQ block on that page (a template with no real
// questions to answer isn't better than no FAQ section at all).
export const CATEGORY_FAQ = {
  'balance-mini-bikes': [
    FAQ_FULL_BANK[2].items[0], // age suitability
    FAQ_FULL_BANK[2].items[1], // 2-3 year olds
    FAQ_FULL_BANK[2].items[2], // pedals
    FAQ_FULL_BANK[2].items[3], // worth it vs training wheels
    FAQ_FULL_BANK[2].items[4], // what to look for
  ],
  'adult-electric-dirt-bikes': [FAQ_FULL_BANK[0].items[4]], // best for adults
  'full-size-motocross': [FAQ_FULL_BANK[0].items[2]], // how much are motocross bikes
  'adr-road-legal-dirt-bikes': [FAQ_FULL_BANK[1].items[0]], // can you register
  'high-capacity-batteries': [FAQ_FULL_BANK[0].items[3]], // longest range
  helmets: [FAQ_FULL_BANK[1].items[1], FAQ_FULL_BANK[4].items[1]], // helmet road-legal + helmet vs street
  'body-armour': [FAQ_FULL_BANK[4].items[0]], // balaclava
};

// Batch 7 internal-linking pass: category/brand slug -> blog post slugs.
// Gives the reverse-direction links (shop page -> guide) the blog posts
// already point the other way. Slugs are validated at build by
// scripts/crosscheck.mjs (check 12).
export const CATEGORY_GUIDES = {
  'electric-dirt-bikes': ['electric-dirt-bike-cost-australia', 'electric-dirt-bikes-australia-buyers-guide', 'off-road-electric-bikes-explained'],
  'adult-electric-dirt-bikes': ['first-electric-off-road-bike-guide', 'electric-dirt-bike-cost-australia'],
  'full-size-motocross': ['electric-motocross-vs-petrol-comparison', 'enduro-vs-motocross-which-to-buy'],
  'trail-mid-weight-enduro': ['what-is-an-enduro-motorbike', 'enduro-vs-motocross-which-to-buy', 'enduro-bikes-hill-climbing'],
  'kids-youth-electric-dirt-bikes': ['electric-kids-motorbikes-age-size-guide'],
  'junior-trials-youth-dirt-bikes': ['electric-kids-motorbikes-age-size-guide'],
  'balance-mini-bikes': ['electric-kids-motorbikes-age-size-guide', 'first-electric-off-road-bike-guide'],
  'adr-road-legal-dirt-bikes': ['electric-dirt-bikes-australia-buyers-guide', 'australian-electric-dirt-bike-laws-guide', 'what-is-a-supermoto-electric'],
  'utility-farm-e-bikes': ['first-electric-off-road-bike-guide'],
  'batteries-chargers': ['motorcycle-ebike-battery-guide', 'electric-dirt-bike-voltage-explained'],
  'high-capacity-batteries': ['motorcycle-ebike-battery-guide', 'lithium-battery-care-dirt-bike', 'signs-dirt-bike-battery-needs-replacing'],
  'fast-chargers': ['ebike-dirt-bike-chargers-explained', 'charging-electric-dirt-bike-at-home', 'trickle-chargers-electric-dirt-bikes'],
  'riding-gear': ['riding-gear-checklist-new-owners', 'motocross-body-armour-guide'],
  helmets: ['riding-gear-checklist-new-owners', 'motocross-body-armour-guide'],
  'body-armour': ['motocross-body-armour-guide', 'riding-gear-checklist-new-owners'],
  'body-armour-protection': ['motocross-body-armour-guide'],
  boots: ['motocross-boot-buying-guide', 'leather-vs-synthetic-motocross-boots'],
  'gloves-goggles': ['riding-gear-checklist-new-owners'],
  'storage-transport': ['dirt-bike-racks-tow-bar-carriers'],
  'bike-stands-tools': ['dirt-bike-lift-table-workshop-setup'],
};

export const BRAND_GUIDES = {
  'stark-future': ['what-is-a-supermoto-electric', 'electric-motocross-vs-petrol-comparison'],
  alpinestars: ['alpinestars-gear-guide', 'motocross-boot-buying-guide'],
  'fox-racing': ['riding-gear-checklist-new-owners'],
  surron: ['off-road-electric-bikes-explained'],
  talaria: ['enduro-vs-motocross-which-to-buy'],
};

export const BRAND_FAQ = {
  ktm: [FAQ_FULL_BANK[3].items[0], FAQ_FULL_BANK[3].items[1]], // Austrian + best-brand
  surron: [FAQ_FULL_BANK[3].items[2]], // is Sur-Ron electric
  talaria: [FAQ_FULL_BANK[3].items[3]], // Talaria pricing
  'stark-future': [FAQ_FULL_BANK[3].items[4], FAQ_FULL_BANK[3].items[5]], // battery + clutch
  alpinestars: [
    {
      question: 'Does Australian Electric Motor Co stock genuine Alpinestars gear?',
      answer: 'Yes — we stock a focused selection of genuine Alpinestars boots, helmet and body armour, all listed on this page with full sizing and specification detail.',
    },
    {
      question: 'Are Alpinestars Tech 7 boots suitable for beginners?',
      answer: 'They are a high-protection, full-leather enduro boot, so beginners get a longer break-in period than with a synthetic boot — but the protection and durability are well regarded. See our motocross boot buying guide for fit advice.',
    },
  ],
  'fox-racing': [
    {
      question: 'Does Australian Electric Motor Co stock genuine Fox Racing gear?',
      answer: 'Yes — our Fox Racing range covers adult and youth V1 helmets, the Youth Titan Sport roost deflector, Airline gloves and Comp youth boots, all listed here with full sizing detail.',
    },
  ],
};

export const TRUSTPILOT_DATA = {
  score: '4.9',
  ratingText: 'Excellent',
  totalReviews: '3,000+',
  totalReviewsCount: 3140,
  sourceBusiness: 'B&B Off Road Engineering',
  sourceDomain: 'bboffroad.com.au',
  fiveStarPercent: 96,
  verifiedPercent: 99,
  heritageNote: 'Verified customer feedback from our Australian off-road engineering heritage & manufacturing profile (bboffroad.com.au), backed by 3,000+ 5-star rider reviews.',
};

export const REVIEWS = [
  {
    id: 'rev-1',
    author: 'Matt Arnold',
    rating: 5,
    date: 'April 2026',
    verified: true,
    location: 'VIC, Australia',
    title: 'Fantastic build quality and precise fitment',
    body: 'Build quality is top tier—thick structural alloy plate, flawless TIG welds, and fitment was dead-on in 10 minutes. Delivered across Australia in two days. Absolutely brilliant engineering.',
    tag: 'Build & Durability',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-2',
    author: 'Robert Booth',
    rating: 5,
    date: 'December 2025',
    verified: true,
    location: 'NSW, Australia',
    title: 'Long-standing trust in Australian off-road engineering',
    body: 'I have trusted and used their gear for years across multiple off-road machines. The strength, reliability, and precision never waver. True Australian craftsmanship at its absolute finest.',
    tag: 'Long-term Rider',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-3',
    author: 'David Crombie',
    rating: 5,
    date: 'February 2026',
    verified: true,
    location: 'QLD, Australia',
    title: 'Unbeatable protection on harsh rocky trails',
    body: 'Took some massive hits over granite boulders on the weekend without even a dent. Bulletproof structural strength, clean lines, and super fast dispatch. 100% recommended.',
    tag: 'Trail Tested',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-4',
    author: 'Chris Walker',
    rating: 5,
    date: 'March 2026',
    verified: true,
    location: 'SA, Australia',
    title: 'Top notch customer service and speedy dispatch',
    body: 'Spoke with their technical support with a couple of questions. Honest, knowledgeable advice and the package arrived in 2 business days. Exceptional Australian customer service.',
    tag: 'Customer Support',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-5',
    author: 'Mark Stevenson',
    rating: 5,
    date: 'January 2026',
    verified: true,
    location: 'WA, Australia',
    title: 'Built like a tank – Aussie quality at its best',
    body: 'Heavy-duty structural alloy with clean chamfered edges. Everything bolted straight onto the chassis mounts with zero flexing. Gives complete confidence in remote bush terrain.',
    tag: 'Heavy Duty',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-6',
    author: 'Glenn Murphy',
    rating: 5,
    date: 'April 2026',
    verified: true,
    location: 'NSW, Australia',
    title: 'Super fast shipping and exact fitment',
    body: 'Instructions were clear, high-tensile hardware supplied, and the finish looks awesome. Really appreciate dealing with a genuine Australian team who understand real trail riding.',
    tag: 'Fast Delivery',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-7',
    author: 'Anthony Hayes',
    rating: 5,
    date: 'November 2025',
    verified: true,
    location: 'VIC, Australia',
    title: 'Best investment for extreme durability',
    body: 'Unmatched ruggedness. You can immediately tell this gear is engineered by people who ride hard on Australian tracks. Solid, durable, and rapid delivery.',
    tag: 'Build & Durability',
    badge: 'Verified Buyer',
  },
  {
    id: 'rev-8',
    author: 'Paul Henderson',
    rating: 5,
    date: 'May 2026',
    verified: true,
    location: 'QLD, Australia',
    title: 'Honest advice, fast delivery, and premium finish',
    body: 'The team went above and beyond when I needed expedited freight before a weekend ride. Everything arrived securely packaged with flawless finish. 10/10 experience.',
    tag: 'Customer Support',
    badge: 'Verified Buyer',
  },
];

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [],
  prohibitedClaims: [],
  ageGate: false,
  ageMinimum: null,
  gdpr: false,
  disclaimer: 'Australian Electric Motor Co (ABN: 97 628 671 689) supplies high-performance off-road competition and recreational electric dirt bikes. All prices include 10% Australian GST. Always wear approved motorcycle protective equipment. Off-road riding should be conducted on private property or sanctioned riding tracks in accordance with state laws.',
};
