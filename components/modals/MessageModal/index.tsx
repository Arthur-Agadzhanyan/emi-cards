import React from 'react'
import ReactModal from 'react-modal'
import s from './message-modal.module.scss'

interface Props {
    isOpen: boolean,
    message: string,
    closeModal: () => void
}

function MessageModal({ isOpen, message, closeModal }: Props) {
    return (
        <ReactModal
            isOpen={isOpen}
            ariaHideApp={false}
            overlayClassName={s.modal__overlay}
            className={s.modal}
            onRequestClose={closeModal}
        >
            <div className={s.modal__content}>
                <div className={`${s.modal__message}`}>
                    <div className={`${s.message__info} ${s[`item__info-legendary`]}`}>
                        <div className={s.info__bg}>
                            {message}
                            {/* .split("message:")[1] */}
                        </div>
                    </div>
                </div>

                <button className={s.modal__back} onClick={closeModal}>go back</button>
            </div>
        </ReactModal>
    )
}

export default MessageModal
