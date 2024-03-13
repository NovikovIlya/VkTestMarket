export interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    count?:number;
}

export interface PropsCard extends Product {
  name?:string;
  image?:any;
}
export type PropsCardPartial = Partial<PropsCard>;

export type InitialType = {
  products: Product[],
  totalPrice: number,
  isLoad: boolean,
  isError:boolean,
}