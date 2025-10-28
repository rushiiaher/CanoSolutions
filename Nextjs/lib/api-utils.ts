import { InquiryForm, EmailSubscription } from './models';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'API request failed');
  }

  return response.json();
}

export class ApiService {
  static async createInquiry(data: Omit<InquiryForm, '_id' | 'createdAt' | 'status'>) {
    return apiFetch('/inquiry', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getInquiries() {
    return apiFetch('/inquiry');
  }

  static async createSubscription(email: string) {
    return apiFetch('/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async getSubscriptions() {
    return apiFetch('/subscribe');
  }

  static async getHealth() {
    return apiFetch('/health');
  }
}
