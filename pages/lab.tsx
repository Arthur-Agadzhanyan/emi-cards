import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'

import {withAuth} from '@/app/hocs/authentication'
import {Asset} from '@/interfaces/assets'
import s from '@/styles/lab-page.module.scss'
import NftCardsList from "@/widgets/nft-cards-list"

import exchangePinkArrows from '@/public/img/icons/exchange-pink-arrows.svg'
import {useTypedSelector} from '@/hooks/useTypedSelector'
import {NftCard} from "@/entities/cards";
import {PageContainer, PageWrapper} from "@/shared/page";
import {CardsRarityFilter} from "@/entities/filters";
import {CardsSortSelect} from "@/entities/selects";
import {TradeCardsArea, TradeCardsCount} from "@/features/trade-cards";
import Button from "@/shared/button";
import {wax} from "@/store/userSlice";
import {MessageModal} from "@/entities/modals";

interface choosedCardsType {
    currentRarity: string,
    maxCards: number,
    cards: Asset[]
}

function LabPage() {
    const user = useTypedSelector(state => state.user)

    const [choosedCards, setChoosedCards] = useState<choosedCardsType>({
        currentRarity: '',
        maxCards: 14,
        cards: []
    })

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [cardsLoaded, setCardsLoaded] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => {
        try {
            console.log('loaded')
            axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, {
                owner: user.userData.account,
                collection_name: "zombiemainco"
            })
                .then(assets => {
                    setUserCards(assets.data.data)
                    setCardsLoaded(true)
                    return assets
                })
        } catch (e) {
            console.log(e)
        }
    }, [])

    function addCard(card: Asset) {
        let maxCards = 0; // в зависимости от редкости будет принимать разные значения

        if (!choosedCards.cards.length) {
            switch (card.data.rarity) {
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

            setChoosedCards({currentRarity: card.data.rarity, maxCards: maxCards, cards: [...choosedCards.cards, card]})
        } else if (choosedCards.cards.length) {
            if (card.data.rarity !== choosedCards.currentRarity) {
                return setResponseMessage('Rarity not equal')
            }

            const filteredArr = choosedCards.cards.find((el: Asset) => el.asset_id === card.asset_id)

            if (filteredArr) {
                return setResponseMessage('Card already selected')
            }
            if (choosedCards.cards.length == choosedCards.maxCards) {
                return alert('The maximum number of cards for this rarity has been reached')
            }
            setChoosedCards({...choosedCards, maxCards: 14, cards: [...choosedCards.cards, card]})
        }
    }

    function removeCard(id: Asset['asset_id']) {
        const newCards = choosedCards.cards.filter((item: Asset) => item.asset_id !== id)
        if (choosedCards.cards.length == 1) {
            setChoosedCards({currentRarity: '', maxCards: 14, cards: newCards})
        } else {
            setChoosedCards({...choosedCards, cards: newCards})
        }

    }

    const renderCards = function () {
        if (userCards.length) {
            return userCards.map((item, i) => (
                <NftCard
                    key={`${item}_${i}`}
                    className={s.list__card}
                    rarity={item!.data.rarity}
                    card={item}
                    isEmic={true}
                    onClick={() => addCard(item)}
                />
            ))
        } else if (!cardsLoaded && !userCards.length) {
            return <h1>Загрузка...</h1>
        } else {
            return <h1>Карточек не найдено</h1>
        }
    }

    const mintEmi = async () => {
        try {
            if (!choosedCards.cards.length || !user.userData.account) {
                return console.log('nope')
            }
            if (choosedCards.cards.length !== choosedCards.maxCards) {
                return setResponseMessage("Not enough cards to complete the transaction")
            }

            const cardsIds = choosedCards.cards.map((card: Asset) => card.asset_id)

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
                    const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, {
                        owner: user.userData.account,
                        collection_name: "zombiemainco"
                    })
                        .then(assets => {

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
        } catch (error: any) {
            setResponseMessage(error.message)
        }
    }

    return (
        <>
            <MessageModal isOpen={!!responseMessage} message={responseMessage}
                          closeModal={() => setResponseMessage('')}/>

            <PageWrapper>
                <PageContainer>
                    <h3 className='page__title'>Выберите карточки Эми для объединения и получите новую, повышенной
                        редкости</h3>

                    <TradeCardsArea centered={false}>

                        <TradeCardsCount currentRarity={choosedCards.currentRarity}
                                         cardsCount={choosedCards.cards.length}/>

                        <div className={s.content__container}>
                            <div className={s.trade_cards}>
                                {choosedCards.cards && choosedCards.cards.map((choosedCard: Asset, i) => (
                                    <NftCard
                                        style={{ transform: `translateX(-${i * 75}%)` }}
                                        isEmic={true}
                                        key={`${choosedCard.asset_id}_${i}`}
                                        className={s.cards__item}
                                        rarity={choosedCard.data!.rarity}
                                        card={choosedCard}
                                        onClick={() => removeCard(choosedCard.asset_id)}
                                    />
                                ))
                                }
                            </div>

                            {choosedCards.cards.length ?
                                <Button className={s.upgrade_btn} onClick={mintEmi}>upgrade</Button> : ""}
                        </div>

                    </TradeCardsArea>

                    <div className={s.cards__header}>
                        <CardsRarityFilter className={s.header__filter} user={user} cards={userCards}
                                           setCards={setUserCards}/>

                        <img className={s.header__img} src={exchangePinkArrows.src} alt=""/>

                        <CardsSortSelect setUserCards={setUserCards}/>
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
