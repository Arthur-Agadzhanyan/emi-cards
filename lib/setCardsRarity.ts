import { Asset,Rarity } from "@/interfaces/assets";
import { template } from "@/store/templateSlice";

export const setCardsRarity = (array: Asset[], templates:{ rows: template[] })=>{
    array.forEach((card) => {
        templates.rows.forEach((template: template) => {
            if (card.template && +card.template.template_id === template.template_id) {
                card.rarity = template.rarity
            }
        })
    });
}