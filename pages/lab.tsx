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
import {wax} from "@/store/userSlice";
import {validateUserCards} from "@/lib/validateUserCards";
import {setCardsRarity} from "@/lib/setCardsRarity";
import {MessageModal} from "@/entities/modals";

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
    const [responseMessage, setResponseMessage] = useState('')

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
            setChoosedCards({currentRarity: card.data.rarity, maxCards: maxCards, cards:[...choosedCards.cards,card]})
        }else if (choosedCards.cards.length){
            if(card.data.rarity !== choosedCards.currentRarity){
                return alert('Rarity not equal')
            }

            const filteredArr = choosedCards.cards.find((el: Asset)=> el.asset_id === card.asset_id)
            if(filteredArr){
                return alert('Nope')
            }
            if(choosedCards.cards.length == choosedCards.maxCards){
                return alert('Nope, больше чем надо')
            }
            setChoosedCards({...choosedCards, maxCards: 14, cards:[...choosedCards.cards,card]})
        }
        // TODO: что-то сделать с этим [...choosedCards.cards,card]

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

    const mintEmi = async () => {
        try {
            if (!choosedCards.cards.length || !user.userData.account) {
                return console.log('nope')
            }
            if(choosedCards.cards.length !== choosedCards.maxCards){
                return setResponseMessage("Недостаточно карт для проведения транзакции")
            }

            const cardsIds = choosedCards.cards.map((card:Asset)=>card.asset_id)

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
                        asset_ids: cardsIds,
                        memo: 'evolve',
                    },
                }]
            }, {
                blocksBehind: 3,
                expireSeconds: 1200,
            }).then((data) => {
                let requestCount = 0

                setResponseMessage('Emic successfully tamed!')
                setChoosedCards({
                    currentRarity: '',
                    maxCards: 14,
                    cards: []
                });

                const interval = setInterval(() => {
                    const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account,collection_name: "zombiemainco" })
                        .then(assets => {

                            setCardsRarity(assets.data.data, templates)

                            setUserCards(assets.data.data)
                            console.log(assets)
                        })

                    if (requestCount <= 2) {
                        setChoosedCards({
                            currentRarity: '',
                            maxCards: 14,
                            cards: []
                        });
                        requestCount++;
                        return console.log('loading...')
                    }

                    clearInterval(interval)

                    console.log('responsed!')
                }, 5000)
            })
            console.log(cardsIds)
        } catch (error:any) {
            setResponseMessage(error.message)
        }
    }

    return (
        <>
            <MessageModal isOpen={!!responseMessage} message={responseMessage} closeModal={()=> setResponseMessage('')} />

            <PageWrapper>
                <PageContainer>
                    <h3 className='page__title'>Выберите  карточки Эми для объединения и получите новую, повышенной редкости</h3>

                    <TradeCardsArea centered={false}>

                        <TradeCardsCount currentRarity={choosedCards.currentRarity} cardsCount={choosedCards.cards.length}/>
                        <div className={s.content__container}>
                            <div className={s.trade_cards}>
                                {choosedCards.cards && choosedCards.cards.map((choosedCard: Asset,i)=>(
                                    <NftCard
                                        style={
                                            {
                                                transform: `translateX(-${i*75}%)`,

                                            }}
                                        key={`${choosedCard.asset_id}_${i}`}
                                        className={s.cards__item}
                                        rarity={choosedCard.data!.rarity}
                                        card={choosedCard}
                                        onClick={()=>removeCard(choosedCard.asset_id)}
                                    />
                                ))
                                }
                            </div>

                            {choosedCards.cards.length ? <Button onClick = {mintEmi}>upgrade</Button> : ""}
                        </div>

                    </TradeCardsArea>

                    <div className={s.cards__header}>
                        <CardsRarityFilter className={s.header__filter} user={user} cards={userCards} setCards={setUserCards} />

                        <img className={s.header__img} src={exchangePinkArrows.src} alt="" />

                        <CardsSortSelect sortParams={sortParams}/>
                    </div>

                    <NftCardsList>
                        {renderCards()}
                    </NftCardsList>
                </PageContainer>
            </PageWrapper>
        </>
    )
}

export default withAuth(LabPage)
