import { SiteConfig } from '@/types/siteConfig';

export const siteConfig: SiteConfig = {
  name: 'Illumine 2026',
  shortName: 'Illumine',
  edition: 'Silver Jubilee (25 Years)',
  year: '2026',
  themeColor: '#7B61FF',
  socialLinks: {
    instagram: 'https://www.instagram.com/illumine_ju_it?igsh=MXczemN2azl0eTRpNQ==',
    facebook: 'https://www.facebook.com/share/g/1KdTjTvRDw/',
    mail: 'illumine.reunion.ju.it@gmail.com',
    linkedin: 'https://www.linkedin.com/in/ju-it',
  },
  contact: {
    address: 'Jadavpur University, Salt Lake Campus, Kolkata, West Bengal 700105, India',
    mapLink: 'https://maps.google.com/?q=Jadavpur+University+Salt+Lake+Campus',
    email: 'illumine.reunion.ju.it@gmail.com',
    phoneNumbers: [],
  },
  navigation: [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'EVENTS', href: '/events' },
    { label: 'MAGAZINE', href: '/magazine' },
    { label: 'ALUMNI', href: '/alumni' },
    { label: 'CONTACT US', href: '/contact-us' },
  ],
  footerLinks: [
    {
      title: 'Directory',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Events', href: '/events' },
        { label: 'Alumni', href: '/alumni' },
        { label: 'Magazine', href: '/magazine' },
      ],
    },
  ],
};
