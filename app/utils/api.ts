const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://double-h-affairs-backend.onrender.com';

interface ApiResponse<T = any> {
  success?: boolean;
  error?: string;
  message?: string;
  data?: T;
}

interface QRCode {
  code_id: string;
  qr_number: number;
  name?: string;
  scan_count: number;
  max_scans: number;
  created_at: string;
  initialized_at?: string;
}

interface ScanResult {
  status: 'valid' | 'invalid';
  name?: string;
  scans_left?: number;
  qr_number?: number;
  reason?: string;
}

interface Attendee {
  name: string;
  qr_number: number;
  initialized_at: string;
  scan_count: number;
  max_scans: number;
}

interface Stats {
  total_codes: number;
  initialized_codes: number;
  used_codes: number;
  max_used_codes: number;
  unused_codes: number;
}

class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data.error || 'API request failed', response.status);
  }

  return data;
}

// QR Code Management
export async function generateQRCodes(count: number = 200): Promise<{ success: boolean; message: string; codes: any[] }> {
  return apiRequest('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ count }),
  });
}

export async function getAllCodes(): Promise<{ success: boolean; codes: QRCode[]; total: number }> {
  return apiRequest('/api/codes');
}

export async function getCodeInfo(codeId: string): Promise<{ success: boolean; code: QRCode }> {
  return apiRequest(`/api/code/${codeId}`);
}

export async function getStats(): Promise<{ success: boolean; stats: Stats }> {
  return apiRequest('/api/stats');
}

export async function getAttendees(): Promise<{ success: boolean; attendees: Attendee[]; total: number }> {
  return apiRequest('/api/attendees');
}

// Guest Initialization
export async function initializeQR(codeId: string, name: string): Promise<{ success: boolean; message: string; name: string }> {
  return apiRequest('/api/init', {
    method: 'POST',
    body: JSON.stringify({ code_id: codeId, name }),
  });
}

// QR Scanning
export async function scanQR(codeId: string): Promise<ScanResult> {
  return apiRequest('/api/scan', {
    method: 'POST',
    body: JSON.stringify({ code_id: codeId }),
  });
}

// Health Check
export async function healthCheck(): Promise<{ status: string; database: string; timestamp: string }> {
  return apiRequest('/health');
}

// Utility function to extract code from URL
export function extractCodeFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('code');
  } catch {
    return null;
  }
}

// Utility function to extract code from QR data
export function extractCodeFromQRData(data: string): string | null {
  // Try to extract from URL first
  const codeFromUrl = extractCodeFromUrl(data);
  if (codeFromUrl) return codeFromUrl;
  
  // If it's just a UUID, return it directly
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(data)) return data;
  
  return null;
}

export { ApiError };
export type { QRCode, ScanResult, Stats, Attendee };
