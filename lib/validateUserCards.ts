import { Asset } from "@/interfaces/assets"
import { template } from "@/store/templateSlice"

export const validateUserCards = (cardsArray: Asset[],templates:{rows: template[]})=>{
    return cardsArray.filter((card) => {
        let isCardValid = false

        templates.rows.forEach((template) => {
            if (card.template && +card.template.template_id === template.template_id) {
                isCardValid = true
            }
        })

        return isCardValid
    })

}