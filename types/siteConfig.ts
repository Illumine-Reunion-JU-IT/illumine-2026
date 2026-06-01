export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  github?: string;
  mail?: string;
}

export interface ContactDetails {
  address: string;
  mapLink: string;
  email: string;
  phoneNumbers: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  edition: string;
  year: string;
  themeColor: string;
  socialLinks: SocialLinks;
  contact: ContactDetails;
  navigation: NavLink[];
  footerLinks: FooterLinkGroup[];
}
