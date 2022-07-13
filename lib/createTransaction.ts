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