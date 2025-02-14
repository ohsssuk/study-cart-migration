export interface OptionType {
  optionId: number;
  optionName: string;
  price: number;
  min: number;
  max: number;
  current: number;
}

export interface CartItemType {
  productId: number;
  productName: string;
  productThumbnail: string;
  productStatus: number;
  options: OptionType[];
}
