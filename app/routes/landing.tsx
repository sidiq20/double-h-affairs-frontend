import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faRing, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faClock,
  faUsers,
  faChurch,
  faGift,
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faMusic
} from '@fortawesome/free-solid-svg-icons';
import type { Route } from './+types/landing';
import HeroSection from "../components/HeroSection";
import DonationSection from "../components/DonationSection";
import FloatingAudioPlayer from "../components/FloatingAudioPlayer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hafeez & Hummulkhair's Wedding - December 14th, 2025" },
    { name: "description", content: "Join us in celebrating the love story of Abdul-Hafeez and Hummulkhair" },
  ];
}

interface WeddingSection {
  id: string;
  title: string;
  content: string;
  image: string;
  icon: any;
  bgColor: string;
  subtitle: string;
}

const weddingContent = [
  {
    id: 'toast',
    title: "Bismillah ar-Rahman ar-Rahim",
    content: 'Today, my heart feels stitched with quiet joy, every thread a prayer, every color a promise. You are my calm in the storm and my laughter in the silence. I ask Allah to let our days be woven with barakah, to wrap our moments in rahmah, and to let our tomorrows bloom brighter than today. To love that protects, to faith that assures, and to a future written with His light.To the man who softened my heart, I"m so grateful I get to call you mine.',
    image: '/love.jpg',
    icon: faHeart,
    bgColor: 'from-orange-50 to-amber-100',
    subtitle: "Hummulkhair's Toast"
  },
  {
    id: 'quran-verse',
    title: "Divine Blessing",
    content: 'And among His signs is this: He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts. In this are signs for those who reflect.',
    image: '/them.jpg',
    icon: faHeart,
    bgColor: 'from-rose-50 to-pink-100',
    subtitle: "Qur'an 30:21"
  },
  {
    id: 'from hafeez',
    title: "A Toast to Love",
    content: "A toast to my wife, my crown, my forever blessing Morenikeji mi. Forever warm, wise, wonderfully kind. Alhamdulillah for the gift of you in my life. You are the coolness of my eyes, the joy of my heart, and the path Allah destined for me. As we begin this new chapter together, I pray that Allah continues to bless our union with love, mercy, and tranquility. To a lifetime of love, laughter, and endless barakah. Cheers to us, my best friend and soulmate, Morenikeji mi.",
    image: '/us.jpg',
    icon: faHeart,
    bgColor: 'from-orange-50 to-amber-100',
    subtitle: "Hafeez's Toast"
  },
  {
    id: 'story',
    title: 'Our Story',
    content: 'Two hearts, guided by Allah, crossed paths in medical school in ways only He could have planned. What began as a simple connection, grew over time into friendship, trust, and finally love. With patience and faith, Allah turned that bond into the partnership we had both prayed for. Today, we are grateful to begin this new chapter not just as doctors shaping our careers, but as soulmates building a life together.',
    image: '/double2.jpg',
    icon: faRing,
    bgColor: 'from-green-50 to-amber-100',
    subtitle: "How It All Began"
  },
  {
    id: 'schedule',
    title: 'Schedule & Details',
    content: 'Join us for our special celebration at luxury party event centre, 2b, oladipo diya road, ikeja, lagos on Sunday, December 14th, 2025. Dress code: Peach and green. The ceremony begins at 1:00 PM followed by reception.',
    image: '/them.jpg',
    icon: faCalendarAlt,
    bgColor: 'from-rose-50 to-orange-100',
    subtitle: "When & Where"
  },
  {
    id: 'qa',
    title: 'Q&A',
    content: 'Frequently Asked Questions:\n\n• What time should I arrive? Please arrive by 1:30 PM\n• Is parking available? Yes, ample parking is provided\n• What is the deadline for RSVP? December 10\n• Children welcome? Yes, this is a family celebration',
    image: '/them2.jpg',
    icon: faUsers,
    bgColor: 'from-purple-50 to-rose-100',
    subtitle: "Your Questions Answered"
  },
  {
    id: 'donations',
    title: '',
    content: 'No physical gifts allowed, your presence is our present. However, should you wish to give in other ways, we would be grateful if such gesture is monetized.',
    image: '/image.jpg',
    icon: faGift,
    bgColor: 'from-amber-50 to-orange-100',
    subtitle: "From Our Hearts"
  },
  {
    id: 'tidbits',
    title: "Couple's Voice",
    content: 'With hearts full of gratitude, we give thanks to Almighty Allah for guiding our steps and making this union possible. We extend our deepest appreciation to our families, friends, and well-wishers for the love, prayers, and support you have shown us. Your presence on this journey is an honour we do not take for granted. As we look forward to sharing our special day with you, we pray that Allah rewards your kindness abundantly and fills your lives with peace, joy, and lasting blessings.',
    image: '/image.jpg',
    icon: faGift,
    bgColor: 'from-pink-50 to-amber-100',
    subtitle: "Sweet Details"
  }
];

const weddingDetails = {
  date: 'Sunday, December 14th 2025',
  time: '45 Days 3 Hours 0 Minutes',
  venue: 'luxury party event centre, 2b, oladipo diya road, ikeja, lagos'
};

export default function Landing() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Desktop: Handle scrollable content scroll
      const scrollable = document.getElementById('scrollable-content');
      if (scrollable && window.innerWidth >= 1024) {
        const scrollHeight = scrollable.scrollHeight - scrollable.clientHeight;
        const scrolled = scrollable.scrollTop;
        const progress = scrolled / scrollHeight;

        setScrollProgress(progress);

        // Calculate which section should be active based on scroll position
        const sectionIndex = Math.min(
          Math.floor(progress * weddingContent.length),
          weddingContent.length - 1
        );
        setActiveSection(Math.max(0, sectionIndex));
        return;
      }

      // Mobile: Handle window scroll
      if (window.innerWidth < 1024) {
        const windowHeight = window.innerHeight;
        const scrolled = window.scrollY;
        const heroHeight = windowHeight; // Hero section height

        if (scrolled < heroHeight) {
          setActiveSection(0);
          return;
        }

        // Calculate which section based on scroll past hero
        const scrollPastHero = scrolled - heroHeight;
        const sectionIndex = Math.min(
          Math.floor(scrollPastHero / windowHeight) + 1,
          weddingContent.length - 1
        );
        setActiveSection(Math.max(0, sectionIndex));
      }
    };

    const scrollable = document.getElementById('scrollable-content');
    if (scrollable) {
      scrollable.addEventListener('scroll', handleScroll);
    }

    // Also listen to window scroll for mobile
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (scrollable) {
        scrollable.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const currentSection = weddingContent[activeSection];

  return (
    <div className="min-h-screen">
      {/* Mobile: Hero Section (componentized) */}
      <HeroSection className="lg:hidden" />

      {/* Desktop: Split Layout */}
      <div className="hidden lg:flex min-h-screen">
        {/* Left Side - Images Gallery */}
        <div className="w-1/2 sticky top-0 h-screen relative overflow-hidden">
          {/* Image Slideshow */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
              style={{
                backgroundImage: `url(${currentSection.image})`
              }}
            />
            {/* Elegant overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/35 via-rose-800/10 to-purple-200/5" />
          </div>

          {/* Image navigation dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-3">
              {weddingContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`w-4 h-4 transition-all duration-300 transform hover:scale-110 ${
                    index === activeSection
                      ? 'bg-amber-200 shadow-soft border-2 border-white/30'
                      : 'bg-white/50 hover:bg-amber-100/80 backdrop-blur-sm'
                  } rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Content (Desktop) */}
        <div className="w-1/2 bg-gradient-to-br from-orange-50 to-amber-100 relative">
          <div
            id="scrollable-content"
            className="h-screen overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Desktop Header - Reduced Size */}
            <div className="sticky top-0 z-10 bg-orange-50/95 backdrop-blur-md border-b border-amber-200/20 shadow-gentle">
              <div className="p-4 text-center">
                <p className="text-pink-500 text-2xl mb-2 font-script font-serif">
                  #doubleHaffairs25
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-2 rounded-full"></div>
                <h1 className="text-2xl lg:text-3xl font-elegant font-medium text-amber-800 mb-2 drop-shadow-sm">
                  Hummulkhair & Abdul-Hafeez
                </h1>
                <p className="text-amber-600 text-sm font-serif font-light tracking-wide">
                  December 14th, 2025 • Lagos, Nigeria
                </p>
              </div>
            </div>

            {/* Full-Page Content Sections */}
            <div className="">
              {weddingContent.map((section, index) => (
                <section
                  key={section.id}
                  className={`min-h-screen flex items-center justify-center px-12 py-16 transition-all duration-500 ${
                    index === activeSection
                      ? section.id === 'toast'
                        ? 'bg-gradient-to-br from-orange-100/60 to-amber-50/60'
                        : section.id === 'schedule'
                        ? 'bg-gradient-to-br from-rose-50/50 to-orange-100/50'
                        : section.id === 'qa'
                        ? 'bg-gradient-to-br from-purple-50/40 to-rose-50/40'
                        : section.id === 'story'
                        ? 'bg-gradient-to-br from-green-50/50 to-amber-50/50'
                        : section.id === 'quran-verse'
                        ? 'bg-gradient-to-br from-rose-50/60 to-pink-50/60'
                        : section.id === 'donations'
                        ? 'bg-gradient-to-br from-amber-50/50 to-orange-50/50'
                        : 'bg-gradient-to-br from-pink-50/40 to-orange-50/40'
                      : 'bg-orange-50/20'
                  }`}
                >
                  <div className="max-w-3xl mx-auto text-center space-y-8 relative">
                    {/* Decorative elements */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-300 opacity-50 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-rose-300 opacity-40 rounded-full"></div>
                        <div className="w-2 h-2 bg-pink-300 opacity-50 rounded-full"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-300 rounded-full"></div>
                      <div className="w-4 h-4 border border-amber-300/60 bg-orange-100/80 rotate-45 rounded-sm shadow-gentle"></div>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-300 rounded-full"></div>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-elegant font-medium text-amber-800 relative drop-shadow-sm">
                      {section.title}
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full"></div>
                    </h2>

                    <div className="space-y-6">
                      {section.id === 'toast' && (
                        <>
                          <div className="wedding-card max-w-2xl mx-auto p-8">
                            <p className="text-xl leading-relaxed text-amber-700 font-serif font-light italic mb-6">
                              "Today, my heart feels stitched with quiet joy, every thread a prayer, every color a promise. You are my calm in the storm and my laughter in the silence."
                            </p>
                            <p className="text-xl leading-relaxed text-amber-700 font-serif font-light italic mb-6">
                              "I ask Allah to let our days be woven with barakah, to wrap our moments in rahmah, and to let our tomorrows bloom brighter than today. To love that protects, to faith that assures, and to a future written with His light."
                            </p>
                            <p className="text-pink-600 font-script text-lg">
                              — Hummulkhair's Heart
                            </p>
                          </div>
                        </>
                      )}

                      {section.id === 'from hafeez' && (
                        <>
                          <div className="wedding-card max-w-2xl mx-auto p-8">
                            <p className="text-xl leading-relaxed text-amber-700 font-serif font-light italic mb-6">
                              "A toast to my wife, my crown, my forever blessing Morenikeji mi. Forever warm, wise, and wonderful kind. Alhamdulillah for the gift of you in my life."
                            </p>
                            <p className="text-xl leading-relaxed text-amber-700 font-serif font-light italic mb-6">
                              "You are the coolness of my eyes, the joy of my heart, and the path Allah destined for me. As we begin this new chapter together, I pray that Allah continues to bless our union with love, mercy, and tranquility."
                            </p>
                            <p className="text-xl leading-relaxed text-amber-700 font-serif font-light italic mb-6">
                              "To a lifetime of love, laughter, and endless barakah. Cheers to us, my best friend and soulmate, Morenikeji mi."
                            </p>
                            <p className="text-pink-600 font-script text-lg">
                              — Hafeez's Heart
                            </p>
                          </div>
                        </>
                      )}

                      {section.id === 'quran-verse' && (
                        <>
                          <div className="wedding-card max-w-2xl mx-auto p-8 text-center bg-gradient-to-r from-rose-50/80 to-pink-50/80 border-rose-200/40">
                            <div className="mb-6">
                              <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto shadow-gentle">
                                <FontAwesomeIcon icon={faHeart} className="text-2xl text-rose-500" />
                              </div>
                            </div>
                            <p className="text-xl leading-relaxed text-rose-700 font-serif font-light italic mb-6">
                              "{section.content}"
                            </p>
                            <p className="text-rose-600 font-script text-lg">— Qur'an 30:21</p>
                          </div>
                        </>
                      )}

                      {section.id === 'schedule' && (
                        <>
                          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <div className="wedding-card p-6 space-y-4">
                              <div className="text-amber-600 mb-4 flex justify-center">
                                <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl" />
                              </div>
                              <h3 className="text-xl font-serif font-medium text-amber-800 text-center">When</h3>
                              <div className="text-center space-y-2">
                                <p className="text-lg text-amber-600 font-light">Saturday</p>
                                <p className="text-lg text-amber-600 font-light">December 14th, 2025</p>
                                <p className="text-lg text-amber-600 font-light">2:00 PM</p>
                              </div>
                            </div>

                            <div className="wedding-card p-6 space-y-4">
                              <div className="text-rose-600 mb-4 flex justify-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-3xl" />
                              </div>
                              <h3 className="text-xl font-serif font-medium text-rose-800 text-center">Where</h3>
                              <div className="text-center space-y-2">
                                <p className="text-lg text-rose-600 font-light">Luxery Party Event center</p>
                                <p className="text-lg text-rose-600 font-light">Block G, plot A2 MKO ABIOLA GARDEN ROAD , beside ADDONAI court. Alausa Ikeja.</p>
                                <p className="text-lg text-rose-600 font-light">Lagos, Nigeria</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-12 wedding-card p-6 max-w-md mx-auto text-center">
                            <p className="text-lg text-amber-700 font-serif"><span className="font-medium">Dress Code:</span> Peach and green</p>
                          </div>
                        </>
                      )}

                      {section.id === 'story' && (
                        <>
                          <div className="max-w-4xl mx-auto">
                            {/* Story Cards */}
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                              {/* How We Met */}
                              <div className="wedding-card p-8 bg-gradient-to-br from-green-50/80 to-amber-50/80 border-green-200/30">
                                <div className="text-center mb-6">
                                  <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-gentle">
                                    <FontAwesomeIcon icon={faHeart} className="text-2xl text-green-600" />
                                  </div>
                                  <h3 className="text-xl font-elegant font-medium text-green-800">Divine Connection</h3>
                                </div>
                                <p className="text-lg leading-relaxed text-green-700 font-serif font-light text-center">
                                  Two hearts found each other by Allah's grace. From friendship to love, from love to this beautiful commitment. We invite you to witness the beginning of our forever.
                                </p>
                              </div>


                            </div>

                            {/* Love Quote */}
                            <div className="wedding-card max-w-2xl mx-auto p-8 text-center bg-gradient-to-r from-rose-50/60 to-pink-50/60 border-rose-200/30">
                              <div className="mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto shadow-gentle">
                                  <FontAwesomeIcon icon={faHeart} className="text-xl text-rose-500" />
                                </div>
                              </div>
                              <p className="text-xl leading-relaxed text-rose-700 font-serif font-light italic mb-4">
                                "And among His signs is this: He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts."
                              </p>
                              <p className="text-rose-600 font-script text-lg">— Qur'an 30:21</p>
                            </div>
                          </div>
                        </>
                      )}

                      {section.id === 'qa' && (
                        <div className="max-w-3xl mx-auto">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Q&A Items */}
                            <div className="wedding-card p-6 bg-gradient-to-br from-purple-50/60 to-rose-50/60 border-purple-200/30 hover:shadow-dreamy transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-gentle">
                                  <FontAwesomeIcon icon={faClock} className="text-purple-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-serif font-medium text-purple-800 mb-2">What time should I arrive?</h3>
                                  <p className="text-purple-700 font-light leading-relaxed">Please arrive by 1:30 PM to ensure you don't miss the ceremony.</p>
                                </div>
                              </div>
                            </div>

                            <div className="wedding-card p-6 bg-gradient-to-br from-rose-50/60 to-amber-50/60 border-rose-200/30 hover:shadow-dreamy transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-rose-100 to-amber-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-gentle">
                                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-serif font-medium text-rose-800 mb-2">Is parking available?</h3>
                                  <p className="text-rose-700 font-light leading-relaxed">Yes, ample parking space is provided at the venue.</p>
                                </div>
                              </div>
                            </div>

                            <div className="wedding-card p-6 bg-gradient-to-br from-amber-50/60 to-green-50/60 border-amber-200/30 hover:shadow-dreamy transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-amber-100 to-green-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-gentle">
                                  <FontAwesomeIcon icon={faGift} className="text-amber-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-serif font-medium text-amber-800 mb-2">
                                    RSVP deadline</h3>
                                  <p className="text-amber-700 font-light leading-relaxed">December 10.</p>
                                </div>
                              </div>
                            </div>

                            <div className="wedding-card p-6 bg-gradient-to-br from-green-50/60 to-purple-50/60 border-green-200/30 hover:shadow-dreamy transition-all duration-300">
                              <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-gentle">
                                  <FontAwesomeIcon icon={faUsers} className="text-green-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-serif font-medium text-green-800 mb-2">Are children welcome?</h3>
                                  <p className="text-green-700 font-light leading-relaxed">Absolutely! This is a family celebration for all ages.</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {section.id === 'donations' && (
                        <>
                          <div className="max-w-4xl mx-auto">
                            <DonationSection className="" />
                          </div>
                        </>
                      )}

                      {section.id === 'tidbits' && (
                        <>
                          <div className="wedding-card max-w-2xl mx-auto p-8 text-center">
                            <p className="text-xl leading-relaxed text-pink-700 font-serif font-light italic mb-6">
                              With hearts full of gratitude, we give thanks to Almighty Allah for guiding our steps and making this union possible. We extend our deepest appreciation to our families, friends, and well-wishers for the love, prayers, and support you have shown us. Your presence on this journey is an honour we do not take for granted. As we look forward to sharing our special day with you, we pray that Allah rewards your kindness abundantly and fills your lives with peace, joy, and lasting blessings.
                            </p>
                            <p className="text-pink-600 font-script text-lg">
                              — Drs Olasode Abdulhafeez & Hummulkair❤
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Bottom decorative divider */}
                    <div className="flex items-center justify-center space-x-4 pt-8">
                      <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-300/40 rounded-full"></div>
                      <div className="flex space-x-2">
                        <div className="w-1.5 h-1.5 bg-amber-300/60 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-rose-300/60 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-pink-300/60 rounded-full"></div>
                      </div>
                      <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-300/40 rounded-full"></div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Mobile: Full-Page Sections */}
      <div className="lg:hidden">
        {weddingContent.map((section, index) => (
          <section
            key={`mobile-${section.id}`}
            className={`min-h-screen flex items-center justify-center px-6 py-16 ${
              section.id === 'toast'
                ? 'bg-gradient-to-br from-orange-100/80 to-amber-100/80'
                : section.id === 'schedule'
                ? 'bg-gradient-to-br from-rose-50/70 to-orange-100/70'
                : section.id === 'qa'
                ? 'bg-gradient-to-br from-purple-50/60 to-rose-50/60'
                : section.id === 'story'
                ? 'bg-gradient-to-br from-green-50/70 to-amber-50/70'
                : section.id === 'quran-verse'
                ? 'bg-gradient-to-br from-rose-50/70 to-pink-50/70'
                : section.id === 'donations'
                ? 'bg-gradient-to-br from-amber-50/70 to-orange-50/70'
                : 'bg-gradient-to-br from-pink-50/60 to-orange-50/60'
            }`}
          >
            <div className="max-w-2xl mx-auto text-center space-y-8 relative">
              {/* Decorative elements */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-300 rounded-full"></div>
                <div className="w-3 h-3 border border-amber-300/60 bg-orange-100/80 rotate-45 rounded-sm"></div>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-300 rounded-full"></div>
              </div>

              <h2 className="text-2xl md:text-3xl font-elegant font-medium text-amber-800 relative drop-shadow-sm">
                {section.title}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full"></div>
              </h2>

              <div className="space-y-6">
                {section.id === 'toast' && (
                  <>
                    <div className="wedding-card p-6">
                      <p className="text-lg leading-relaxed text-amber-700 font-serif font-light italic mb-4">
                        "Today, my heart feels stitched with quiet joy, every thread a prayer, every color a promise. You are my calm in the storm and my laughter in the silence."
                      </p>
                      <p className="text-lg leading-relaxed text-amber-700 font-serif font-light italic mb-4">
                        "I ask Allah to let our days be woven with barakah, to wrap our moments in rahmah, and to let our tomorrows bloom brighter than today. To love that protects, to faith that assures, and to a future written with His light."
                      </p>
                      <p className="text-pink-600 font-script text-base">
                        — Hummulkhair's Heart
                      </p>
                    </div>
                  </>
                )}

                {section.id === 'from hafeez' && (
                  <>
                    <div className="wedding-card p-6">
                      <p className="text-lg leading-relaxed text-amber-700 font-serif font-light italic mb-4">
                        "A toast to my wife, my crown, my forever blessing Morenikeji mi. Forever warm, wise, wonderfully kind. Alhamdulillah for the gift of you in my life."
                      </p>
                      <p className="text-lg leading-relaxed text-amber-700 font-serif font-light italic mb-4">
                        "You are the coolness of my eyes, the joy of my heart, and the path Allah destined for me. As we begin this new chapter together, I pray that Allah continues to bless our union with love, mercy, and tranquility."
                      </p>
                      <p className="text-lg leading-relaxed text-amber-700 font-serif font-light italic mb-4">
                        "To a lifetime of love, laughter, and endless barakah. Cheers to us, my best friend and soulmate, Morenikeji mi."
                      </p>
                      <p className="text-pink-600 font-script text-base">
                        — Hafeez's Heart
                      </p>
                    </div>
                  </>
                )}

                {section.id === 'quran-verse' && (
                  <>
                    <div className="wedding-card p-6 text-center bg-gradient-to-r from-rose-50/80 to-pink-50/80 border-rose-200/40">
                      <div className="mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto shadow-gentle">
                          <FontAwesomeIcon icon={faHeart} className="text-xl text-rose-500" />
                        </div>
                      </div>
                      <p className="text-lg leading-relaxed text-rose-700 font-serif font-light italic mb-4">
                        "{section.content}"
                      </p>
                      <p className="text-rose-600 font-script text-base">
                        — Qur'an 30:21
                      </p>
                    </div>
                  </>
                )}

                {section.id === 'schedule' && (
                  <>
                    <div className="space-y-6">
                      <div className="wedding-card p-6">
                        <div className="text-amber-600 mb-4 flex justify-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-2xl" />
                        </div>
                        <h3 className="text-lg font-serif font-medium text-amber-800 text-center mb-3">When</h3>
                        <div className="text-center space-y-1">
                          <p className="text-amber-600 font-light">Sunday, December 14th, 2025</p>
                          <p className="text-amber-600 font-light">2:00 PM</p>
                        </div>
                      </div>

                      <div className="wedding-card p-6">
                        <div className="text-rose-600 mb-4 flex justify-center">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl" />
                        </div>
                        <h3 className="text-lg font-serif font-medium text-rose-800 text-center mb-3">Where</h3>
                        <div className="text-center space-y-1">
                          <p className="text-rose-600 font-light">LUXURY PARTY EVENT CENTER</p>
                          <p className="text-rose-600 font-light">Block G, plot A2 MKO ABIOLA GARDEN ROAD , beside ADDONAI court. Alausa Ikeja.</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="wedding-card p-4 text-center">
                        <p className="text-amber-700 font-serif"><span className="font-medium">Dress Code:</span> Peach and green</p>
                      </div>
                    </div>
                  </>
                )}

                {(section.id === 'story' || section.id === 'tidbits') && (
                  <div className="space-y-6">
                    <div className="wedding-card p-6">
                      <p className="text-lg leading-relaxed text-green-700 font-serif font-light whitespace-pre-line">
                        {section.content}
                      </p>
                      {section.id === 'tidbits' && (
                        <p className="text-pink-600 font-script text-base mt-4 text-center">
                          — Drs Olasode Abdulhafeez & Hummulkair❤
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {section.id === 'donations' && (
                  <div className="space-y-6">
                    <DonationSection />
                  </div>
                )}

                {section.id === 'qa' && (
                  <div className="space-y-4">
                    {/* Q&A Items */}
                    <div className="wedding-card p-5 bg-gradient-to-br from-purple-50/60 to-rose-50/60 border-purple-200/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faClock} className="text-purple-600 text-sm" />
                        </div>
                        <div>
                          <h3 className="text-base font-serif font-medium text-purple-800 mb-1">What time should I arrive?</h3>
                          <p className="text-purple-700 font-light text-sm leading-relaxed">Please arrive by 1:30 PM to ensure you don't miss the ceremony.</p>
                        </div>
                      </div>
                    </div>

                    <div className="wedding-card p-5 bg-gradient-to-br from-rose-50/60 to-amber-50/60 border-rose-200/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-rose-100 to-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-600 text-sm" />
                        </div>
                        <div>
                          <h3 className="text-base font-serif font-medium text-rose-800 mb-1">Is parking available?</h3>
                          <p className="text-rose-700 font-light text-sm leading-relaxed">Yes, ample parking space is provided at the venue.</p>
                        </div>
                      </div>
                    </div>

                    <div className="wedding-card p-5 bg-gradient-to-br from-amber-50/60 to-green-50/60 border-amber-200/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faGift} className="text-amber-600 text-sm" />
                        </div>
                        <div>
                          <h3 className="text-base font-serif font-medium text-amber-800 mb-1">when is RSVP deadline ?</h3>
                          <p className="text-amber-700 font-light text-sm leading-relaxed">Please RSVP by december 10th, so we can have an accurate headcount</p>
                        </div>
                      </div>
                    </div>

                    <div className="wedding-card p-5 bg-gradient-to-br from-green-50/60 to-purple-50/60 border-green-200/30">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faUsers} className="text-green-600 text-sm" />
                        </div>
                        <div>
                          <h3 className="text-base font-serif font-medium text-green-800 mb-1">Are children welcome?</h3>
                          <p className="text-green-700 font-light text-sm leading-relaxed">Absolutely! This is a family celebration for all ages.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom decorative divider */}
              <div className="flex items-center justify-center space-x-3 pt-6">
                <div className="w-6 h-px bg-gradient-to-r from-transparent to-amber-300/40 rounded-full"></div>
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-300/50 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-rose-300/50 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-pink-300/50 rounded-full"></div>
                </div>
                <div className="w-6 h-px bg-gradient-to-l from-transparent to-amber-300/40 rounded-full"></div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Scroll Progress Indicator - Desktop */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-20">
        <div className="w-1 h-24 bg-amber-200/40 overflow-hidden rounded-full shadow-gentle">
          <div
            className="w-full bg-gradient-to-t from-amber-400 to-rose-300 transition-all duration-300 ease-out rounded-full"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Scroll Down Indicator */}
      <div className="hidden lg:block fixed bottom-8 right-6 z-30">
        <div className="animate-bounce">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-soft border border-white/30 backdrop-blur-sm hover:scale-110 transition-all duration-300 rounded-xl">
            <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 animate-ping rounded-full"></div>
      </div>

      {/* Mobile Scroll Down Indicator */}
      <div className="lg:hidden fixed bottom-8 right-8 z-30">
        <div className="animate-bounce">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center shadow-dreamy border border-white/30 backdrop-blur-sm rounded-2xl">
            <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 animate-ping rounded-full"></div>
      </div>

      {/* Floating Audio Player */}
      <FloatingAudioPlayer />

      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .line-clamp-3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          
          .font-serif {
            font-family: 'Georgia', 'Times New Roman', serif;
          }
        `
      }} />
    </div>
  );
}
