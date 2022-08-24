import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios'

import { withAuth } from '@/app/hocs/authentication'
import { Asset } from '@/interfaces/assets'
import NftCardsList from "@/widgets/nft-cards-list"

import { useTypedSelector } from '@/hooks/useTypedSelector'
import {NftCard} from "@/entities/cards";
import {PageContainer, PageWrapper} from "@/shared/page";
import {CardsRarityFilter} from "@/entities/filters";
import {CardsSortSelect} from "@/entities/selects";
import {EmicModal} from "@/entities/modals";
import s from '@/styles/collection-page.module.scss'

function CollectionPage() {
    const user = useTypedSelector(state => state.user)

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [cardsLoaded,setCardsLoaded] = useState(false)
    const [responseMessage, setResponseMessage] = useState({} as Asset)

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
    }, [user.loaded])

    const showEmic = (emicCard: Asset)=>{
        setResponseMessage(emicCard)
    }

    const renderCards = useCallback(function(){
        if(userCards.length){
            return userCards.map((item, i) => (
                <NftCard key={`${item.asset_id}_${i}`}  rarity={item!.data.rarity} className={s.list__card} card={item} isEmic={true} onClick={()=>showEmic(item)}/>
            ))
        }else if (cardsLoaded && !userCards.length){
            return <h1>No cards found</h1>
        }
    },[userCards.length,cardsLoaded])

    const closeModal = ()=> setResponseMessage({} as Asset)

    return (
        <>
            <EmicModal isOpen={!!responseMessage.data} card={responseMessage} closeModal={closeModal} />

            <PageWrapper>
                <PageContainer className={s.mb_padding_none}>
                    <h3 className={`page__title ${s.page_title}`}>Your Emi collection, see features, compare prices or just admire</h3>
                    <div className={s.cards__header}>
                        <CardsRarityFilter className={s.header__filter} user={user} cards={userCards} setCards={setUserCards} />

                        <CardsSortSelect className={s.header__sort} setUserCards={setUserCards}/>
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