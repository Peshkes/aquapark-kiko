export type InstitutionTicket = {
    institutionTicketId: string
    price: number
    time: number
}

export type CartItem = {
    ticket: InstitutionTicket
    count: number
    type: string
}

export type AddToCartRequest = {
    cartItem: CartItem
    institutionId: string
}

export type StateOfCart = {
    institutionId: string | null
    cart: Array<CartItem>
    sale: number
    preliminaryPrice: number
    totalPrice: number
}

export type TicketsTypeData = {
    type: string
    description: string
    institutionTickets: Array<InstitutionTicket>
}

export type TicketsOfInstitution = {
    institutionId: string
    tickets: Array<TicketsTypeData>
}

export type Institution = {
    institutionId: string,
    ru_name: string,
    en_name: string,
    address: string,
    link: string,
}

export type SaleRequest = {
    couponCode: string
    institutionId: string
}

export type ReduxStatus = "loading" | "succeeded" | "failed" | "sleeping";

export type User = {
    accessToken: string
    refreshToken: string
} | null;

export type LoginData = {
    username: string
    password: string
}

export type TicketForRequest = {
    institutionTicketId: string
    count: number
}

export type CreateOrderRequest = {
    tickets: Array<TicketForRequest>
    sum: number
    name: string
    email: string
}
