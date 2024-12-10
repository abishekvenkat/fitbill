export interface FormData {
  name: string;
  distance: string;
  calories: string;
  location?: string;
  pace?: string;
  distanceUnit: 'km' | 'mi';
  paceUnit: 'min/km' | 'min/mi';
}

export interface ReceiptData extends FormData {}