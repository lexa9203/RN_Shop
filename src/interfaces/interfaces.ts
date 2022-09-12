export interface IProduct {
  id: string,
  title: string,
  price: number,
  imgUrl: string,
  favorite: boolean,
}

export interface IOrder {
  id: number, 
  cartProducts: ICartProducts[]
}

export interface ICartProducts {
  id: number, 
  product: IProduct
}
