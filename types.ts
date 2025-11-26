export enum LockType {
  PASSWORD = 'PASSWORD',
  PAYMENT = 'PAYMENT',
}

export type ContentType = 'url' | 'image' | 'video' | 'audio' | 'text';

export type AppView = 'login' | 'create' | 'links' | 'analytics' | 'wallet' | 'unlock';

export interface LinkData {
  content: string; // URL, Base64 Data URI, or Text content
  contentType: ContentType;
  title: string;
  description: string;
  lockType: LockType;
  lockValue: string; // The password or the price
  createdAt: number;
}

export interface StoredLink extends LinkData {
  id: string;
}

export interface GeminiAnalysis {
  title: string;
  description: string;
  isSafe: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
  source: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}