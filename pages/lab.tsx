import React, {useCallback, useEffect, useState} from 'react'
import { withAuth } from '@/app/hocs/authentication'
import { Asset } from '@/interfaces/assets'
import axios from 'axios'
import s from '@/styles/lab-page.module.scss'
import NftCardsList from "@/widgets/nft-cards-list"

import exchangePinkArrows from '@/public/img/icons/exchange-pink-arrows.svg'
import { setCardsRarity } from '@/lib/setCardsRarity'

import { validateUserCards } from '@/lib/validateUserCards'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {Collection} from "@/interfaces/collections";
import {NftCard} from "@/entities/cards";
import {PageContainer, PageWrapper} from "@/shared/page";
import {CardsFilter} from "@/entities/filters";
import {CardsSortSelect} from "@/entities/selects";
import TradingField from "@/widgets/trading-field";

interface SortingParam {
    id: number,
    name: string,
    sortFunction: () => void
}

function LabPage() {
    const user = useTypedSelector(state => state.user)
    const templates = useTypedSelector(state => state.template)

    const [choosedCards, setChoosedCards] = useState<Asset[]>([])
    const [userCards, setUserCards] = useState<Asset[]>([])
    const [userCollections, setUserCollections] = useState<Asset[]>([])

    const sortParams: SortingParam[] = [
        { id: 1, name: "Listing (Newest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +b.asset_id - +a.asset_id)]) },
        { id: 2, name: "Listing (Oldest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 3, name: "Price (Highest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 4, name: "Price (Lowest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 5, name: "Mint (Highest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.template_mint - +b.template_mint)]) },
        { id: 6, name: "Mint (Lowest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +b.template_mint - +a.template_mint)]) },
    ]

    const filterByCollection = useCallback(async (collectionName: string, setFilterPoppupOpened: (arg: boolean) => void) => {
        if (collectionName === 'all_collections') {
            return axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                .then(assets => {
                    const filteredCards = validateUserCards(assets.data.data, templates)

                    setChoosedCards([])
                    setCardsRarity(filteredCards, templates)
                    console.log(filteredCards)
                    setUserCards(filteredCards)

                    setFilterPoppupOpened(false)

                    return filteredCards
                })
                .catch(e => console.log(e))
        }

        const atomicData = await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
            .then(assets => {
                const filteredCards = validateUserCards(assets.data.data, templates)

                setChoosedCards([])
                setCardsRarity(filteredCards, templates)

                setFilterPoppupOpened(false)

                setUserCards(filteredCards.filter((el: Asset) => el.collection.collection_name === collectionName))

                return filteredCards
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (user.loaded && user.userData.account) {
            console.log('loaded')

            const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account })
                .then(assets => {
                    console.log(assets.data.data)
                    const filteredCards = assets.data.data.filter((el: Asset)=>el.collection.collection_name === 'zombiemainco')

                    setCardsRarity(filteredCards, templates)
                    console.log(filteredCards)
                    setUserCards(filteredCards)
                    return filteredCards
                })
                .then((filteredCards) => {
                    const validCollections: Collection[] = []

                    filteredCards.forEach((card: Asset) => {
                        validCollections.push(card.collection as Collection)
                    })

                    const settedCollections = new Set(validCollections.map((el) => JSON.stringify(el)))
                    const uniqueCollections = [...Array.from(settedCollections)].map((el) => JSON.parse(el))

                    setUserCollections(uniqueCollections)
                    console.log("validCollections: ", uniqueCollections);
                })

                .catch(e => console.log(e))
        }
    }, [templates.rows])

    return (
        <PageWrapper>
            <PageContainer>
                <h3 className='page__title'>Выберите  карточки Эми для объединения и получите новую, повышенной редкости</h3>

                <TradingField>
                    {/* {choosedCard?.asset_id && <div className={s.content__container}>
                        <nft-card rarity={choosedCard.rarity} className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />

                        <button className={`${s.play_btn}`}>upgrade</button>
                    </div>} */}
                </TradingField>

                <div className={s.cards__header}>
                    <CardsFilter className={s.header__filter} collections={userCollections} onFilter={filterByCollection} />

                    <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                    <CardsSortSelect sortParams={sortParams} />
                </div>

                <NftCardsList>
                    {userCards.length
                        ? userCards.map((item, i) => (
                            <NftCard rarity={item!.data.rarity} key={`${item}_${i}`} className={s.list__item} card={item} isEmic={true} />
                        ))

                        : <h1>Загрузка...</h1>
                    }
                </NftCardsList>
            </PageContainer>
        </PageWrapper>
    )
}

export default withAuth(LabPage)
