import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'

import { Asset, Rarity } from '@/interfaces/assets';

import { withAuth } from '@/app/hocs/authentication';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import {PageContainer, PageWrapper } from '@/shared/page';
import NftCardsList from "@/widgets/nft-cards-list"

import DesertBgImage from '@/public/img/current_arena_page/desert.png'
import { NftCard } from '@/entities/cards';

import s from '@/styles/current-arena-page.module.scss'
import { CardsSortSelect } from '@/entities/selects';
import { ArenaSettings } from '@/interfaces/arena';
import ArenaBattle from '@/widgets/arena-battle';

function CurrentArena() {
    const user = useTypedSelector(state => state.user)
    const router = useRouter()

    const [arenaSettings, setArenaSettings] = useState<ArenaSettings>({
        cardsRarity: Rarity.Common,
        arenaName: "Desert",
        bgImage: DesertBgImage.src
    });

    const [userCards, setUserCards] = useState<Asset[]>([])
    const [cardsLoaded,setCardsLoaded] = useState(false)
    const [responseMessage, setResponseMessage] = useState({} as Asset)

    useEffect(() => {
        const { rarity: pathRarity } = router.query
        const filteredPaths = Object.values(Rarity).filter(el=>el.toLowerCase() === pathRarity)

        if(!filteredPaths.length){
            router.push('/arena')
        }else{
            initializeArena(filteredPaths[0])
        }

        if (user.loaded && user.userData.account) {
            console.log('loaded')

            const atomicData = axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { owner: user.userData.account,collection_name: "zombiemainco" })
                .then(assets => {
                    const filteredData: Asset[] = assets.data.data.filter((el:Asset)=>el.data.rarity.toLocaleLowerCase() == pathRarity)
                    console.log(filteredData)

                    setUserCards(filteredData)
                    setCardsLoaded(true)
                    return assets
                })

                .catch(e => console.log(e))
        }
    }, [user.loaded])

    const initializeArena = (path: Rarity)=> {
        switch (path){
            case Rarity.Common:
                setArenaSettings({cardsRarity: path, arenaName: "Desert", bgImage: DesertBgImage.src})
                break
            case Rarity.Uncommon:
                setArenaSettings({cardsRarity: path, arenaName: "Forest", bgImage: DesertBgImage.src})
                break
            case Rarity.Rare:
                setArenaSettings({cardsRarity: path, arenaName: "Winter", bgImage: DesertBgImage.src})
                break
            case Rarity.Epic:
                setArenaSettings({cardsRarity: path, arenaName: "Mountain", bgImage: DesertBgImage.src})
                break
            case Rarity.Legendary:
                setArenaSettings({cardsRarity: path, arenaName: "Sea", bgImage: DesertBgImage.src})
                break
            case Rarity.Mythic:
                setArenaSettings({cardsRarity: path, arenaName: "Sky", bgImage: DesertBgImage.src})
                break
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
                />
            ))
        } else if (!cardsLoaded && !userCards.length) {
            return <h1>Loading...</h1>
        } else {
            return <h1>No cards found</h1>
        }
    }

    return (
        <PageWrapper withoutImgs>
            <ArenaBattle settings={arenaSettings}/>

            <PageContainer>

                <div className={s.cards__header}>
                    <CardsSortSelect setUserCards={setUserCards}/>
                </div>

                <NftCardsList className={s.cards_list} containerClassName={s.list__content}>
                    {renderCards()}
                </NftCardsList>
            </PageContainer>
        </PageWrapper>
    );
}

export default withAuth(CurrentArena)