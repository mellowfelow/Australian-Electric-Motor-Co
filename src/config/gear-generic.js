// src/config/gear-generic.js
// Generic (unbranded) riding-gear starter products. Prices are AUD estimates.

export const GENERIC_GEAR_PRODUCTS = [
  {
    slug: "full-face-mx-helmet-adult",
    name: "Full-Face MX Helmet — Adult",
    category: "helmets",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 249,
    featured: false,
    parentCategories: [
      "riding-gear",
      "helmets"
    ],
    shortDescription: "ECE 22.06 / AS-NZS 1698 approved full-face helmet with a polycarbonate shell, multi-port ventilation and a washable liner. A solid, certified value helmet for adult trail and MX riders.",
    description: "ECE 22.06 / AS-NZS 1698 approved full-face helmet with a polycarbonate shell, multi-port ventilation and a washable liner. A solid, certified value helmet for adult trail and MX riders.",
    images: [
      "/images/products/full-face-mx-helmet-adult.webp"
    ],
    isGear: true,
    riderCategory: "Adult",
    sizesAvailable: [
      "Adult S",
      "Adult M",
      "Adult L",
      "Adult XL",
      "Adult 2XL"
    ],
    specs: {
      Fitment: "Adult sizing",
      Warranty: "1-Year Australian Warranty"
    },
    certifications: [
      "ECE 22.06",
      "AS/NZS 1698"
    ],
    safetyStandard: "ECE 22.06",
    badge: "ECE 22.06"
  },
  {
    slug: "full-face-mx-helmet-youth",
    name: "Full-Face MX Helmet — Youth",
    category: "helmets",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 189,
    featured: false,
    parentCategories: [
      "riding-gear",
      "helmets"
    ],
    shortDescription: "Lightweight ECE 22.06 / AS-NZS 1698 approved youth full-face helmet sized for teenage riders, with a fixed peak, wide eye port for goggles and full ventilation.",
    description: "Lightweight ECE 22.06 / AS-NZS 1698 approved youth full-face helmet sized for teenage riders, with a fixed peak, wide eye port for goggles and full ventilation.",
    images: [
      "/images/products/full-face-mx-helmet-youth.webp"
    ],
    isGear: true,
    riderCategory: "Youth",
    sizesAvailable: [
      "Youth S",
      "Youth M",
      "Youth L"
    ],
    specs: {
      Fitment: "Youth sizing",
      Warranty: "1-Year Australian Warranty"
    },
    certifications: [
      "ECE 22.06",
      "AS/NZS 1698"
    ],
    safetyStandard: "ECE 22.06",
    badge: "ECE 22.06"
  },
  {
    slug: "full-face-mx-helmet-kids-mini",
    name: "Full-Face MX Helmet — Kids Mini",
    category: "helmets",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 149,
    featured: false,
    parentCategories: [
      "riding-gear",
      "helmets"
    ],
    shortDescription: "The smallest certified full-face helmet in the range, for young riders on balance and mini bikes. Extra-light EPS shell, soft chin bar padding and a breakaway peak.",
    description: "The smallest certified full-face helmet in the range, for young riders on balance and mini bikes. Extra-light EPS shell, soft chin bar padding and a breakaway peak.",
    images: [
      "/images/products/full-face-mx-helmet-kids-mini.webp"
    ],
    isGear: true,
    riderCategory: "Youth",
    sizesAvailable: [
      "Kids XS",
      "Kids S",
      "Kids M"
    ],
    specs: {
      Fitment: "Youth sizing",
      Warranty: "1-Year Australian Warranty"
    },
    certifications: [
      "ECE 22.06",
      "AS/NZS 1698"
    ],
    safetyStandard: "ECE 22.06",
    badge: "ECE 22.06"
  },
  {
    slug: "mx-gloves-adult",
    name: "MX Gloves — Adult",
    category: "gloves-goggles",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 39,
    featured: false,
    parentCategories: [
      "riding-gear",
      "gloves-goggles"
    ],
    shortDescription: "Single-layer palm off-road gloves with silicone brake and clutch grips, a stretch mesh upper and a low-profile TPR knuckle. All-day comfort for trail and track.",
    description: "Single-layer palm off-road gloves with silicone brake and clutch grips, a stretch mesh upper and a low-profile TPR knuckle. All-day comfort for trail and track.",
    images: [
      "/images/products/mx-gloves-adult.webp"
    ],
    isGear: true,
    riderCategory: "Adult",
    sizesAvailable: [
      "Adult S",
      "Adult M",
      "Adult L",
      "Adult XL"
    ],
    specs: {
      Fitment: "Adult sizing",
      Warranty: "1-Year Australian Warranty"
    }
  },
  {
    slug: "mx-gloves-youth-kids",
    name: "MX Gloves — Youth / Kids",
    category: "gloves-goggles",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 29,
    featured: false,
    parentCategories: [
      "riding-gear",
      "gloves-goggles"
    ],
    shortDescription: "Youth off-road gloves with a grippy printed palm, breathable mesh back and an easy pull-on cuff — sized for kids and teens on youth e-dirt bikes.",
    description: "Youth off-road gloves with a grippy printed palm, breathable mesh back and an easy pull-on cuff — sized for kids and teens on youth e-dirt bikes.",
    images: [
      "/images/products/mx-gloves-youth-kids.webp"
    ],
    isGear: true,
    riderCategory: "Youth",
    sizesAvailable: [
      "Kids S",
      "Kids M",
      "Kids L",
      "Youth S",
      "Youth M"
    ],
    specs: {
      Fitment: "Youth sizing",
      Warranty: "1-Year Australian Warranty"
    }
  },
  {
    slug: "off-road-goggles-adult",
    name: "Off-Road Goggles — Adult",
    category: "gloves-goggles",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 49,
    featured: false,
    parentCategories: [
      "riding-gear",
      "gloves-goggles"
    ],
    shortDescription: "Wide-vision anti-fog off-road goggles with a triple-layer face foam, tear-off posts and a 45mm silicone-lined strap. Fits over most prescription frames.",
    description: "Wide-vision anti-fog off-road goggles with a triple-layer face foam, tear-off posts and a 45mm silicone-lined strap. Fits over most prescription frames.",
    images: [
      "/images/products/off-road-goggles-adult.webp"
    ],
    isGear: true,
    riderCategory: "Adult",
    sizesAvailable: [
      "One Size"
    ],
    specs: {
      Fitment: "Adult sizing",
      Warranty: "1-Year Australian Warranty"
    }
  },
  {
    slug: "off-road-goggles-youth-kids",
    name: "Off-Road Goggles — Youth / Kids",
    category: "gloves-goggles",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 39,
    featured: false,
    parentCategories: [
      "riding-gear",
      "gloves-goggles"
    ],
    shortDescription: "Smaller-frame anti-fog goggles for youth riders, with a soft triple-density face foam and an adjustable strap to fit under a kids helmet. Dispatched Australia-wide from our Sydney depot.",
    description: "Smaller-frame anti-fog goggles for youth riders, with a soft triple-density face foam and an adjustable strap to fit under a kids helmet. Dispatched Australia-wide from our Sydney depot.",
    images: [
      "/images/products/off-road-goggles-youth-kids.webp"
    ],
    isGear: true,
    riderCategory: "Youth",
    sizesAvailable: [
      "One Size"
    ],
    specs: {
      Fitment: "Youth sizing",
      Warranty: "1-Year Australian Warranty"
    }
  },
  {
    slug: "off-road-boots-adult",
    name: "Off-Road Boots — Adult",
    category: "boots",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 279,
    featured: false,
    parentCategories: [
      "riding-gear",
      "boots"
    ],
    shortDescription: "Mid-level adult motocross boot with a four-buckle alloy closure, replaceable steel shank, TPU shin plate and a grippy dual-compound sole. CE certified.",
    description: "Mid-level adult motocross boot with a four-buckle alloy closure, replaceable steel shank, TPU shin plate and a grippy dual-compound sole. CE certified.",
    images: [
      "/images/products/off-road-boots-adult.webp"
    ],
    isGear: true,
    riderCategory: "Adult",
    sizesAvailable: [
      "Adult 8",
      "Adult 9",
      "Adult 10",
      "Adult 11",
      "Adult 12",
      "Adult 13"
    ],
    specs: {
      Fitment: "Adult sizing",
      Warranty: "1-Year Australian Warranty"
    },
    certifications: [
      "CE Level 1"
    ],
    safetyStandard: "CE Level 1",
    badge: "CE Level 1"
  },
  {
    slug: "off-road-boots-youth",
    name: "Off-Road Boots — Youth",
    category: "boots",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 199,
    featured: false,
    parentCategories: [
      "riding-gear",
      "boots"
    ],
    shortDescription: "Youth motocross boot with three buckles, a moulded shin guard and a rigid sole to protect growing feet on youth e-dirt bikes. CE certified. Stocked in Sydney, shipped Australia-wide.",
    description: "Youth motocross boot with three buckles, a moulded shin guard and a rigid sole to protect growing feet on youth e-dirt bikes. CE certified. Stocked in Sydney, shipped Australia-wide.",
    images: [
      "/images/products/off-road-boots-youth.webp"
    ],
    isGear: true,
    riderCategory: "Youth",
    sizesAvailable: [
      "Youth 1",
      "Youth 2",
      "Youth 3",
      "Youth 4",
      "Youth 5",
      "Youth 6"
    ],
    specs: {
      Fitment: "Youth sizing",
      Warranty: "1-Year Australian Warranty"
    },
    certifications: [
      "CE Level 1"
    ],
    safetyStandard: "CE Level 1",
    badge: "CE Level 1"
  },
  {
    slug: "mx-jersey-and-pants-combo-adult",
    name: "MX Jersey & Pants Combo — Adult",
    category: "body-armour-protection",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 149,
    featured: false,
    parentCategories: [
      "riding-gear",
      "body-armour-protection"
    ],
    shortDescription: "Matched adult jersey and pant set — vented moisture-wicking jersey plus ripstop pants with leather inner-knee panels and a ratchet waist. Wears over knee braces.",
    description: "Matched adult jersey and pant set — vented moisture-wicking jersey plus ripstop pants with leather inner-knee panels and a ratchet waist. Wears over knee braces.",
    images: [
      "/images/products/mx-jersey-and-pants-combo-adult.webp"
    ],
    isGear: true,
    riderCategory: "Adult",
    sizesAvailable: [
      "Adult S",
      "Adult M",
      "Adult L",
      "Adult XL",
      "Adult 2XL"
    ],
    specs: {
      Fitment: "Adult sizing",
      Warranty: "1-Year Australian Warranty"
    }
  },
  {
    slug: "mx-jersey-and-pants-combo-youth-kids",
    name: "MX Jersey & Pants Combo — Youth / Kids",
    category: "body-armour-protection",
    brand: "aemc-rider",
    brandName: "AEMC Rider",
    price: 119,
    featured: false,
    parentCategories: [
      "riding-gear",
      "body-armour-protection"
    ],
    shortDescription: "Youth jersey and pant set in lightweight vented fabric with stretch panels and an adjustable waist — sized for kids and teens. Backed by our 1-Year Australian Warranty.",
    description: "Youth jersey and pant set in lightweight vented fabric with stretch panels and an adjustable waist — sized for kids and teens. Backed by our 1-Year Australian Warranty.",
    images: [
      "/images/products/mx-jersey-and-pants-combo-youth-kids.webp"
    ],
    isGear: true,
    riderCategory: "Youth",
    sizesAvailable: [
      "Kids S",
      "Kids M",
      "Kids L",
      "Youth S",
      "Youth M"
    ],
    specs: {
      Fitment: "Youth sizing",
      Warranty: "1-Year Australian Warranty"
    }
  }
];
