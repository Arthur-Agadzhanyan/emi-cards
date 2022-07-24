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
    const [choosedCard,setChoosedCard] = useState<Asset>({} as Asset)

    const [cardsLoaded,setCardsLoaded] = useState(false)
    const [responseMessage, setResponseMessage] = useState({} as Asset)

    const initializeConfig = [
        {
            cardsRarity: Rarity.Common,
            arenaName: "Desert",
            bgImage: DesertBgImage.src
        },
        {
            cardsRarity: Rarity.Uncommon,
            arenaName: "Forest",
            bgImage: DesertBgImage.src
        },
        {
            cardsRarity: Rarity.Rare,
            arenaName: "Winter",
            bgImage: DesertBgImage.src
        },
        {
            cardsRarity: Rarity.Epic,
            arenaName: "Mountain",
            bgImage: DesertBgImage.src
        },
        {
            cardsRarity: Rarity.Legendary,
            arenaName: "Sea",
            bgImage: DesertBgImage.src
        },
        {
            cardsRarity: Rarity.Mythic,
            arenaName: "Sky",
            bgImage: DesertBgImage.src
        }
    ]

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
        const currentPageKey = initializeConfig.filter(elem => path===elem.cardsRarity)

        setArenaSettings(currentPageKey[0])
    }

    const renderCards = function () {
        if (userCards.length) {
            return userCards.map((item, i) => (
                <NftCard
                    key={`${item.asset_id}_${i}`}
                    className={s.list__card}
                    rarity={item!.data.rarity}
                    card={item}
                    isEmic={true}
                    draggable
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