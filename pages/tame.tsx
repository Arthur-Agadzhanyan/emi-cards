import React, { useCallback, useContext, useEffect } from 'react'
import s from '@/styles/tame-page.module.scss'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '@/HOC/auth'
import TameSelect from '@/components/Tame/TameSelect'
import PoppupFilter from '@/components/Tame/PoppupFilter'

import filterCategoryIcon from '@/public/img/filter/1.png'

import filterBtnIcon from '@/public/img/icons/filters.svg'

import tameRightYellow from '@/public/img/tame/mb/right-yellow.svg'
import tameLeftYellow from '@/public/img/tame/mb/left-yellow.svg'

import mobileBigStar from "@/public/img/tame/mb/big-star.svg"
import mobileSmallStar from '@/public/img/tame/mb/small-star.svg'

import exchangeArrow from '@/public/img/icons/exchange-arrows.svg'

import cardImage from '@/public/img/tame/1.png'
import exchangePinkArrows from '@/public/img/icons/exchange-pink-arrows.svg'
import yellowArea from "@/public/img/tame/yellow.svg"
import yellowBigStar from "@/public/img/tame/yellow-big-star.svg"
import yellowSmallStar from "@/public/img/tame/yellow-small-star.svg"

interface Props { }

interface SortingParam {
    id: number,
    name: string
}

function Tame(props: Props) {
    const [filterPoppupOpened, setFilterPoppupOpened] = useState(false)

    const sortParams: SortingParam[] = [
        { id: 1, name: "Listing (Newest)" },
        { id: 2, name: "Listing (Oldest)" },
        { id: 3, name: "Price (Highest)" },
        { id: 4, name: "Price (Lowest)" },
        { id: 5, name: "Mint (Highest)" },
        { id: 6, name: "Mint (Lowest)" },
    ]

    const [currentSortParam, setCurrentSortParam] = useState(sortParams[0])

    const toggleFilterPoppup = () => {
        setFilterPoppupOpened(!filterPoppupOpened)
    }

    return (
        <main className={s['tame-page']}>
            <div className={`${s.wrapper} wrapper`}>
                <div className={`${s['tame-mb']} container`}>
                    <div className={s['tame-page__content']}>
                        <div className={s.content__filter}>
                            <h3 className={s.filter__title}>Фильтр</h3>

                            <div className={s.filter__block}>
                                <div className={s.block__search}>
                                    <input type="text" className={s.search__input} placeholder="Поиск коллекции" />
                                    <button className={s.search__btn}>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M14.5165 4.48885C16.4419 4.48709 18.3247 5.05644 19.9265 6.12489C21.5283 7.19333 22.7772 8.71285 23.5153 10.4912C24.2533 12.2696 24.4473 14.2269 24.0728 16.1156C23.6982 18.0043 22.7719 19.7394 21.411 21.1015C20.0502 22.4637 18.3159 23.3915 16.4275 23.7678C14.5392 24.1441 12.5817 23.9519 10.8027 23.2155C9.02361 22.479 7.50294 21.2315 6.43304 19.6306C5.36313 18.0298 4.79205 16.1476 4.79205 14.2222C4.80373 11.6459 5.83173 9.17828 7.65264 7.35571C9.47355 5.53313 11.9402 4.50287 14.5165 4.48885ZM14.5165 2.66663C12.231 2.66663 9.99688 3.34435 8.09658 4.61409C6.19627 5.88383 4.71517 7.68856 3.84056 9.80006C2.96594 11.9116 2.73711 14.235 3.18298 16.4766C3.62885 18.7181 4.72941 20.7771 6.34549 22.3932C7.96156 24.0093 10.0206 25.1098 12.2621 25.5557C14.5037 26.0016 16.8271 25.7727 18.9386 24.8981C21.0501 24.0235 22.8549 22.5424 24.1246 20.6421C25.3943 18.7418 26.0721 16.5077 26.0721 14.2222C26.0721 11.1575 24.8546 8.21826 22.6875 6.05117C20.5204 3.88408 17.5812 2.66663 14.5165 2.66663Z"
                                                fill="white" />
                                            <path
                                                d="M31.1102 29.5912L24.5591 22.9956L23.2969 24.2489L29.848 30.8445C29.9303 30.9274 30.0281 30.9932 30.1358 31.0383C30.2436 31.0834 30.3592 31.1068 30.476 31.1072C30.5927 31.1076 30.7085 31.085 30.8165 31.0407C30.9246 30.9964 31.0229 30.9312 31.1058 30.8489C31.1886 30.7666 31.2545 30.6688 31.2996 30.5611C31.3447 30.4533 31.3681 30.3378 31.3685 30.221C31.3689 30.1042 31.3463 29.9884 31.302 29.8804C31.2577 29.7723 31.1925 29.674 31.1102 29.5912Z"
                                                fill="white" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={s.block__list}>
                                    <div className={s.list__accordion}>
                                        <input className={s.accordion__input} type="checkbox" id="farmesworld_filter" />
                                        <label className={s.accordion__trigger} htmlFor="farmesworld_filter">
                                            <img className={s.trigger__img} src={filterCategoryIcon.src} alt="" />
                                            farmesworld
                                        </label>

                                        {/* <div className={s.accordion__content}>
                                            <div className={s.content__container}>
                                                <label className={`${s.container__label} ${s['container__label-checkbox']}`}>
                                                    <input type="checkbox" name="brand" className={s.label__input} defaultChecked />
                                                    <span className={s.label__checkbox}></span>
                                                    <span className={s.label__text}>
                                                        rarnost1
                                                    </span>
                                                </label>

                                                <label className={`${s.container__label} ${s['container__label-checkbox']}`}>
                                                    <input type="checkbox" name="brand" className={s.label__input} defaultChecked />
                                                    <span className={s.label__checkbox}></span>
                                                    <span className={s.label__text}>
                                                        rarnost2
                                                    </span>
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>

                            <TameSelect sortParams={sortParams} currentSortParam={currentSortParam} setCurrentSortParam={setCurrentSortParam} />

                            <img className={`${s['mb-stars']} ${s.right_yellow_area}`} src={tameRightYellow.src} alt="" />
                            <img className={`${s['mb-stars']} ${s.left_yellow_area}`} src={tameLeftYellow.src} alt="" />

                            <img className={`${s['mb-stars']} ${s.mb_big_star}`} src={mobileBigStar.src} alt="" />
                            <img className={`${s['mb-stars']} ${s.mb_small_star}`} src={mobileSmallStar.src} alt="" />
                        </div>

                        <div className={s.content__exchange}>
                            <h3 className={s.exchange__mb_title}>Выберите одну из своих карточек и обменяйте её на карточку с Эмиком
                            </h3>
                            <div className={s.exchange__arrows}>
                                <img src={exchangeArrow.src} alt="" />
                            </div>
                            <div className={s.exchange__card}>
                                <div className={s.card__info}>
                                    <div className={s.info__content}></div>
                                </div>
                            </div>
                        </div>

                        <div className={`${s.cards__list} ${s['cards__list-mb']}`}>
                            {/* SLIDER */}
                            <button className={`${s.list__btn} play_btn`}>choose</button>

                            <div id="tame_page-slider_pagination" className={s.cards__pagination}></div>
                        </div>
                    </div>
                </div>

                <div className={s['tame-md']}>
                    <h3 className={s.md__title}>Выберите одну из своих карточек и обменяйте её на карточку с Эмиком </h3>

                    <div className={s.md__card}>
                        <div className={s.card__info}>
                            <div className={s.info__content}>
                                <div className={s.content__container}>

                                    <div className={s.list__item}>
                                        <div className={`${s.slide__info} ${s['slide__info-legendary']}`}>
                                            <div className={s.info__bg}>
                                                <div className={s.info__hash}>#1897253</div>

                                                <div className={s.info__img}>
                                                    <img src={cardImage.src} />
                                                </div>

                                                <div className={s.info__rarity}>
                                                    Legendary2
                                                    <hr />
                                                </div>

                                                <p className={s.info__name}>Corn Seed </p>

                                                <div className={s.info__collections}>
                                                    <div className={s.collections__item}>farmesworld</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className={`${s.play_btn} play_btn`}>Приручить</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.md__cards}>
                        <div className={s.cards__header}>
                            <div className={s.filter__container}>
                                <button className={s.header__filter} onClick={toggleFilterPoppup}>
                                    <span>Фильтр по коллекциям</span>
                                    <img src={filterBtnIcon.src} alt="" />
                                </button>
                                <PoppupFilter filterPoppupOpened={filterPoppupOpened} setFilterPoppupOpened={setFilterPoppupOpened}/>
                            </div>
                            

                            <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                            <TameSelect sortParams={sortParams} currentSortParam={currentSortParam} setCurrentSortParam={setCurrentSortParam} />
                        </div>

                        <div className={s.cards__list}>
                            <div className={s.list__container}>
                                {/* Для теста */}
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item, i) => (
                                    <div key={`${item}_${i}`} className={s.list__item}>
                                        <div className={`${s.slide__info} ${s['slide__info-legendary']}`}>
                                            <div className={s.info__bg}>
                                                <div className={s.info__hash}>#1897253</div>

                                                <div className={s.info__img}>
                                                    <img src={cardImage.src} />
                                                </div>

                                                <div className={s.info__rarity}>
                                                    Legendary
                                                    <hr />
                                                </div>

                                                <p className={s.info__name}>Corn Seed </p>

                                                <div className={s.info__collections}>
                                                    <div className={s.collections__item}>farmesworld</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>

                <img className={`${s['md-stars']} ${s.yellow_area}`} src={yellowArea.src} alt="" />

                <img className={`${s['md-stars']} ${s.yellow_big_star}`} src={yellowBigStar.src} alt="" />
                <img className={`${s['md-stars']} ${s.yellow_little_star}`} src={yellowSmallStar.src}  alt="" />
            </div>

            
        </main>
    )
}

export default withAuth(Tame)
