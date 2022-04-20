import Link from 'next/link'
import React from 'react'
import s from './footer.module.scss'

interface Props { }

function Footer(props: Props) {

    return (
        <footer className={s.footer}>
            <div className={s.footer__top}>
                <div className="container">
                    <div className={s.top__content}>
                        <div className={s.content__brand}>
                            <img src="img/footer/logo.svg" alt=""/>
                        </div>
                        <div className={s.content__menu}>
                            <Link href={'/'}>
                                <a className={s.menu__item}>Коллекция</a>
                            </Link>

                            <Link href={'/tame'}>
                                <a className={s.menu__item}>Приручить</a>
                            </Link>

                            <Link href={'/'}>
                                <a className={s.menu__item}>Арена</a>
                            </Link>

                            <Link href={'/'}>
                                <a className={s.menu__item}>Лаборатория</a>
                            </Link>

                            <Link href={'/'}>
                                <a className={s.menu__item}>Whitepaper</a>
                            </Link>
                        </div>
                        <button className={`${s.content__play} play_btn`}>
                            Play <img src="img/navigation/btn.svg" alt=""/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={s.footer__bottom}>
                <div className="container">
                    <div className={s.bottom__content}>
                        <div className={s.content__info}>
                            <span className={s.info__text}>© Project</span>
                            <a href="#" className={s.info__link}>Пользовательское соглашение</a>
                        </div>

                        <div className={s.content__icons}>
                            <a href="#" className={s.icons__item}>
                                <img src="img/footer/telegram.svg" alt=""/>
                            </a>

                            <a href="#" className={s.icons__item}>
                                <img src="img/footer/discord.svg" alt=""/>
                            </a>

                            <a href="#" className={s.icons__item}>
                                <img src="img/footer/twitter.svg" alt=""/>
                            </a>

                            <a href="#" className={s.icons__item}>
                                <img src="img/footer/patreon.svg" alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
