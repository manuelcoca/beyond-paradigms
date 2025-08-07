export interface CustomerInfo {
  name: string;
  email: string;
  company?: string;
  discountCode?: string;
}

export interface ProductInfo {
  productId: string;
  quantity: number;
  price: number;
}

export interface CheckoutData {
  customer: CustomerInfo;
  products: ProductInfo[];
  total: number;
}

export enum CheckoutType {
  RESELLER = "reseller",
  DISTRIBUTOR = "distributor",
}

export interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  discountCode?: string;
}
