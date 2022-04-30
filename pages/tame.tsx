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
import axios from 'axios'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { wax } from '@/store/userSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Button from '@/components/Button'
import { Asset } from '@/interfaces/assets'
import NftCard from '@/components/NftCard'
import FilterCards from '@/components/FilterCards'
import TradingField from '@/components/TradingField'
interface Props { }

interface SortingParam {
    id: number,
    name: string
}

SwiperCore.use([Pagination, Navigation])

function Tame(props: Props) {
    const [filterPoppupOpened, setFilterPoppupOpened] = useState(false)
    const user = useTypedSelector(state => state.user)

    const sortParams: SortingParam[] = [
        { id: 1, name: "Listing (Newest)" },
        { id: 2, name: "Listing (Oldest)" },
        { id: 3, name: "Price (Highest)" },
        { id: 4, name: "Price (Lowest)" },
        { id: 5, name: "Mint (Highest)" },
        { id: 6, name: "Mint (Lowest)" },
    ]

    const [currentSortParam, setCurrentSortParam] = useState(sortParams[0])

    const [userCollections, setUserCollections] = useState<Asset[]>([])


    const [userCards, setUserCards] = useState<Asset[]>([])
    const [choosedCard, setChoosedCard] = useState<Asset>()

    const toggleFilterPoppup = () => {
        setFilterPoppupOpened(!filterPoppupOpened)
    }

    useEffect(() => {
        if (user.loaded && user.userData.account) {
            // const fetched = wax.rpc.get_table_rows(
            //     {
            //         scope: user.userData.account,
            //         code: "atomicassets",
            //         index_position: 1,
            //         json: true,
            //         key_type: "",
            //         limit: "100",
            //         lower_bound: null,
            //         reverse: false,
            //         show_payer: false,
            //         table: "assets",
            //         upper_bound: null "s3r1.wam"

            //     })

            const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account }).then(data => {
                setUserCards(data.data.data)
                console.log(data)
            }).catch(e => console.log(e))

            const accountCollections = axios.get(`https://wax.api.atomicassets.io/atomicassets/v1/accounts/${user.userData.account}/`).then(data => {
                setUserCollections(data.data.data.collections)
                console.log(data)
            }).catch(e => console.log(e))

            console.log(user.userData.account)

        }
        console.log('user loaded: ', user.loaded)
    }, [])

    const chooseCard = (id: string) => {
        const currentCard = userCards.find(el => el.asset_id === id);
        setChoosedCard(currentCard)
    }

    const mintEmi = async () => {
        try {
            if (!choosedCard.asset_id || !user.userData.account) {
                return console.log('nope')
            }

            const result = await wax.api.transact({
                actions: [{
                    account: 'atomicassets',
                    name: 'transfer',
                    authorization: [{
                        actor: user.userData.account,
                        permission: 'active',
                    }],

                    data: {
                        from: user.userData.account,
                        to: 'zombiemainac',
                        asset_ids: [choosedCard?.asset_id],
                        memo: 'mint',
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 1200,
            }).then((data) => {
                    const interval = setInterval(()=>{
                        const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account }).then(data => {
                            setUserCards(data.data.data.filter(el=> el.asset_id !== choosedCard!.asset_id))
                            console.log(data)
                        })

                        if(userCards.find(el => el.asset_id === choosedCard!.asset_id)){
                            return console.log('loading...')
                        }
                        
                        setChoosedCard({} as Asset);
                        clearInterval(interval)

                        console.log('responsed!')
                    },5000)
                    // console.log(data)
                }).catch(e => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }

    const filterByCollection = async (collectionName:string)=>{
        if(collectionName === 'all_collections'){
            setFilterPoppupOpened(false)
            return await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account }).then(data => {
                setUserCards(data.data.data)
            }).catch(e => console.log(e))
        }
        setFilterPoppupOpened(false)
        const atomicData = await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account }).then(data => {
                setUserCards(data.data.data.filter((el)=>el.collection.collection_name === collectionName))
                console.log(data.data.data.filter((el)=>el.collection.collection_name === collectionName))
        }).catch(e => console.log(e))
    }

    
    return (
        <main className={s['tame-page']}>
            <div className={`${s.wrapper} wrapper`}>
                <div className={`${s['tame-mb']} container`}>
                    <div className={s['tame-page__content']}>
                        <FilterCards collections={[{ img: filterCategoryIcon.src, name: "farmesworld" }]}>
                            <TameSelect sortParams={sortParams} currentSortParam={currentSortParam} setCurrentSortParam={setCurrentSortParam} />

                            <img className={`${s['mb-stars']} ${s.right_yellow_area}`} src={tameRightYellow.src} alt="" />
                            <img className={`${s['mb-stars']} ${s.left_yellow_area}`} src={tameLeftYellow.src} alt="" />

                            <img className={`${s['mb-stars']} ${s.mb_big_star}`} src={mobileBigStar.src} alt="" />
                            <img className={`${s['mb-stars']} ${s.mb_small_star}`} src={mobileSmallStar.src} alt="" />
                        </FilterCards>

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
                            <Swiper
                                modules={[Navigation]}
                                className={`${s['content__slider']}`}

                                pagination={{
                                    clickable: true,
                                    type: 'bullets',
                                    el: `#tame_page-slider_pagination`,
                                    bulletElement: 'span',
                                    bulletClass: `swiper-pagination-bullet ${s['swiper-pagination-bullet']}`,
                                    bulletActiveClass: `${s['swiper-pagination-bullet-active']}`,
                                    renderBullet: function (index, className) {
                                        return '<span class="' + className + '"></span>';
                                    }
                                }}

                                speed={1000}
                                spaceBetween={24}

                                onSlideChange={() => console.log('slide change')}

                                breakpoints={{
                                    320: {
                                        slidesPerView: 1.3,
                                    },
                                    400: {
                                        slidesPerView: 1.5,
                                    },
                                    450: {
                                        slidesPerView: 1.8,
                                    },
                                    500: {
                                        slidesPerView: 2.3,
                                    },
                                    600: {
                                        slidesPerView: 2.6,
                                    },
                                    800: {
                                        slidesPerView: 3.4,
                                    },
                                    900: {
                                        slidesPerView: 4,
                                    }
                                }}
                                autoHeight={true}
                            >
                                {userCards.length && userCards.map((item, i) => (
                                    <SwiperSlide key={`${item}_${i}`}>
                                        <NftCard className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* <button className={`${s.list__btn} play_btn`}>choose</button> */}
                            <Button className={`${s.list__btn}`}>choose</Button>

                            <div id="tame_page-slider_pagination" className={s.cards__pagination}></div>
                        </div>
                    </div>
                </div>

                <div className={s['tame-md']}>
                    <h3 className={s.md__title}>Выберите одну из своих карточек и обменяйте её на карточку с Эмиком </h3>

                    <TradingField>
                        {choosedCard?.asset_id && <div className={s.content__container}>

                            <NftCard className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />

                            <Button className={`${s.play_btn}`} onClick={() => mintEmi()}>Приручить</Button>
                        </div>}
                    </TradingField>

                    <div className={s.md__cards}>
                        <div className={s.cards__header}>
                            <div className={s.filter__container}>
                                <button className={s.header__filter} onClick={toggleFilterPoppup}>
                                    <span>Фильтр по коллекциям</span>
                                    <img src={filterBtnIcon.src} alt="" />
                                </button>
                                {userCollections && <PoppupFilter collections={userCollections} filterPoppupOpened={filterPoppupOpened} setFilterPoppupOpened={setFilterPoppupOpened} onFilter={filterByCollection} />}
                            </div>


                            <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                            <TameSelect sortParams={sortParams} currentSortParam={currentSortParam} setCurrentSortParam={setCurrentSortParam} />
                        </div>

                        <div className={s.cards__list}>
                            <div className={s.list__container}>
                                {userCards.length
                                    ? userCards.map((item, i) => (
                                        <NftCard className={s.list__item} card={item} onClick={() => chooseCard(item.asset_id)} />
                                    ))

                                    : <h1>Загрузка...</h1>
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <img className={`${s['md-stars']} ${s.yellow_area}`} src={yellowArea.src} alt="" />

                <img className={`${s['md-stars']} ${s.yellow_big_star}`} src={yellowBigStar.src} alt="" />
                <img className={`${s['md-stars']} ${s.yellow_little_star}`} src={yellowSmallStar.src} alt="" />
            </div>
        </main>
    )
}

export default withAuth(Tame)
