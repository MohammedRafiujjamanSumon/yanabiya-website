// Asset URLs — pulled from the live yanabiyagroup.com site so the website
// works out of the box. To use your own copies, drop matching files into
// /public/images/ and replace the URLs below with BASE + 'images/<filename>'.

const BASE = import.meta.env.BASE_URL

export const assets = {
  // Logo & branding
  logo: `${BASE}images/logo.png`,
  brandMark: 'https://yanabiyagroup.com/img/yanabiya-group-1.png',

  // Hero / about background imagery (tech-globe + office)
  heroGlobe: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
  office: `${BASE}images/about-office.jpg`,
  resources: 'https://yanabiyagroup.com/img/Skilled-Resources.png',

  // Leadership
  chairman: `${BASE}images/chairman.jpg`,
  viceChairman: `${BASE}images/vice-chairman.jpg`,
  team: {
    saleheen: 'https://yanabiyagroup.com/img/slider/4.png',
    zakirul: 'https://yanabiyagroup.com/img/slider/7.png',
    rashedul: 'https://yanabiyagroup.com/img/slider/6.png',
    sahed: 'https://yanabiyagroup.com/img/slider/9.png',
    jurais: 'https://yanabiyagroup.com/img/slider/10.png',
    saralya: 'https://yanabiyagroup.com/img/slider/8.png',
    amanullah: 'https://yanabiyagroup.com/img/slider/3.png',
    towfiqul: 'https://yanabiyagroup.com/img/slider/2.png',
    sufean: 'https://yanabiyagroup.com/img/slider/12.png',
    elaiyaraja: 'https://yanabiyagroup.com/img/slider/13.png',
  },

  // Partner logo URLs (used directly from yanabiyagroup.com)
  partners: {
    aws: 'https://yanabiyagroup.com/img/par/aws.jpg',
    microsoft: 'https://yanabiyagroup.com/img/par/mslogo.jpg',
    oracle: 'https://yanabiyagroup.com/img/par/orcl.jpg',
    sap: 'https://yanabiyagroup.com/img/par/sap.jpg',
    adobe: 'https://yanabiyagroup.com/img/par/Adobe.jpg',
    dell: 'https://yanabiyagroup.com/img/par/dell.jpg',
    hp: 'https://yanabiyagroup.com/img/par/hp.jpg',
    huawei: 'https://yanabiyagroup.com/img/par/Hu.jpg',
    cisco: 'https://yanabiyagroup.com/img/par/cis.jpg',
    googleCloud: 'https://yanabiyagroup.com/img/par/gc.jpg',
  },
}
