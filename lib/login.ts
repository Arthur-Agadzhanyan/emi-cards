import { WaxJS } from "@waxio/waxjs/dist";

export async function login(wax: WaxJS) { 
    try { 
        if(!wax.api){
            const loginUser = await wax.login();
            console.log('signed')
        }else{
            console.log(wax.userAccount)
            alert(`already logged in as ${wax.userAccount}`)
        }
    } catch(e) { 
        console.log(e)
    } 
}