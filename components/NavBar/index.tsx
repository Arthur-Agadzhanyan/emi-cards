import React, { MouseEvent, useContext } from 'react'
import s from './navbar.module.scss'
import Link from "next/link"
import { useState } from 'react'
import { login } from '@/lib/login';
import { loginReducer } from '@/store/userSlice';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import emiLogo from "@/public/img/navigation/1.svg"
import playArrow from '@/public/img/navigation/btn.svg'
import Button from '../Button';

interface Props { }

function NavBar(props: Props) {
    const [mbBarOpened,setMbBarOpened] = useState(false);
    const user = useTypedSelector(state => state.user)
    const dispatch = useDispatch()

    const toggleBar = (e: MouseEvent<HTMLButtonElement>)=>{
        e.currentTarget.classList.toggle(s.burger_active)

        setMbBarOpened(!mbBarOpened)
    }

    const login = async ()=>{
        dispatch(loginReducer() as any)
    }

    return (
        <>
            <div className={s.navigation}>
                <div className="container">
                    <div className={s.navigation__content}>
                        <div className={s.content__info}>
                            <div className={s.info__brand}>
                                <img src={emiLogo.src} alt=""/>
                            </div>

                            <div className={s.info__menu}>
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
                        </div>

                        <div className={s.content__social}>
                            <div className={s.social__links}>
                                <a href="#" className={s.links__item}>

                                    <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36ZM14.7 26.25C15.1378 26.25 15.3378 26.0552 15.5797 25.8198L15.6 25.8L17.762 23.6977L22.26 27.0209C23.0878 27.4776 23.6852 27.2411 23.8914 26.2523L26.8442 12.3379C27.1465 11.1258 26.3821 10.5761 25.5902 10.9356L8.25174 17.6213C7.06822 18.096 7.07512 18.7563 8.03601 19.0505L12.4855 20.4392L22.7864 13.9405C23.2727 13.6456 23.719 13.8041 23.3527 14.1293L15.0064 21.6611L15.0063 21.6611L15.0063 21.6612L15.006 21.6615L15.0063 21.6617L14.7 26.25Z"
                                            fill="#232323" />
                                    </svg>

                                </a>

                                <a href="#" className={s.links__item}>
                                    <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_16_174)">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M35.9998 17.9997C35.9998 8.05858 27.9413 0 18 0C8.05873 0 0 8.05858 0 17.9997C0 27.9398 8.05873 36 18 36.0002C27.941 36.0002 35.9998 27.9398 35.9998 17.9997ZM20.9565 10.231C23.5868 10.4316 25.8144 12.1742 25.8144 12.1742C25.8144 12.1742 28.3008 15.781 28.729 22.8616C26.2202 25.7538 22.4138 25.7764 22.4138 25.7764L21.6179 24.7153C22.9682 24.2454 24.4945 23.405 25.8144 21.8902C24.2402 23.0807 21.8674 24.3191 18.0416 24.3191C14.2159 24.3191 11.8412 23.0791 10.2689 21.8902C11.5872 23.405 13.1135 24.2454 14.4653 24.7153L13.6694 25.7764C13.6694 25.7764 9.86148 25.7538 7.35425 22.8616C7.78083 15.781 10.2691 12.1742 10.2691 12.1742C10.2691 12.1742 12.3655 10.4923 15.127 10.231L15.3635 10.7048C13.1917 11.1955 11.8926 12.1214 10.7548 13.1458C12.7186 12.1429 14.6602 11.2026 18.0416 11.2026C21.423 11.2026 23.3631 12.1429 25.3287 13.1458C24.1877 12.1214 23.0979 11.2872 20.7184 10.7048L20.9565 10.231ZM13.1838 18.9749C13.1838 20.0488 13.9443 20.9181 14.8839 20.9181C15.8236 20.9181 16.5843 20.049 16.5843 18.9749C16.5843 17.902 15.8236 17.032 14.8839 17.032C13.9445 17.032 13.1838 17.902 13.1838 18.9749ZM19.499 18.9749C19.499 20.0488 20.2597 20.9181 21.1993 20.9181C22.1372 20.9181 22.8995 20.049 22.8995 18.9749C22.8995 17.902 22.1388 17.032 21.1993 17.032C20.2597 17.032 19.499 17.902 19.499 18.9749Z"
                                                fill="#232323" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_16_174">
                                                <rect width="36" height="36" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>

                                <a href="#" className={s.links__item}>
                                    <svg className={s.item__image}  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0ZM17.4987 15.2535L17.4609 14.6306C17.3476 13.0163 18.3422 11.5418 19.9161 10.9698C20.4952 10.7665 21.4773 10.741 22.1194 10.919C22.3712 10.9953 22.8497 11.2495 23.1896 11.4783L23.8066 11.8978L24.4865 11.6817C24.8642 11.5673 25.3678 11.3766 25.5944 11.2495C25.8085 11.1351 25.9973 11.0715 25.9973 11.1097C25.9973 11.3258 25.5315 12.063 25.1412 12.4698C24.6124 13.0417 24.7635 13.0926 25.8337 12.7113C26.4758 12.4952 26.4884 12.4952 26.3625 12.7367C26.2869 12.8638 25.8966 13.3087 25.4811 13.7154C24.7761 14.4145 24.7383 14.4908 24.7383 15.0755C24.7383 15.978 24.3102 17.8592 23.8821 18.8888C23.0889 20.8209 21.3892 22.8165 19.6894 23.8207C17.2972 25.2316 14.1118 25.5875 11.43 24.7613C10.5361 24.4817 9 23.7699 9 23.6427C9 23.6046 9.46585 23.5538 10.0324 23.5411C11.216 23.5156 12.3995 23.1852 13.4067 22.6004L14.0866 22.1937L13.306 21.9268C12.198 21.5454 11.2034 20.6684 10.9515 19.8421C10.876 19.5752 10.9012 19.5625 11.6063 19.5625L12.3365 19.5498L11.7196 19.2574C10.9893 18.8888 10.322 18.266 9.99466 17.6304C9.75544 17.1728 9.45326 16.0161 9.5414 15.9272C9.56658 15.889 9.83098 15.9653 10.1332 16.067C11.0019 16.3847 11.1152 16.3085 10.6116 15.7746C9.6673 14.8086 9.37772 13.3722 9.83098 12.0122L10.045 11.402L10.876 12.2282C12.5757 13.8934 14.5776 14.8848 16.8691 15.1772L17.4987 15.2535Z" fill="#232323" />
                                    </svg>
                                </a>

                                <a href="#" className={s.links__item}>
                                    <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M18 0C27.9412 0 36 8.05879 36 18C36 27.9412 27.9412 36 18 36C8.05879 36 0 27.9412 0 18C0 8.05879 8.05879 0 18 0ZM12.7127 11.2065C16.4649 11.2065 19.5062 14.2485 19.5062 18C19.5062 21.7515 16.4649 24.7935 12.7127 24.7935C8.96125 24.7935 5.91992 21.7515 5.91992 18C5.91992 14.2485 8.96125 11.2065 12.7127 11.2065ZM23.5825 11.7433C25.4811 11.7433 27.0197 14.5444 27.0197 18C27.0197 21.4556 25.4811 24.2567 23.5825 24.2567C21.6838 24.2567 20.1452 21.4556 20.1452 18C20.1452 14.5444 21.6838 11.7433 23.5825 11.7433ZM28.8831 12.2795C29.544 12.2795 30.0801 14.8403 30.0801 18C30.0801 21.1597 29.544 23.7205 28.8831 23.7205C28.2216 23.7205 27.6855 21.1597 27.6855 18C27.6855 14.8403 28.2216 12.2795 28.8831 12.2795Z" fill="#232323" />
                                    </svg>
                                </a>
                            </div>

                            {user.loaded && user.userData.account 
                            ? (
                                <h4>{user.userData.account}</h4>
                            )
                            : (
                                <Button onClick={login} className={` ${s.social__btn}`} withImg>
                                    Play
                                </Button>
                            )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.mb_navigation}>
                <div className="container">
                    <div className={s.mb_navigation__content}>
                        <img className={s.content__logo} src={emiLogo.src} alt=""/>

                            <button className={`${s.content__btn} ${s.burger}`} onClick={toggleBar}>
                                <span className={`${s.burger__line} ${s.burger__line_first}`}></span>
                                <span className={`${s.burger__line} ${s.burger__line_second}`}></span>
                                <span className={`${s.burger__line} ${s.burger__line_third}`}></span>
                                <span className={`${s.burger__line} ${s.burger__line_fourth}`}></span>
                            </button>
                    </div>
                </div>
            </div>

            <div className={`${s.mobile_bar} ${mbBarOpened ? "" : s.mb_bar_closed}`}>
                <ul className={s.navbar__list}>
                    <Link href={'/'}>
                        <a className={s.list__link}>
                            <li className={s.list__item}>Коллекция</li>
                        </a>
                    </Link>
                   
                    <Link href={'/tame'}>
                        <a className={s.list__link}>
                            <li className={s.list__item}>Приручить</li>
                        </a>
                    </Link>
                    
                    <Link href={'/'}>
                        <a className={s.list__link}>
                            <li className={s.list__item}>Арена</li>
                        </a>
                    </Link>
                    
                    <Link href={'/'}>
                        <a className={s.list__link}>
                            <li className={s.list__item}>Лаборатория</li>
                        </a>
                    </Link>
                    
                    <Link href={'/'}>
                        <a className={s.list__link}>
                            <li className={s.list__item}>Whitepaper</li>
                        </a>
                    </Link>
                </ul>

                <button className={`play_btn ${s.bar__play}`}>
                    Play <img src={playArrow.src} alt=""/>
                </button>

                <div className={s.bar__social}>
                    <a href="#" className={s.links__item}>
                        <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36ZM14.7 26.25C15.1378 26.25 15.3378 26.0552 15.5797 25.8198L15.6 25.8L17.762 23.6977L22.26 27.0209C23.0878 27.4776 23.6852 27.2411 23.8914 26.2523L26.8442 12.3379C27.1465 11.1258 26.3821 10.5761 25.5902 10.9356L8.25174 17.6213C7.06822 18.096 7.07512 18.7563 8.03601 19.0505L12.4855 20.4392L22.7864 13.9405C23.2727 13.6456 23.719 13.8041 23.3527 14.1293L15.0064 21.6611L15.0063 21.6611L15.0063 21.6612L15.006 21.6615L15.0063 21.6617L14.7 26.25Z"
                                fill="#232323" />
                        </svg>
                    </a>

                    <a href="#" className={s.links__item}>
                        <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_16_174)">
                                <path fillRule="evenodd" clipRule="evenodd"
                                    d="M35.9998 17.9997C35.9998 8.05858 27.9413 0 18 0C8.05873 0 0 8.05858 0 17.9997C0 27.9398 8.05873 36 18 36.0002C27.941 36.0002 35.9998 27.9398 35.9998 17.9997ZM20.9565 10.231C23.5868 10.4316 25.8144 12.1742 25.8144 12.1742C25.8144 12.1742 28.3008 15.781 28.729 22.8616C26.2202 25.7538 22.4138 25.7764 22.4138 25.7764L21.6179 24.7153C22.9682 24.2454 24.4945 23.405 25.8144 21.8902C24.2402 23.0807 21.8674 24.3191 18.0416 24.3191C14.2159 24.3191 11.8412 23.0791 10.2689 21.8902C11.5872 23.405 13.1135 24.2454 14.4653 24.7153L13.6694 25.7764C13.6694 25.7764 9.86148 25.7538 7.35425 22.8616C7.78083 15.781 10.2691 12.1742 10.2691 12.1742C10.2691 12.1742 12.3655 10.4923 15.127 10.231L15.3635 10.7048C13.1917 11.1955 11.8926 12.1214 10.7548 13.1458C12.7186 12.1429 14.6602 11.2026 18.0416 11.2026C21.423 11.2026 23.3631 12.1429 25.3287 13.1458C24.1877 12.1214 23.0979 11.2872 20.7184 10.7048L20.9565 10.231ZM13.1838 18.9749C13.1838 20.0488 13.9443 20.9181 14.8839 20.9181C15.8236 20.9181 16.5843 20.049 16.5843 18.9749C16.5843 17.902 15.8236 17.032 14.8839 17.032C13.9445 17.032 13.1838 17.902 13.1838 18.9749ZM19.499 18.9749C19.499 20.0488 20.2597 20.9181 21.1993 20.9181C22.1372 20.9181 22.8995 20.049 22.8995 18.9749C22.8995 17.902 22.1388 17.032 21.1993 17.032C20.2597 17.032 19.499 17.902 19.499 18.9749Z"
                                    fill="#232323" />
                            </g>
                            <defs>
                                <clipPath id="clip0_16_174">
                                    <rect width="36" height="36" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>

                    <a href="#" className={s.links__item}>
                        <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36C27.9411 36 36 27.9411 36 18C36 8.05888 27.9411 0 18 0ZM17.4987 15.2535L17.4609 14.6306C17.3476 13.0163 18.3422 11.5418 19.9161 10.9698C20.4952 10.7665 21.4773 10.741 22.1194 10.919C22.3712 10.9953 22.8497 11.2495 23.1896 11.4783L23.8066 11.8978L24.4865 11.6817C24.8642 11.5673 25.3678 11.3766 25.5944 11.2495C25.8085 11.1351 25.9973 11.0715 25.9973 11.1097C25.9973 11.3258 25.5315 12.063 25.1412 12.4698C24.6124 13.0417 24.7635 13.0926 25.8337 12.7113C26.4758 12.4952 26.4884 12.4952 26.3625 12.7367C26.2869 12.8638 25.8966 13.3087 25.4811 13.7154C24.7761 14.4145 24.7383 14.4908 24.7383 15.0755C24.7383 15.978 24.3102 17.8592 23.8821 18.8888C23.0889 20.8209 21.3892 22.8165 19.6894 23.8207C17.2972 25.2316 14.1118 25.5875 11.43 24.7613C10.5361 24.4817 9 23.7699 9 23.6427C9 23.6046 9.46585 23.5538 10.0324 23.5411C11.216 23.5156 12.3995 23.1852 13.4067 22.6004L14.0866 22.1937L13.306 21.9268C12.198 21.5454 11.2034 20.6684 10.9515 19.8421C10.876 19.5752 10.9012 19.5625 11.6063 19.5625L12.3365 19.5498L11.7196 19.2574C10.9893 18.8888 10.322 18.266 9.99466 17.6304C9.75544 17.1728 9.45326 16.0161 9.5414 15.9272C9.56658 15.889 9.83098 15.9653 10.1332 16.067C11.0019 16.3847 11.1152 16.3085 10.6116 15.7746C9.6673 14.8086 9.37772 13.3722 9.83098 12.0122L10.045 11.402L10.876 12.2282C12.5757 13.8934 14.5776 14.8848 16.8691 15.1772L17.4987 15.2535Z" fill="#232323" />
                        </svg>
                    </a>

                    <a href="#" className={s.links__item}>
                        <svg className={s.item__image} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M18 0C27.9412 0 36 8.05879 36 18C36 27.9412 27.9412 36 18 36C8.05879 36 0 27.9412 0 18C0 8.05879 8.05879 0 18 0ZM12.7127 11.2065C16.4649 11.2065 19.5062 14.2485 19.5062 18C19.5062 21.7515 16.4649 24.7935 12.7127 24.7935C8.96125 24.7935 5.91992 21.7515 5.91992 18C5.91992 14.2485 8.96125 11.2065 12.7127 11.2065ZM23.5825 11.7433C25.4811 11.7433 27.0197 14.5444 27.0197 18C27.0197 21.4556 25.4811 24.2567 23.5825 24.2567C21.6838 24.2567 20.1452 21.4556 20.1452 18C20.1452 14.5444 21.6838 11.7433 23.5825 11.7433ZM28.8831 12.2795C29.544 12.2795 30.0801 14.8403 30.0801 18C30.0801 21.1597 29.544 23.7205 28.8831 23.7205C28.2216 23.7205 27.6855 21.1597 27.6855 18C27.6855 14.8403 28.2216 12.2795 28.8831 12.2795Z" fill="#232323" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )
}

export default NavBar
