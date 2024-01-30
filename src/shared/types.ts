export type Ticket = {
    id: number
    name: string
    price: number
    time: number
    type: string
}

export type CartItem = {
    ticket: Ticket
    count: number
}

export type StateOfCart = {
    cart: Array<CartItem>
    sale: number
    preliminaryPrice: number
    totalPrice: number
}