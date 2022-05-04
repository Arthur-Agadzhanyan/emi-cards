import Button from '@/components/Button'
import NftCard from '@/components/NftCard'
import TradingField from '@/components/TradingField'
import { withAuth } from '@/HOC/auth'
import { Asset } from '@/interfaces/assets'
import React, { useState } from 'react'

interface Props { }

function LabPage(props: Props) {
    const { } = props
    const [choosedCard, setChoosedCard] = useState<Asset>({} as Asset)

    return (
        <main className='wrapper'>
            <TradingField>
                {choosedCard?.asset_id && <div className={s.content__container}>
                    <NftCard className={s.list__item} card={choosedCard} onClick={() => setChoosedCard({} as Asset)} />

                    <Button className={`${s.play_btn}`}>upgrade</Button>
                </div>}
            </TradingField>
        </main>
    )
}

export default withAuth(LabPage)
