import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventBySlug, getEvents } from '@/data/events';
import ArcReactor from '@/components/arc-reactor';
import BigCircle from '@/components/ui/BigCircle';
import BlueCircle from '@/components/ui/BlueCircle';
import Plus from '@/components/ui/Plus';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for Next.js build optimization
export async function generateStaticParams() {
  const allEvents = getEvents();
  return allEvents.map((event) => ({
    slug: event.slug,
  }));
}

// Dynamic SEO and Open Graph metadata generation
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Illumine 2026',
      description: 'The requested event could not be found.',
    };
  }

  const titleString = `${event.title} | Illumine 2026`;
  return {
    title: titleString,
    description: event.shortDescription,
    openGraph: {
      title: titleString,
      description: event.shortDescription,
      type: 'article',
      url: `https://illumine-reunion-ju-it.vercel.app/events/${event.slug}`,
      images: [
        {
          url: '/photos/Hero/logo.jpeg',
          width: 800,
          height: 800,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleString,
      description: event.shortDescription,
      images: ['/photos/Hero/logo.jpeg'],
    },
  };
}

export default async function EventDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Determine category color branding
  let accentColor = '#7B61FF'; // Default purple
  if (event.category === 'sports') accentColor = '#ffe94d';
  if (event.category === 'cultural') accentColor = '#ff4d6d';
  if (event.category === 'academic') accentColor = '#64ffda';

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-x-hidden font-tt-lakes">
      
      {/* ── BACKGROUND DECORATIONS ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(123,97,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,97,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute top-[35%] right-[-120px] opacity-35">
          <ArcReactor size={450} accentColor={event.category === 'other' ? 'purple' : event.category} className="opacity-45" />
        </div>

        <Plus className="top-[12%] left-[8%]" delay={0.1} />
        <Plus className="bottom-[18%] right-[10%]" delay={0.8} />
        <BigCircle className="left-[12%] top-[40%] scale-80 opacity-50" />
        <BlueCircle className="right-[15%] bottom-[12%] rotate-90 scale-110" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10 flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <Link href="/events" className="hover:text-[#7B61FF] transition-colors">
            EVENTS
          </Link>
          <span>/</span>
          <span className="text-white/60">{event.slug}</span>
        </div>

        {/* ── MAIN CONTENT CONTAINER ── */}
        <div 
          className="relative bg-[#0c0f1d]/90 border border-white/10 p-8 md:p-12 w-full flex flex-col gap-10"
          style={{
            clipPath: 'polygon(0% 0%, 94% 0%, 100% 6%, 100% 100%, 6% 100%, 0% 94%)',
          }}
        >
          {/* Top category label */}
          <div className="flex items-center gap-3">
            <span 
              className="text-xs font-extrabold tracking-[0.25em] uppercase px-3 py-1 font-mono"
              style={{
                border: `1px solid ${accentColor}`,
                color: accentColor,
                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
              }}
            >
              {event.category}
            </span>
            {event.featured && (
              <span className="text-[10px] font-bold tracking-[0.2em] bg-[#6265fe]/20 text-[#6265fe] border border-[#6265fe]/40 px-3 py-1 uppercase">
                FEATURED EVENT
              </span>
            )}
          </div>

          {/* Event Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-white font-tt-lakes mb-2">
              {event.title}
            </h1>
            {event.eventDate && (
              <p className="text-[#BEF3DF] text-xs sm:text-sm font-mono tracking-widest uppercase">
                SCHEDULED // {event.eventDate}
              </p>
            )}
          </div>

          {/* Details Divider */}
          <div className="w-full h-[1px] bg-white/10" />

          {/* Description */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#7B61FF] font-mono">
              {"// EVENT_DETAILS"}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify font-light">
              {event.description}
            </p>
          </div>

          {/* Rules (if present) */}
          {event.rules && event.rules.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#7B61FF] font-mono">
                {"// REGULATIONS_AND_RULES"}
              </h2>
              <ul className="list-none flex flex-col gap-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 font-light">
                    <span className="text-[#ffe94d] font-mono font-bold mt-0.5">[{idx + 1}]</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coordinators */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#7B61FF] font-mono">
              {"// CONTACT_COORDINATORS"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {event.coordinators.map((coordinator, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/5 font-mono text-xs sm:text-sm rounded-sm">
                  <p className="text-white font-bold">{coordinator.name}</p>
                  {coordinator.phone && <p className="text-gray-400 mt-1">Phone: {coordinator.phone}</p>}
                  {coordinator.email && <p className="text-gray-400">Email: {coordinator.email}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer (Register Button) */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
            <Link 
              href="/events"
              className="text-gray-400 hover:text-white text-xs font-extrabold tracking-widest uppercase transition-colors flex items-center gap-2 font-mono"
            >
              &lt;&lt; BACK TO EVENTS
            </Link>

            {/* {event.registrationLink ? (
              <a 
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-[#6265fe] hover:bg-[#7b7efe] text-white font-extrabold tracking-[0.2em] text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto text-center"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                }}
              >
                REGISTER_NOW &gt;&gt;
              </a>
            ) : (
              <span className="text-gray-500 font-mono text-xs tracking-widest uppercase">
                REGISTRATION CLOSED // WALK-IN ONLY
              </span>
            )} */}
          </div>

        </div>
      </div>
    </div>
  );
}
