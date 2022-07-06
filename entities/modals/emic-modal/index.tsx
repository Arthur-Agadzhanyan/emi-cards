import React from 'react';
import s from "@/entities/modals/emic-modal/emic-modal.module.scss";
import ReactModal from "react-modal";
import {Asset} from "@/interfaces/assets";
import {NftCard} from "@/entities/cards";

interface Props {
    isOpen: boolean,
    card: Asset,
    closeModal: () => void
}

export function EmicModal({ isOpen, card, closeModal }: Props) {

    const cardClasses = {
        info: s.card__info,
        attribute: s.card__attr,
        image: s.card__image
    }

    return (
        <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            overlayClassName={s.modal__overlay}
            className={s.modal}
            onRequestClose={closeModal}
        >
            <div className={s.modal__content}>
                <div className={`${s.modal__emic}`}>
                    <div className={`${s.emic__info}`}>
                            { card.data && <NftCard rarity={card.data.rarity} card={card} isEmic={true} className={s.modal_card} itemClasses={cardClasses}/>}
                    </div>
                </div>
            </div>
        </ReactModal>
    );
}