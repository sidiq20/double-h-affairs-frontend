import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Wedding Guest Verification" },
    { name: "description", content: "Wedding QR Code Guest Verification System" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-50 to-wedding-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 text-8xl mb-6">
                <span>💒</span>
                <span>💕</span>
                <span>🎊</span>
              </div>
              <h1 className="text-5xl font-bold text-wedding-800 mb-4">
                Wedding Guest Verification
              </h1>
              <p className="text-xl text-wedding-600 mb-8">
                QR Code Based Guest Management System
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Link 
                to="/init?code=demo" 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-wedding-200 hover:border-wedding-300"
              >
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-wedding-700 mb-2">Guest Check-in</h3>
                <p className="text-wedding-600">Scan your QR code to register your name</p>
              </Link>
              
              <Link 
                to="/scanner" 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-wedding-200 hover:border-wedding-300"
              >
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-xl font-semibold text-wedding-700 mb-2">Event Scanner</h3>
                <p className="text-wedding-600">Scan QR codes at the wedding entrance</p>
              </Link>
              
              <Link 
                to="/admin" 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-wedding-200 hover:border-wedding-300"
              >
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold text-wedding-700 mb-2">Admin Panel</h3>
                <p className="text-wedding-600">Manage QR codes and view statistics</p>
              </Link>
            </div>
            
            <div className="bg-white/50 rounded-xl p-6 border border-wedding-200">
              <h2 className="text-2xl font-bold text-wedding-800 mb-4">How it Works</h2>
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-2xl mb-2">1️⃣</div>
                  <h4 className="font-semibold text-wedding-700 mb-2">Generate QR Codes</h4>
                  <p className="text-sm text-wedding-600">Admin generates bulk QR codes for guests</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">2️⃣</div>
                  <h4 className="font-semibold text-wedding-700 mb-2">Guest Registration</h4>
                  <p className="text-sm text-wedding-600">Guests scan their QR and enter their name</p>
                </div>
                <div>
                  <div className="text-2xl mb-2">3️⃣</div>
                  <h4 className="font-semibold text-wedding-700 mb-2">Event Check-in</h4>
                  <p className="text-sm text-wedding-600">Staff scan QR codes at wedding entrance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
