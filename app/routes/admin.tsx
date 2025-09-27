import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGear, 
  faSpinner, 
  faExclamationTriangle,
  faChartBar,
  faCheckCircle,
  faTicket,
  faLock,
  faFileText,
  faQrcode,
  faWandMagicSparkles,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import type { Route } from './+types/admin';
import { 
  generateQRCodes, 
  getAllCodes, 
  getStats,
  getAttendees, 
  ApiError,
  type QRCode,
  type Stats,
  type Attendee 
} from '../utils/api';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Admin Panel - Wedding Guest Verification' },
    { name: 'description', content: 'Manage QR codes and view statistics' },
  ];
}

interface AdminState {
  stats: Stats | null;
  codes: QRCode[];
  attendees: Attendee[];
  loading: boolean;
  error: string | null;
  generating: boolean;
  filterStatus: 'all' | 'initialized' | 'uninitialized' | 'used';
  activeTab: 'codes' | 'attendees';
}

export default function Admin() {
  const [state, setState] = useState<AdminState>({
    stats: null,
    codes: [],
    attendees: [],
    loading: true,
    error: null,
    generating: false,
    filterStatus: 'all',
    activeTab: 'codes'
  });

  const [generateCount, setGenerateCount] = useState(50);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [statsResponse, codesResponse, attendeesResponse] = await Promise.all([
        getStats(),
        getAllCodes(),
        getAttendees()
      ]);
      
      setState(prev => ({
        ...prev,
        stats: statsResponse.stats,
        codes: codesResponse.codes,
        attendees: attendeesResponse.attendees,
        loading: false
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof ApiError ? error.message : 'Failed to load data',
        loading: false
      }));
    }
  };

  const handleGenerateQRCodes = async () => {
    if (generateCount < 1 || generateCount > 1000) {
      alert('Please enter a number between 1 and 1000');
      return;
    }

    setState(prev => ({ ...prev, generating: true, error: null }));
    
    try {
      const response = await generateQRCodes(generateCount);
      alert(`Successfully generated ${response.codes.length} QR codes`);
      await loadData(); // Reload data
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof ApiError ? error.message : 'Failed to generate QR codes',
        generating: false
      }));
    } finally {
      setState(prev => ({ ...prev, generating: false }));
    }
  };

  const filteredCodes = state.codes.filter(code => {
    switch (state.filterStatus) {
      case 'initialized': return code.name !== null;
      case 'uninitialized': return code.name === null;
      case 'used': return code.scan_count > 0;
      default: return true;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-16 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 -right-16 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/50">
          <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faSpinner} className="text-3xl text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Loading Dashboard</h2>
          <p className="text-slate-600">Fetching admin panel data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-8 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl mb-8 shadow-xl">
              <FontAwesomeIcon icon={faGear} className="text-5xl text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
              Admin Dashboard
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive QR code management and wedding analytics
            </p>
          </div>

          {state.error && (
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur opacity-20"></div>
              <div className="relative bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl text-white" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-red-800 mb-2">Error Occurred</h4>
                      <p className="text-red-700 text-lg">{state.error}</p>
                    </div>
                  </div>
                  <button
                    onClick={loadData}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-2xl font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          {state.stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 mb-16">
              {/* Total QR Codes Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faChartBar} className="text-2xl text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-800">{state.stats.total_codes}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Total QR Codes</h3>
                  <p className="text-sm text-slate-500">All generated QR codes</p>
                </div>
              </div>

              {/* Initialized Codes Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-800">{state.stats.initialized_codes}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Initialized</h3>
                  <p className="text-sm text-slate-500">QR codes with names set</p>
                </div>
              </div>

              {/* Used Codes Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faTicket} className="text-2xl text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-800">{state.stats.used_codes}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Used</h3>
                  <p className="text-sm text-slate-500">QR codes with activity</p>
                </div>
              </div>

              {/* Fully Used Codes Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faLock} className="text-2xl text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-800">{state.stats.max_used_codes}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Fully Used</h3>
                  <p className="text-sm text-slate-500">Max usage reached</p>
                </div>
              </div>

              {/* Unused Codes Card */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-gray-500 rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faFileText} className="text-2xl text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-800">{state.stats.unused_codes}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700 mb-2">Unused</h3>
                  <p className="text-sm text-slate-500">Available QR codes</p>
                </div>
              </div>
            </div>
          )}

          {/* QR Code Generation */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faQrcode} className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Generate QR Codes</h2>
                  <p className="text-slate-600">Create new QR codes for wedding guests</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-end gap-6">
                <div className="flex-1">
                  <label htmlFor="count" className="block text-lg font-semibold text-slate-700 mb-3">
                    Number of QR codes to generate:
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="count"
                      min="1"
                      max="1000"
                      value={generateCount}
                      onChange={(e) => setGenerateCount(parseInt(e.target.value) || 0)}
                      className="w-full px-6 py-4 text-xl border-2 border-slate-300 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      disabled={state.generating}
                      placeholder="Enter quantity..."
                    />
                  </div>
                </div>
                <button
                  onClick={handleGenerateQRCodes}
                  disabled={state.generating || generateCount < 1 || generateCount > 1000}
                  className="relative group bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:from-indigo-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    {state.generating ? (
                      <>
                        <div className="animate-spin w-6 h-6 border-3 border-white border-t-transparent rounded-full"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faWandMagicSparkles} className="text-xl" />
                        Generate QR Codes
                      </>
                    )}
                  </span>
                </button>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-200">
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faInfoCircle} className="text-indigo-500 text-xl mt-1" />
                  <div>
                    <h4 className="font-semibold text-indigo-800 mb-2">How it works:</h4>
                    <p className="text-indigo-700 leading-relaxed">
                      This will create QR codes with unique identifiers. Wedding guests can scan these codes to register their names and access the event website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="relative mb-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Data Management</h2>
                <p className="text-slate-600">View and manage QR codes and event attendees</p>
              </div>
              
              <nav className="flex justify-center">
                <div className="bg-slate-100 rounded-2xl p-2 flex gap-2">
                  <button
                    onClick={() => setState(prev => ({ ...prev, activeTab: 'codes' }))}
                    className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      state.activeTab === 'codes'
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-xl transform scale-105'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/80'
                    }`}
                  >
                    {state.activeTab === 'codes' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl blur opacity-75"></div>
                    )}
                    <span className="relative flex items-center gap-3">
                      <FontAwesomeIcon icon={faQrcode} className="text-xl" />
                      QR Codes ({state.codes.length})
                    </span>
                  </button>
                  
                  <button
                    onClick={() => setState(prev => ({ ...prev, activeTab: 'attendees' }))}
                    className={`relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                      state.activeTab === 'attendees'
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl transform scale-105'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/80'
                    }`}
                  >
                    {state.activeTab === 'attendees' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur opacity-75"></div>
                    )}
                    <span className="relative flex items-center gap-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                      Attendees ({state.attendees.length})
                    </span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Attendees List */}
          {state.activeTab === 'attendees' && (
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                <div className="p-10 border-b border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800">Event Attendees</h2>
                        <p className="text-slate-600">Wedding guests who have registered</p>
                      </div>
                    </div>
                    <button
                      onClick={loadData}
                      className="relative group bg-gradient-to-r from-slate-500 to-gray-500 text-white px-8 py-3 rounded-2xl font-bold hover:from-slate-600 hover:to-gray-600 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-gray-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        <FontAwesomeIcon icon={faSpinner} className={state.loading ? 'animate-spin' : ''} />
                        Refresh
                      </span>
                    </button>
                  </div>
                </div>

                {state.attendees.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-emerald-50 to-green-50">
                        <tr>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Guest Name
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            QR Code #
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Attendance Status
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Scans Used
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Registered At
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white/70 backdrop-blur-sm">
                        {state.attendees.map((attendee, index) => (
                          <tr key={`${attendee.qr_number}-${index}`} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-green-50/50 transition-all duration-300">
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">{attendee.name[0].toUpperCase()}</span>
                                </div>
                                <span className="text-lg font-semibold text-slate-800">
                                  {attendee.name}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-mono text-lg">
                                #{attendee.qr_number}
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-2xl ${
                                attendee.scan_count >= attendee.max_scans
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : attendee.scan_count > 0
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200'
                              }`}>
                                {attendee.scan_count >= attendee.max_scans
                                  ? '✅ Fully Attended'
                                  : attendee.scan_count > 0
                                  ? '🔄 Partially Attended'
                                  : '📝 Registered Only'
                                }
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-slate-200 rounded-full h-3">
                                  <div 
                                    className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-300" 
                                    style={{ width: `${(attendee.scan_count / attendee.max_scans) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-lg font-bold text-slate-700 min-w-max">
                                  {attendee.scan_count} / {attendee.max_scans}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg text-slate-600">
                              {formatDate(attendee.initialized_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <div className="text-6xl">👥</div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">
                      No Attendees Yet
                    </h3>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                      Wedding guests will appear here once they scan and register their QR codes. Each attendee's status and progress will be tracked automatically.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QR Codes List */}
          {state.activeTab === 'codes' && (
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                <div className="p-10 border-b border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faQrcode} className="text-2xl text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800">QR Codes Management</h2>
                        <p className="text-slate-600">Monitor and filter all generated QR codes</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <select
                        value={state.filterStatus}
                        onChange={(e) => setState(prev => ({ ...prev, filterStatus: e.target.value as any }))}
                        className="px-6 py-3 bg-white/90 border-2 border-slate-300 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-700 font-semibold"
                      >
                        <option value="all">🔍 All Codes ({state.codes.length})</option>
                        <option value="initialized">✅ Initialized ({state.codes.filter(c => c.name).length})</option>
                        <option value="uninitialized">⏳ Pending ({state.codes.filter(c => !c.name).length})</option>
                        <option value="used">🎯 Used ({state.codes.filter(c => c.scan_count > 0).length})</option>
                      </select>
                      <button
                        onClick={loadData}
                        className="relative group bg-gradient-to-r from-slate-500 to-gray-500 text-white px-8 py-3 rounded-2xl font-bold hover:from-slate-600 hover:to-gray-600 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-gray-400 rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                        <span className="relative flex items-center gap-2">
                          <FontAwesomeIcon icon={faSpinner} className={state.loading ? 'animate-spin' : ''} />
                          Refresh
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {filteredCodes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-indigo-50 to-blue-50">
                        <tr>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            QR Code #
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Guest Name
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Scans
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-8 py-6 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                            Initialized
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white/70 backdrop-blur-sm">
                        {filteredCodes.map((code) => (
                          <tr key={code.code_id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-blue-50/50 transition-all duration-300">
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-2xl flex items-center justify-center">
                                  <FontAwesomeIcon icon={faQrcode} className="text-white text-lg" />
                                </div>
                                <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl font-mono text-lg">
                                  #{code.qr_number}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              {code.name ? (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-green-400 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">{code.name[0].toUpperCase()}</span>
                                  </div>
                                  <span className="text-lg font-semibold text-slate-800">{code.name}</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-slate-300 rounded-xl flex items-center justify-center">
                                    <FontAwesomeIcon icon={faLock} className="text-slate-500" />
                                  </div>
                                  <span className="text-lg text-slate-500 italic">Not initialized</span>
                                </div>
                              )}
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-2xl border ${
                                !code.name 
                                  ? 'bg-slate-100 text-slate-800 border-slate-200' 
                                  : code.scan_count >= code.max_scans
                                  ? 'bg-red-100 text-red-800 border-red-200'
                                  : code.scan_count > 0
                                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              }`}>
                                {!code.name 
                                  ? '⏳ Pending'
                                  : code.scan_count >= code.max_scans
                                  ? '🔒 Fully Used'
                                  : code.scan_count > 0
                                  ? '🔄 Partially Used'
                                  : '✅ Ready'
                                }
                              </span>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-slate-200 rounded-full h-3 max-w-24">
                                  <div 
                                    className={`h-3 rounded-full transition-all duration-300 ${
                                      code.scan_count >= code.max_scans 
                                        ? 'bg-gradient-to-r from-red-500 to-pink-500'
                                        : code.scan_count > 0
                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                                        : 'bg-gradient-to-r from-emerald-500 to-green-500'
                                    }`}
                                    style={{ width: `${(code.scan_count / code.max_scans) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-lg font-bold text-slate-700 min-w-max">
                                  {code.scan_count} / {code.max_scans}
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg text-slate-600">
                              {formatDate(code.created_at)}
                            </td>
                            <td className="px-8 py-6 whitespace-nowrap text-lg text-slate-600">
                              {code.initialized_at ? formatDate(code.initialized_at) : (
                                <span className="text-slate-400 italic">Not yet</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-16 text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <div className="text-6xl">📝</div>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">
                      {state.filterStatus === 'all' ? 'No QR Codes Found' : `No ${state.filterStatus} QR codes`}
                    </h3>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                      {state.filterStatus === 'all' 
                        ? 'Generate some QR codes using the form above to get started with your wedding guest management.'
                        : 'Try changing the filter or generate more QR codes to see results here.'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="text-center mt-16">
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Link
                to="/"
                className="relative block bg-gradient-to-r from-violet-500 to-purple-500 text-white py-4 px-12 rounded-3xl text-xl font-bold hover:from-violet-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  <span>←</span>
                  Back to Wedding Website
                </span>
              </Link>
            </div>
            <p className="text-slate-500 mt-6 text-lg">Return to the main wedding celebration page</p>
          </div>
        </div>
      </div>
    </div>
  );
}