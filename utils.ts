import { LinkData } from './types';

// Simple base64 encoding/decoding for the URL hash
// In a production app, you might use encryption or a database ID.
export const encodeLinkData = (data: LinkData): string => {
  const json = JSON.stringify(data);
  return btoa(encodeURIComponent(json));
};

export const decodeLinkData = (encoded: string): LinkData => {
  const json = decodeURIComponent(atob(encoded));
  return JSON.parse(json);
};

export const formatCurrency = (amount: string) => {
  const num = parseFloat(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(isNaN(num) ? 0 : num);
};