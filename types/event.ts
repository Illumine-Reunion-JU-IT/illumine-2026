export type EventCategory = 'sports' | 'cultural' | 'academic' | 'other';

export interface EventCoordinator {
  name: string;
  phone?: string;
  email?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  shortDescription: string;
  description: string;
  image: string;
  rules?: string[];
  coordinators: EventCoordinator[];
  registrationLink?: string;
  featured: boolean;
  eventDate?: string;
}
