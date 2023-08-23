import { v4 as uuidv4 } from 'uuid';

export function numberCurrencyID(value: any) {
  return `Rp. ${(parseFloat(value) || 0).toLocaleString('id-ID')}`;
}
export function formatThousand(value: any) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID')}`;
}
export function formatPercentage(value: any) {
  return `${(parseFloat(value) || 0).toLocaleString('id-ID', {
    minimumFractionDigits: 2,
  })}`;
}
export function getUUID() {
  return uuidv4();
}

export function formatCash(value: number) {
  if (value < 1e3) return value;
  if (value >= 1e3 && value < 1e6) return +(value / 1e3).toFixed(1) + "K";
  if (value >= 1e6 && value < 1e9) return +(value / 1e6).toFixed(1) + "M";
  if (value >= 1e9 && value < 1e12) return +(value / 1e9).toFixed(1) + "B";
  if (value >= 1e12) return +(value / 1e12).toFixed(1) + "T";
}

export const decimalNumberFormat = (number: any, afterComma: number = 1) => {
  return number ? number.toFixed(afterComma) : 0;
};


