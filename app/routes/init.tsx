import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChurch, 
  faSpinner, 
  faCheckCircle, 
  faInfoCircle, 
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';
import type { Route } from './+types/init';
import { initializeQR, getCodeInfo, ApiError } from '../utils/api';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Initialize Your QR Code - Wedding Guest Verification' },
    { name: 'description', content: 'Register your name for wedding entry' },
  ];
}

interface FormData {
  name: string;
}

interface InitState {
  status: 'loading' | 'form' | 'success' | 'error' | 'already_initialized';
  message: string;
  qrNumber?: number;
}

export default function Init() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const codeId = searchParams.get('code');
  
  const [formData, setFormData] = useState<FormData>({ name: '' });
  const [state, setState] = useState<InitState>({ 
    status: 'loading', 
    message: 'Loading...' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!codeId) {
      setState({ 
        status: 'error', 
        message: 'Invalid QR code. No code parameter found.' 
      });
      return;
    }

    getCodeInfo(codeId)
      .then(response => {
        const qrCode = response.code;
        if (qrCode.name) {
          setState({
            status: 'already_initialized',
            message: `This QR code is already registered to: ${qrCode.name}. Redirecting to wedding invitation...`,
            qrNumber: qrCode.qr_number
          });
          
          // Redirect to landing page after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          setState({
            status: 'form',
            message: '',
            qrNumber: qrCode.qr_number
          });
        }
      })
      .catch(error => {
        setState({ 
          status: 'error', 
          message: error instanceof ApiError ? error.message : 'Failed to load QR code information' 
        });
      });
  }, [codeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!codeId) return;
    
    const name = formData.name.trim();
    if (!name) {
      setState({ 
        status: 'error', 
        message: 'Please enter your name' 
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await initializeQR(codeId, name);
      setState({
        status: 'success',
        message: `Welcome ${response.name}! Your QR code has been successfully registered. Redirecting to wedding invitation...`,
        qrNumber: state.qrNumber
      });
      
      // Redirect to landing page after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setState({ 
        status: 'error', 
        message: error instanceof ApiError ? error.message : 'Failed to initialize QR code' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-16 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 -right-16 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl mb-8 shadow-xl">
              <FontAwesomeIcon icon={faChurch} className="text-5xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Guest Registration
            </h1>
            <p className="text-lg text-slate-600 mb-4">
              Complete your wedding check-in process
            </p>
            {state.qrNumber && (
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
                <span className="text-emerald-700 font-medium">QR Code #{state.qrNumber}</span>
              </div>
            )}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {state.status === 'loading' && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faSpinner} className="text-2xl text-white animate-spin" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">Loading...</h2>
                <p className="text-slate-600">{state.message}</p>
              </div>
            )}

            {state.status === 'form' && (
              <form onSubmit={handleSubmit} className="p-8 md:p-12">
                <div className="mb-8">
                  <label htmlFor="name" className="block text-lg font-semibold text-slate-800 mb-4">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg placeholder-slate-400"
                      required
                      autoFocus
                      disabled={isSubmitting}
                    />
                  </div>
                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                    💡 This name will be displayed when your QR code is scanned at the wedding entrance.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim()}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-600 focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Registering...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>Register My QR Code</span>
                    </span>
                  )}
                </button>
              </form>
            )}

            {state.status === 'success' && (
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-4xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  🎉 Registration Complete!
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md mx-auto">{state.message}</p>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-emerald-800 mb-4 text-lg">What's Next:</h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 text-emerald-700">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      <span className="text-sm">You'll be redirected to our wedding invitation</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-700">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      <span className="text-sm">Keep this QR code safe for the wedding day</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-700">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      <span className="text-sm">Show it at the entrance for quick check-in</span>
                    </div>
                    <div className="flex items-center gap-3 text-emerald-700">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      <span className="text-sm">You can use it up to 2 times</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-8 rounded-2xl font-bold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <FontAwesomeIcon icon={faChurch} />
                    <span>View Invitation Now</span>
                  </Link>
                  <Link to="/system" className="inline-flex items-center justify-center gap-2 bg-slate-500 text-white py-3 px-8 rounded-2xl font-bold hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Back to System</span>
                  </Link>
                </div>
              </div>
            )}

            {state.status === 'already_initialized' && (
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-4xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  ✅ Already Registered!
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md mx-auto">{state.message}</p>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
                  <p className="text-blue-700 leading-relaxed">
                    🎉 Your QR code is ready to use at the wedding! You'll be redirected to our wedding invitation.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-8 rounded-2xl font-bold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <FontAwesomeIcon icon={faChurch} />
                    <span>View Invitation Now</span>
                  </Link>
                  <Link to="/system" className="inline-flex items-center justify-center gap-2 bg-slate-500 text-white py-3 px-8 rounded-2xl font-bold hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span>Back to System</span>
                  </Link>
                </div>
              </div>
            )}

            {state.status === 'error' && (
              <div className="p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  ❌ Something went wrong
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-md mx-auto">{state.message}</p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-2xl font-bold hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🔄 Try Again
                  </button>
                  <Link to="/system" className="w-full bg-slate-500 text-white py-3 px-6 rounded-2xl font-bold hover:bg-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Back to System
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <p className="text-slate-600 text-sm leading-relaxed">
                📞 Having trouble? Contact the wedding organizers for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}