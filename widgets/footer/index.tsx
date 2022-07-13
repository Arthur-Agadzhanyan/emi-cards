import Link from 'next/link'
import React,{memo} from 'react'


import {useRouter} from 'next/router'
import { loginReducer } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import emiLogo from "@/public/img/footer/logo.svg"
import playIcon from '@/public/img/navigation/btn.svg'

import telegramIcon from '@/public/img/footer/telegram.svg'
import discordIcon from '@/public/img/footer/discord.svg'
import twitterIcon from '@/public/img/footer/twitter.svg'
import patreonIcon from '@/public/img/footer/patreon.svg'
import Button from '@/shared/button'

import s from './footer.module.scss'

interface Props { }

function Footer(props: Props) {
    const user = useTypedSelector(state => state.user)
    const dispatch = useDispatch()
    const router = useRouter()

    const login = async ()=>{
        if(!user.userData.account){
            dispatch(loginReducer() as any)
        }

        router.push('/tame')
    }

    const checkPath = (path: string)=>{
        return router.pathname === path
    }
    return (
        <footer className={s.footer}>
            <div className={s.footer__top}>
                <div className="container">
                    <div className={s.top__content}>
                        <div className={s.content__brand}>
                            <img src={emiLogo.src} alt=""/>
                        </div>
                        <div className={s.content__menu}>
                            <Link href={'/collection'}>
                                <a className={s.menu__item} title={"Collection"}>Collection</a>
                            </Link>
                            <Link href={'/tame'}>
                                <a className={s.menu__item} title={"Tame"}>Tame</a>
                            </Link>
                            <Link href={'/arena'}>
                                <a className={s.menu__item} title={"Arena"}>Arena</a>
                            </Link>
                            <Link href={'/lab'}>
                                <a className={s.menu__item} title={"Laboratory"}>Laboratory</a>
                            </Link>
                            <Link href={'/'}>
                                <a className={s.menu__item} title={"Whitepaper"}>Whitepaper</a>
                            </Link>
                        </div>
                        <Button className={`${s.content__play}`} withImg onClick={login}>
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
                            <a href="#" className={s.info__link}>User Agreement</a>
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

export default memo(Footer)
