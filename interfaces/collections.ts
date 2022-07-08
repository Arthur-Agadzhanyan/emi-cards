export interface Collection{
    img: string
    contract:	string
    collection_name:	string
    name:	string
    author:	string
    allow_notify:	boolean
    authorized_accounts:	string[]
    notify_accounts:	string[]
    market_fee:	number
    data:	{}
    created_at_block:	string
    created_at_time:	string
}
