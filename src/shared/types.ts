export type Ticket = {
    id: number
    name: string
    price: number
    time: number
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

export type Question = {
    question: string
    answer: string
}

export type MyDocument = {
    title: string
    link: string
}

export type TicketsTypeData = {
    type: string
    description: string
    tickets: Array<Ticket>
}

export type TicketsSortedByTypeData = Array<TicketsTypeData>
