import React, { useState, useEffect } from "react";
import Image from "next/image";
//INTERFACES
import { ArenaSettings } from "@/interfaces/arena";
import { Asset } from "@/interfaces/assets";
//SHARED COMPONENTS
import Button from "@/shared/button";
//ENTITIES COMPONENT
import { NftCard } from "@/entities/cards";
import {
  ArenaField,
  ArenaName,
  ArenaDropCard,
  ArenaHelpMessage,
} from "@/features/arena";
//STYLES
import s from "./arena-battle.module.scss";
//IMAGES
import loading from "@/public/img/current_arena_page/loading.svg";
import { createTransaction } from "@/lib/createTransaction";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import axios from "axios";
import { wax } from "@/store/userSlice";

interface HelpMsg {
  text: string;
  direction: "left" | "right" | null;
}

interface Battle {
    battle_id: number,
    player_1: string,
    player_1_asset_id: number,
    player_2: string,
    player_2_asset_id: number,
    rarity: string,
    status: string,
    random_value: number,
    winner: number,
    reward: number,
    loser_status: string
}

const helpMessages = {
  cardNotChoosed: "Select the character you want to send into battle",
  pressQueue: "Press QUEUE button to begin",
  opponentSearches: "Looking for opponent...",
  opponentFound: "Your opponent has been found!",
};

const initialBattle = {
  found: false,
  searching: false,
  finished: false,
  starts: false,
};

interface Props {
  settings: ArenaSettings;
  setResponseMessage: any;
}

function ArenaBattle({ settings, setResponseMessage }: Props) {
  const user = useTypedSelector((state) => state.user);
  const [choosedCard, setChoosedCard] = useState<Asset | null>(null);

  const [opponentCard, setOpponentCard] = useState<Asset | null>(null);

  const [opponentFound, setOpponentFound] = useState(false);

  const [battle, setBattle] = useState(initialBattle);

  const [helpMsgState, setHelpMsgState] = useState<HelpMsg>({
    text: "Select the character you want to send into battle",
    direction: "left",
  });

  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null)

  useEffect(() => {
    if (!choosedCard) {
      changeHelpMessage(helpMessages.cardNotChoosed, "left");
    } else if (choosedCard && battle.found) {
      changeHelpMessage(helpMessages.opponentFound, "right");
    } else if (choosedCard && !battle.searching) {
      changeHelpMessage(helpMessages.pressQueue, "right");
    } else if (choosedCard && battle.searching) {
      changeHelpMessage(helpMessages.opponentSearches, "right");
    }
  }, [choosedCard, battle]);

  useEffect(() => {
    if (!choosedCard) {
      setBattle((prev) => initialBattle);
    }
  }, [choosedCard]);

  useEffect(()=>{
    if(currentBattle){
        let interval = setInterval(async ()=>{
            const atomicData = await wax.rpc.get_table_rows({
                json: true, // Get the response as json
                code: "zombiemainac", // Contract that we target
                scope: "zombiemainac",
                limit: 1,
                lower_bound: currentBattle.battle_id,
                table: "battles", // Table name
                reverse: true, // Optional: Get reversed data
                show_payer: false, // Optional: Show ram payer
            });

            console.log("battleInfo", atomicData);
            if(atomicData.rows[0].status === "c3"){
                const opponentCardId = choosedCard && ( atomicData.rows[0].player_1_asset_id === choosedCard.asset_id ? atomicData.rows[0].player_2_asset_id : atomicData.rows[0].player_1_asset_id)

                const player2Card = await axios.post(`https://wax.api.atomicassets.io/atomicassets/v1/assets`, { asset_id: opponentCardId})
                console.log("Карта оппонента: ", player2Card);

                // TODO: СДЕЛАТЬ АНИМАЦИЮ СРАЖЕНИЯ - через setTimeout засетать battle.started = true
                // Затем сделать информацию законченного сражения - setTimeout-ом засетать battle.finished = true
                // предусмотреть разные исходы сражения
                
                // реализовать возможность отзыва карточки пользователем

                // узнать, каким образом будет закрываться инфо о сражении
                setBattle(prev=>({...prev, searching:false, found: true}))
                
                setOpponentCard(player2Card.data.data[0])
                clearInterval(interval)

                if(atomicData.rows[0].player_2_asset_id === atomicData.rows[0].winner){
                    console.log();
                } else if (atomicData.rows[0].player_1_asset_id === atomicData.rows[0].winner){
                    alert("Победил первый игрок: " + atomicData.rows[0].player_1)
                    alert("Его карточка: " + atomicData.rows[0].winner)
                    console.log();
                    
                }
            }
        },3000)
    }
  },[currentBattle])

  const dropCardClickHandler = (card: Asset | null) => {
    setBattle((prev) => ({ ...prev, founded: false, searching: false }));
    setChoosedCard(card);
  };

  const changeHelpMessage = (
    text: string,
    direction: "left" | "right" | null
  ) => {
    setHelpMsgState({
      text,
      direction,
    });
  };

  const queueOpponent = () => {
    changeSearching();

    sendToBattle().then(() => {});
    // setTimeout(()=>{
    //     setBattle(prev=>({...prev, found: true, searching: false}))
    //     setTimeout(()=>{
    //         setBattle(prev=>({...prev, found: true, starts: true}))
    //     },2000)
    // },2000)
  };

  const sendToBattle = async () => {
    try {
      if (!choosedCard?.asset_id || !user.userData.account) {
        return console.log("Error: it is impossible to make a transaction");
      }

      let rowInfo;

      const result = await createTransaction("battle", user.userData.account, [
        choosedCard?.asset_id,
      ]);

      setResponseMessage("Emic successfully tamed!");

      setTimeout(async ()=>{
        const atomicData = await wax.rpc.get_table_rows({
            json: true, // Get the response as json
            code: "zombiemainac", // Contract that we target
            scope: "zombiemainac",
            limit: 15,
            table: "battles", // Table name
            reverse: true, // Optional: Get reversed data
            show_payer: false, // Optional: Show ram payer
        });
        
        console.log(atomicData.rows);

        setCurrentBattle(atomicData.rows.filter(item=>{
            return item.player_1_asset_id == choosedCard.asset_id || item.player_2_asset_id == choosedCard.asset_id
        })[0])
      }, 4000)

    //   const timer = setInterval(async ()=>{

    //   },3000)

      console.log("result", result);
    } catch (error: any) {
      setResponseMessage(error.message);
    }
  };

  const changeSearching = () => {
    setBattle((prev) => ({ ...prev, searching: !prev.searching }));
  };

  const renderControlls = () => {
    if ((!battle.searching || !choosedCard) && !battle.found) {
      return (
        <Button
          className={s.controls__queue_btn}
          withImg
          onClick={queueOpponent}
        >
          Queue
        </Button>
      );
    } else if (battle.searching && !battle.found) {
      return (
        <Button className={s.controls__queue_btn} onClick={changeSearching}>
          Cancel
        </Button>
      );
    }

    return "";
  };

  return (
    <ArenaField bgImage={settings.bgImage} battleStarts={battle.starts}>
      <ArenaName pageName={settings.arenaName} rarity={settings.cardsRarity} />

      <div className={s.battle_content}>
        <ArenaDropCard
          choosedCard={choosedCard}
          setChoosedCard={dropCardClickHandler}
          disabled = {!!opponentCard}
        />
        <ArenaHelpMessage
          text={helpMsgState.text}
          direction={helpMsgState.direction}
        />

        <div className={s.opponent}>
          <div className={s.opponent__content}>
            {battle.searching && choosedCard && !battle.found && (
              <div className={s.content__loading_container}>
                <Image src={loading} className={s.content__loading} />
              </div>
            )}

            {!battle.searching && battle.found && opponentCard && (
              <NftCard
                className={s.opponent__card}
                rarity={opponentCard!.data.rarity}
                card={opponentCard as Asset}
                isEmic={true}
              />
            )}
          </div>
          <div className={s.opponent__controls}>{renderControlls()}</div>
        </div>
      </div>
    </ArenaField>
  );
}

export default ArenaBattle;
