export interface Book {
  id: number;
  title: string;
  author: string;
  publisherEmail: string;
  publisherPhone: string;
  releaseDate: string; // Format ISO : YYYY-MM-DD
  category: string;
  isAvailable: boolean;
  stock: number;
}

export const CATEGORIES: string[] = [
  'الأدب',
  'الشعر',
  'التاريخ',
  'الفلسفة',
  'العلوم',
  'التكنولوجيا',
  'السيرة الذاتية',
  'الفن',
  'الطبخ التونسي',
  'الرحلات'
];