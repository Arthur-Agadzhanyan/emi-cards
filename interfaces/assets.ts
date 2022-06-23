export interface Asset {
    contract: string
    asset_id: string
    owner: string
    name: string
    is_transferable: boolean
    is_burnable: boolean
    template_mint: string
    collection: AssetCollection
    schema: Schema
    template: Template
    backed_tokens: BackedToken[]
    immutable_data: {}
    mutable_data: {}
    rarity:  'common' | 'legendary' | 'epic',
    data: {
        img?: string,
        video?: string,
        name: string,
        rarity: 'common' | 'legendary' | 'epic'
    }
    burned_by_account: string
    burned_at_block: string
    burned_at_time: string
    updated_at_block: string
    updated_at_time: string
    transferred_at_block: string
    transferred_at_time: string
    minted_at_block: string
    minted_at_time: string
}

export interface AssetCollection {
    collection_name: string
    name: string
    author: string
    allow_notify: boolean
    authorized_accounts: string[]
    notify_accounts: string[]
    market_fee: number
    created_at_block: string
    created_at_time: string
}

export interface Schema {
    schema_name: string
    format: SchemaFormat[]
    created_at_block: string
    created_at_time: string
}

export interface SchemaFormat {
    name: string
    type: string
}

export interface Template {
    template_id: string
    max_supply: string
    issued_supply: string
    is_transferable: boolean
    is_burnable: boolean
    immutable_data: {}
    created_at_time: string
    created_at_block: string
}

export interface BackedToken {
    token_contract: string
    token_symbol: string
    token_precision: number
    amount: string
}
