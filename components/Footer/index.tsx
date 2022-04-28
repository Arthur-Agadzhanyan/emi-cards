import Link from 'next/link'
import React from 'react'
import s from './footer.module.scss'

import emiLogo from "@/public/img/footer/logo.svg"
import playIcon from '@/public/img/navigation/btn.svg'

import telegramIcon from '@/public/img/footer/telegram.svg'
import discordIcon from '@/public/img/footer/discord.svg'
import twitterIcon from '@/public/img/footer/twitter.svg'
import patreonIcon from '@/public/img/footer/patreon.svg'
import Button from '../Button'

interface Props { }

function Footer(props: Props) {

    return (
        <footer className={s.footer}>
            <div className={s.footer__top}>
                <div className="container">
                    <div className={s.top__content}>
                        <div className={s.content__brand}>
                            <img src={emiLogo.src} alt=""/>
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
                        <Button className={`${s.content__play}`} withImg>
                            Play
                        </Button>
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
                                <img src={telegramIcon.src} alt=""/>
                            </a>

                            <a href="#" className={s.icons__item}>
                                <img src={discordIcon.src} alt=""/>
                            </a>

                            <a href="#" className={s.icons__item}>
                                <img src={twitterIcon.src} alt=""/>
                            </a>

                            <a href="#" className={s.icons__item}>
                                <img src={patreonIcon.src} alt=""/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
