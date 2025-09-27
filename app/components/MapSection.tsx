import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCopy, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface MapSectionProps {
  className?: string;
}

export default function MapSection({ className = "" }: MapSectionProps) {
  const [copied, setCopied] = useState(false);
  const venueAddress = "luxury party event centre, 2b, oladipo diya road, ikeja, lagos";
  const googleMapsUrl = "https://www.google.com/maps/place/Luxury+Party+Event+Centre/@6.6202898,3.3561674,17z/data=!3m1!4b1!4m6!3m5!1s0x103b930c6f675fe3:0x24608a78bdd74839!8m2!3d6.6202845!4d3.3587423!16s%2Fg%2F11shsxsm0h?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D";

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(venueAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address: ', err);
    }
  };

  return (
    <section className={`py-16 bg-gradient-to-br from-green-50 to-wedding-50 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-wedding-300"></div>
            <div className="w-4 h-4 border border-wedding-300 rounded-full bg-white rotate-45"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-wedding-300"></div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 font-serif mb-4">
            Find Us Here
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-wedding-300 to-rose-300"></div>
          </h2>
          <p className="text-gray-600 text-lg">Join us at our beautiful venue in Lagos</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Placeholder - You can replace this with actual map integration */}
          <div className="relative">
            <div className="bg-white shadow-xl overflow-hidden border border-wedding-100/50" style={{ borderRadius: '12px' }}>
              {/* Map container */}
              <div className="h-96 bg-gradient-to-br from-green-100 to-wedding-100 relative flex items-center justify-center">
                <div className="text-center space-y-4">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-6xl text-wedding-500" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium text-gray-800">LUXERY PARTY EVENT CENTER</h3>
                    <p className="text-gray-600">2MKO ABIOLA GARDENS RD, AGIDINGBI Lagos</p>
                  </div>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-wedding-500 text-white px-6 py-3 font-medium hover:bg-wedding-600 transition-colors duration-300 shadow-lg"
                    style={{ borderRadius: '6px' }}
                  >
                    <span>Open in Google Maps</span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm" />
                  </a>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-rose-300 animate-pulse" style={{ borderRadius: '2px' }}></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-green-400 animate-pulse" style={{ borderRadius: '1px', animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/3 right-12 w-4 h-4 border-2 border-wedding-300 animate-bounce" style={{ borderRadius: '2px', animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>

          {/* Venue Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 shadow-lg border border-wedding-100/50" style={{ borderRadius: '12px' }}>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-wedding-100 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '8px' }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-wedding-600 text-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Venue Address</h3>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">{venueAddress}</p>
                    <button
                      onClick={copyAddress}
                      className="inline-flex items-center space-x-2 text-wedding-600 hover:text-wedding-700 font-medium transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faCopy} className="text-sm" />
                      <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-wedding-200/30 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Getting There</h4>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wedding-300 mt-2 flex-shrink-0" style={{ borderRadius: '1px' }}></span>
                      <span>Ample parking available on-site</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wedding-300 mt-2 flex-shrink-0" style={{ borderRadius: '1px' }}></span>
                      <span>Accessible via public transportation</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-wedding-300 mt-2 flex-shrink-0" style={{ borderRadius: '1px' }}></span>
                      <span>Wheelchair accessible venue</span>
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-rose-50 to-green-50 p-6" style={{ borderRadius: '8px' }}>
                  <h4 className="font-medium text-gray-900 mb-2">Need Directions?</h4>
                  <p className="text-gray-600 text-sm mb-4">We recommend arriving 30 minutes early to find parking and get settled.</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-white text-wedding-600 px-4 py-2 font-medium hover:bg-wedding-50 transition-colors duration-200 border border-wedding-200"
                      style={{ borderRadius: '6px' }}
                    >
                      Google Maps
                    </a>
                    <button className="text-sm bg-white text-green-600 px-4 py-2 font-medium hover:bg-green-50 transition-colors duration-200 border border-green-200" style={{ borderRadius: '6px' }}>
                      Apple Maps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
