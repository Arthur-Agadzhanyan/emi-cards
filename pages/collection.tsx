import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'

import { withAuth } from '@/app/hocs/authentication'
import { Asset } from '@/interfaces/assets'
import s from '@/styles/collection-page.module.scss'
import NftCardsList from "@/widgets/nft-cards-list"

import { useTypedSelector } from '@/hooks/useTypedSelector'
import {NftCard} from "@/entities/cards";
import {PageContainer, PageWrapper} from "@/shared/page";
import {CardsRarityFilter} from "@/entities/filters";
import {CardsSortSelect} from "@/entities/selects";
import {MessageModal} from "@/entities/modals";

function CollectionPage() {
    const user = useTypedSelector(state => state.user)
    const templates = useTypedSelector(state => state.template)

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [cardsLoaded,setCardsLoaded] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

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
    }, [])


    const renderCards = function(){
        if(userCards.length){
            return userCards.map((item, i) => (
                <>
                    <NftCard rarity={item!.data.rarity} key={`${item}_${i}`} className={s.list__card} card={item} isEmic={true}/>
                </>
            ))
        }else if (cardsLoaded && !userCards.length){
            return <h1>Карточек не найдено</h1>
        }
    }

    return (
        <>
            <MessageModal isOpen={!!responseMessage} message={responseMessage} closeModal={()=> setResponseMessage('')} />

            <PageWrapper>
                <PageContainer>
                    <h3 className={`page__title ${s.page_title}`}>Ваша коллекция Эми,  смотрите характериситки, сравните стоимость или просто любуйтесь</h3>
                    <div className={s.cards__header}>
                        <CardsRarityFilter className={s.header__filter} user={user} cards={userCards} setCards={setUserCards} />

                        <CardsSortSelect setUserCards={setUserCards}/>
                    </div>

                    <NftCardsList className={s.cards_list} containerClassName={s.list__content}>
                        {renderCards()}
                    </NftCardsList>
                </PageContainer>
            </PageWrapper>
        </>
    )
}

export default withAuth(CollectionPage)