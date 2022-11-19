import { wax } from '@/store/userSlice'

export async function createTransaction(memoName:string , account: string, assetIds: string[]) {
    try{
        return await wax.api.transact({
            actions: [{
                account: 'atomicassets',
                name: 'transfer',
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],

                data: {
                    from: account,
                    to: 'zombiemainac',
                    asset_ids: [...assetIds],
                    memo: memoName,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        })
    }catch (error: any){
        throw new Error(error)
    }
}

export async function cancelOpponentQueue(memoName:string , account: string, battle_id: number) {
    try{
        return await wax.api.transact({
            actions: [{
                account: 'zombiemainac',
                name: memoName,
                authorization: [{
                    actor: account,
                    permission: 'active',
                }],

                data: {
                    player: account,
                    battle_id: battle_id,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 1200,
        })
    }catch (error: any){
        throw new Error(error)
    }
}