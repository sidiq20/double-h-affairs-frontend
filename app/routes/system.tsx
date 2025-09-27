import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMobile, 
  faCamera, 
  faGear,
  faChurch,
  faCode,
  faArrowRight,
  faQrcode,
  faUserCheck,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import type { Route } from "./+types/system";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wedding Guest Verification System" },
    { name: "description", content: "Modern QR Code Guest Management System" },
  ];
}

export default function System() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-8 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <FontAwesomeIcon icon={faQrcode} className="text-4xl text-white mr-3" />
              <FontAwesomeIcon icon={faShieldAlt} className="text-4xl text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Wedding Guest
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Verification System</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Streamlined QR code-based guest management for seamless wedding experiences
            </p>
          </div>

          {/* Main Navigation Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Link 
              to="/init?code=demo" 
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:scale-105 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faMobile} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-green-600 transition-colors">Guest Check-in</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">Register your name and initialize your QR code for seamless entry</p>
                <div className="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Get Started</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </div>
              </div>
            </Link>
            
            <Link 
              to="/scanner" 
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:scale-105 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faCamera} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">Event Scanner</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">Quick QR code scanning for wedding entrance verification</p>
                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Open Scanner</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </div>
              </div>
            </Link>
            
            <Link 
              to="/admin" 
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:scale-105 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faGear} className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">Admin Panel</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">Manage QR codes, view analytics and system statistics</p>
                <div className="flex items-center text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Admin Access</span>
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </div>
              </div>
            </Link>
          </div>

          {/* How it Works Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl mb-12">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faCode} className="text-3xl text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Generate Codes</h4>
                <p className="text-slate-600 leading-relaxed">Admin creates bulk QR codes with unique identifiers for seamless distribution to guests</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faUserCheck} className="text-3xl text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Guest Registration</h4>
                <p className="text-slate-600 leading-relaxed">Guests scan their QR codes and register their names for personalized wedding entry</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon icon={faCamera} className="text-3xl text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-3">Event Check-in</h4>
                <p className="text-slate-600 leading-relaxed">Staff scan QR codes at the venue entrance for instant guest verification and welcome</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Link 
              to="/" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <FontAwesomeIcon icon={faChurch} className="group-hover:scale-110 transition-transform" />
              <span>View Wedding Invitation</span>
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
