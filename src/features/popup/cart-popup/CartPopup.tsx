import React from 'react';
import TicketsPopup from "features/popup/cart-popup/tickets-popup/TicketsPopup";
import FormPopup from "features/popup/cart-popup/form-popup/FormPopup";

type Props = {
    page?: number
    pageUp?: () => void
    pageDown?: () => void
    onClose?: () => void
    createAlert: (status: string) => void
}
const CartPopup = ({pageUp, page, createAlert, onClose}: Props) => {
    return (
        <div>
            {page === 0 ?
                <TicketsPopup pageUp={pageUp}/> :
                <FormPopup onClose={onClose} createAlert={createAlert}/>
            }
        </div>
    );
};

export default CartPopup;
