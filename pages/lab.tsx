import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'

import { withAuth } from '@/app/hocs/authentication'
import { Asset } from '@/interfaces/assets'
import s from '@/styles/lab-page.module.scss'
import NftCardsList from "@/widgets/nft-cards-list"

import exchangePinkArrows from '@/public/img/icons/exchange-pink-arrows.svg'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {NftCard} from "@/entities/cards";
import {PageContainer, PageWrapper} from "@/shared/page";
import {CardsRarityFilter} from "@/entities/filters";
import {CardsSortSelect} from "@/entities/selects";
import {TradeCardsArea, TradeCardsCount} from "@/features/trade-cards";
import Button from "@/shared/button";

interface SortingParam {
    id: number,
    name: string,
    sortFunction: () => void
}

interface cardsObj{
    currentRarity: string,
    maxCards: number,
    cards: Asset[]
}

function LabPage() {
    const user = useTypedSelector(state => state.user)
    const templates = useTypedSelector(state => state.template)

    const [choosedCards, setChoosedCards] = useState({
        currentRarity: '',
        maxCards: 14,
        cards: []
    })

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [cardsLoaded,setCardsLoaded] = useState(false)

    //TODO: закинуть этот массив в компонент сортировки
    const sortParams: SortingParam[] = [
        { id: 1, name: "Listing (Newest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +b.asset_id - +a.asset_id)]) },
        { id: 2, name: "Listing (Oldest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 3, name: "Price (Highest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 4, name: "Price (Lowest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.asset_id - +b.asset_id)]) },
        { id: 5, name: "Mint (Highest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +a.template_mint - +b.template_mint)]) },
        { id: 6, name: "Mint (Lowest)", sortFunction: () => setUserCards(prev => [...prev.sort((a, b) => +b.template_mint - +a.template_mint)]) },
    ]

    useEffect(() => {
        if (user.loaded && user.userData.account) {
            console.log('loaded')

            const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account,collection_name: "zombiemainco" })
                .then(assets => {
                    console.log(assets)

                    setUserCards(assets.data.data)
                    setCardsLoaded(true)
                    return assets
                })

                .catch(e => console.log(e))
        }
    }, [templates.rows])

    function addCard(card:Asset) {
        let maxCards = 0;
        if(!choosedCards.cards.length){
            switch (card.data.rarity){
                case "Common":
                    maxCards = 14
                case "Uncommon":
                    maxCards = 12
                case "Rare":
                    maxCards = 10
                case "Epic":
                    maxCards = 8
                case "Legendary":
                    maxCards = 6
            }
        }else if (choosedCards.cards.length){
            const filteredArr = choosedCards.cards.find((el: Asset)=> el.asset_id === card.asset_id)
            if(filteredArr){
                return alert('Nope')
            }
            if(choosedCards.cards.length == choosedCards.maxCards){
                return alert('Nope, больше чем надо')
            }
        }
        setChoosedCards({currentRarity: card.data.rarity, maxCards: 14, cards:[...choosedCards.cards,card]})
    }

    function removeCard (id: Asset['asset_id']){
        const newCards = choosedCards.cards.filter((item:Asset) => item.asset_id !== id)
        if(choosedCards.cards.length == 1){
            setChoosedCards({currentRarity: '', maxCards: 14, cards: newCards})
        }else{
            setChoosedCards({...choosedCards ,cards: newCards})
        }

    }

    const renderCards = function(){
        if(userCards.length){
            return userCards.map((item, i) => (
                <NftCard rarity={item!.data.rarity} key={`${item}_${i}`} className={s.list__item} card={item} isEmic={true} onClick={()=>addCard(item)} />
            ))
        }else if (!cardsLoaded && !userCards.length){
            return <h1>Загрузка...</h1>
        }else{
            return <h1>Карточек не найдено</h1>
        }
    }

    return (
        <PageWrapper>
            <PageContainer>
                <h3 className='page__title'>Выберите  карточки Эми для объединения и получите новую, повышенной редкости</h3>

                <TradeCardsArea centered={false}>

                    <TradeCardsCount currentRarity={choosedCards.currentRarity} cardsCount={choosedCards.cards.length}/>
                    <div className={s.content__container}>
                   {choosedCards.cards && choosedCards.cards.map((choosedCard: Asset,i)=>(
                           <NftCard key={`${choosedCard.asset_id}_${i}`} rarity={choosedCard.data!.rarity} className={s.list__item} card={choosedCard} onClick={()=>removeCard(choosedCard.asset_id)} />
                       ))
                   }
                    </div>

                </TradeCardsArea>

                <div className={s.cards__header}>
                    <CardsRarityFilter className={s.header__filter} user={user} cards={userCards} setCards={setUserCards} />

                    <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                    <CardsSortSelect sortParams={sortParams} />
                </div>

                <NftCardsList>
                    {renderCards()}
                </NftCardsList>
            </PageContainer>
        </PageWrapper>
    )
}

export default withAuth(LabPage)
