import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCamera, 
  faSpinner, 
  faBan,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import type { Route } from './+types/scanner';
import QrScanner from 'qr-scanner';
import { scanQR, extractCodeFromQRData, ApiError, type ScanResult } from '../utils/api';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'QR Scanner - Wedding Guest Verification' },
    { name: 'description', content: 'Scan guest QR codes at wedding entrance' },
  ];
}

interface ScanState {
  isScanning: boolean;
  lastScanResult?: ScanResult;
  lastScannedCode?: string;
  error?: string;
}

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [scanState, setScanState] = useState<ScanState>({ 
    isScanning: false 
  });
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<Array<{
    timestamp: Date;
    result: ScanResult;
    codeId: string;
  }>>([]);

  // Initialize QR Scanner
  useEffect(() => {
    if (!videoRef.current) return;

    const initScanner = async () => {
      try {
        const scanner = new QrScanner(
          videoRef.current!,
          (result) => handleScan(result.data),
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        qrScannerRef.current = scanner;
      } catch (error) {
        setCameraError('Failed to initialize camera scanner');
        console.error('QR Scanner initialization error:', error);
      }
    };

    initScanner();

    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
    };
  }, []);

  const handleScan = async (data: string) => {
    if (scanState.isScanning) return; // Prevent multiple concurrent scans

    const codeId = extractCodeFromQRData(data);
    if (!codeId) {
      setScanState({
        isScanning: false,
        error: 'Invalid QR code format'
      });
      return;
    }

    // Skip if we just scanned this code
    if (scanState.lastScannedCode === codeId) {
      return;
    }

    setScanState({ isScanning: true });

    try {
      const result = await scanQR(codeId);
      
      setScanState({
        isScanning: false,
        lastScanResult: result,
        lastScannedCode: codeId,
        error: undefined
      });

      // Add to scan history
      setScanHistory(prev => [
        {
          timestamp: new Date(),
          result,
          codeId
        },
        ...prev.slice(0, 9) // Keep last 10 scans
      ]);

      // Auto-clear result after 5 seconds
      setTimeout(() => {
        setScanState(prev => ({
          ...prev,
          lastScanResult: undefined,
          lastScannedCode: undefined
        }));
      }, 5000);

    } catch (error) {
      setScanState({
        isScanning: false,
        error: error instanceof ApiError ? error.message : 'Failed to verify QR code',
        lastScannedCode: codeId
      });
    }
  };

  const startScanner = async () => {
    if (!qrScannerRef.current) return;

    try {
      await qrScannerRef.current.start();
      setCameraError(null);
    } catch (error) {
      setCameraError('Failed to access camera. Please allow camera permissions.');
      console.error('Camera start error:', error);
    }
  };

  const stopScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
  };

  const clearResults = () => {
    setScanState({ isScanning: false });
    setScanHistory([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl mb-8 shadow-xl">
              <FontAwesomeIcon icon={faCamera} className="text-5xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Wedding Entry Scanner
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Professional QR code scanning for seamless guest check-in
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Scanner Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <FontAwesomeIcon icon={faCamera} className="text-xl text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Live Scanner
                  </h2>
                </div>
                
                {/* Video Preview */}
                <div className="relative mb-8">
                  <div className="rounded-3xl overflow-hidden border-4 border-gradient-to-r from-blue-200 to-cyan-200 shadow-xl">
                    <video
                      ref={videoRef}
                      className="w-full h-80 bg-slate-100 object-cover"
                      style={{ display: cameraError ? 'none' : 'block' }}
                    />
                  </div>
                  
                  {cameraError && (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <FontAwesomeIcon icon={faBan} className="text-3xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Camera Access Required</h3>
                        <p className="text-slate-600 mb-6 max-w-xs mx-auto leading-relaxed">{cameraError}</p>
                        <button
                          onClick={startScanner}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-2xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          📷 Retry Camera
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {scanState.isScanning && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                      <div className="text-white text-center bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <FontAwesomeIcon icon={faSpinner} className="text-2xl text-white animate-spin" />
                        </div>
                        <p className="text-lg font-semibold">🔍 Verifying QR Code...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Scanner Controls */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={startScanner}
                    disabled={scanState.isScanning}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-2xl font-bold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
                  >
                    ▶️ Start Scanner
                  </button>
                  <button
                    onClick={stopScanner}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-2xl font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    ⏹️ Stop Scanner
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <span className="text-xl">📊</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Scan Results
                    </h2>
                  </div>
                  <button
                    onClick={clearResults}
                    className="bg-gradient-to-r from-slate-500 to-slate-600 text-white px-4 py-2 rounded-xl font-medium hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🗑️ Clear
                  </button>
                </div>

                {/* Current Result */}
                {scanState.lastScanResult && (
                  <div className={`p-6 rounded-lg mb-6 ${
                    scanState.lastScanResult.status === 'valid' 
                      ? 'bg-green-50 border-2 border-green-200' 
                      : 'bg-red-50 border-2 border-red-200'
                  }`}>
                    {scanState.lastScanResult.status === 'valid' ? (
                      <div className="text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h3 className="text-2xl font-bold text-green-800 mb-2">
                          Welcome!
                        </h3>
                        <p className="text-xl text-green-700 mb-4">
                          {scanState.lastScanResult.name}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-semibold">QR #:</span> {scanState.lastScanResult.qr_number}
                          </div>
                          <div>
                            <span className="font-semibold">Scans Left:</span> {scanState.lastScanResult.scans_left}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h3 className="text-2xl font-bold text-red-800 mb-2">
                          Entry Denied
                        </h3>
                        <p className="text-lg text-red-700">
                          {scanState.lastScanResult.reason}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {scanState.error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚠️</span>
                      <div>
                        <h4 className="font-semibold text-red-800">Error</h4>
                        <p className="text-red-700">{scanState.error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scan History */}
                {scanHistory.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-wedding-700 mb-3">Recent Scans</h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {scanHistory.map((scan, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg text-sm ${
                            scan.result.status === 'valid'
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-red-50 border border-red-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className={`font-semibold ${
                                scan.result.status === 'valid' ? 'text-green-800' : 'text-red-800'
                              }`}>
                                {scan.result.status === 'valid' ? scan.result.name : 'DENIED'}
                              </span>
                              <p className={`text-xs ${
                                scan.result.status === 'valid' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {scan.result.status === 'valid' 
                                  ? `QR #${scan.result.qr_number} • ${scan.result.scans_left} scans left`
                                  : scan.result.reason
                                }
                              </p>
                            </div>
                            <span className="text-xs text-gray-500">
                              {formatTime(scan.timestamp)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {scanHistory.length === 0 && !scanState.lastScanResult && !scanState.error && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">👆</div>
                    <p>Start scanning QR codes to see results here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-block bg-wedding-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-wedding-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}