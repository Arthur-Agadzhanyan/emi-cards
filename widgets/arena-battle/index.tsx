import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import Image from "next/image";
import Link from "next/link"
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
import light from "@/public/img/arena/light.svg";
import battleGif from "@/public/img/arena/battle.gif";
import {
  cancelOpponentQueue,
  createTransaction,
} from "@/lib/createTransaction";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import axios from "axios";
import { wax } from "@/store/userSlice";
import { useCallback } from "react";
import BlackArrow from "@/public/img/arena/black_arrow.svg"

interface HelpMsg {
  text: string;
  direction: "left" | "right" | null;
}

interface Battle {
  battle_id: number;
  player_1: string;
  player_1_asset_id: number;
  player_2: string;
  player_2_asset_id: number;
  rarity: string;
  status: string;
  random_value: number;
  winner: number;
  reward: number;
  loser_status: string;
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
  battle: false,
  canceled: false,
};

interface Props {
  settings: ArenaSettings;
  setResponseMessage: any;
  mobileChoosedCard?: Asset | null;
  setMobileChoosedCard: Dispatch<SetStateAction<Asset | null>>
}

function ArenaBattle({ settings, setResponseMessage, mobileChoosedCard, setMobileChoosedCard }: Props) {
  const user = useTypedSelector((state) => state.user);
  const [choosedCard, setChoosedCard] = useState<Asset | null>(null);

  const [opponentCard, setOpponentCard] = useState<Asset | null>(null);

  const [battle, setBattle] = useState(initialBattle);

  const [helpMsgState, setHelpMsgState] = useState<HelpMsg>({
    text: "Select the character you want to send into battle",
    direction: "left",
  });

  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null);

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
    if(mobileChoosedCard && !choosedCard || mobileChoosedCard && (mobileChoosedCard?.asset_id !== choosedCard?.asset_id)){
      console.log(mobileChoosedCard)
      setChoosedCard(mobileChoosedCard)
    }
  },[mobileChoosedCard])

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (!battle.canceled && !battle.starts && choosedCard?.name) {
      interval = setInterval(async () => {
        if (currentBattle) {
          console.log("canceled", battle.canceled);
          
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

          setCurrentBattle(
              atomicData.rows[0]
          )

          if (
            atomicData.rows[0].status ===
            `${atomicData.rows[0].rarity.toLowerCase()[0]}3`
          ) {
            const opponentCardId =
              choosedCard &&
              (atomicData.rows[0].player_1_asset_id === choosedCard.asset_id
                ? atomicData.rows[0].player_2_asset_id
                : atomicData.rows[0].player_1_asset_id);
  
            const player2Card = await axios.post(
              `https://wax.api.atomicassets.io/atomicassets/v1/assets`,
              { asset_id: opponentCardId }
            );
            console.log("Карта оппонента: ", player2Card);
  
            // TODO: СДЕЛАТЬ АНИМАЦИЮ СРАЖЕНИЯ - через setTimeout засетать battle.started = true
            // Затем сделать информацию законченного сражения - setTimeout-ом засетать battle.finished = true
            // предусмотреть разные исходы сражения
  
            // узнать, каким образом будет закрываться инфо о сражении
            clearInterval(interval);

            setBattle((prev) => ({ ...prev, searching: false, found: true }));

            setOpponentCard(player2Card.data.data[0]);
  
            setTimeout(() => {
              setBattle((prev) => ({ ...prev, starts: true }));
            }, 1000);

            setTimeout(() => {
              setBattle((prev) => ({ ...prev, battle: true }));
            }, 3000);

            setTimeout(()=>{
              setBattle((prev) => ({ ...prev, finished: true }));
            },5000)
          }
        }
      }, 3000);
    }
    return ()=>{
      if(interval){
        clearInterval(interval)
      }
      if (battle.canceled) {
        console.log("battle.canceled battle.canceled battle.canceled battle.canceled battle.canceled")
        // setBattle(initialBattle)
      }
    }
  }, [currentBattle, battle.canceled]);

  const dropCardClickHandler = useCallback(
    (card: Asset | null) => {
      setChoosedCard(card);
    },
    [battle]
  );

  const changeHelpMessage = (
    text: string,
    direction: "left" | "right" | null
  ) => {
    setHelpMsgState({
      text,
      direction,
    });
  };

  const queueOpponent = async () => {
    try {
      const response = await sendToBattle();
      console.log(123123);

      changeSearching();
    } catch (error: any) {
      console.log("==============");
      setResponseMessage(error.message.split("message:")[1]);

      console.log("==============");

      // setResponseMessage(error)
    }
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

      // setResponseMessage("Emic successfully tamed!");

      setTimeout(async () => {
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

        setCurrentBattle(
          atomicData.rows.filter((item) => {
            return (
              item.player_1_asset_id == choosedCard.asset_id ||
              item.player_2_asset_id == choosedCard.asset_id
            );
          })[0]
        );
      }, 3000);

      //   const timer = setInterval(async ()=>{

      //   },3000)

      console.log("result", result);
    } catch (error: any) {
      changeSearching()
      setResponseMessage(error.message);
    }
  };

  const changeSearching = () => {
    setBattle((prev) => ({ ...prev, searching: !prev.searching }));
  };

  const cancelQueue = async () => {
    try {
      // const result = await createTransaction("cncloffer", user.userData.account, [
      //   choosedCard?.asset_id,
      // ]);
      if (currentBattle) {
        console.log(
          "cncloffer",
          user.userData.account,
          currentBattle!.battle_id
        );

        const result = await cancelOpponentQueue(
          "cncloffer",
          user.userData.account,
          currentBattle!.battle_id
        );
        console.log(result);
        if(result.error){
          throw new Error(result.error)
        }
        
        setBattle((prev) => ({ ...initialBattle, canceled: true }));
        setTimeout(()=>{
          setBattle(initialBattle)
          setChoosedCard(null)
        },500)
      }
    } catch (error: any) {
      setResponseMessage(error.message);
    }
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
        <Button className={s.controls__queue_btn} onClick={cancelQueue}>
          Cancel
        </Button>
      );
    }

    return "";
  };

  const renderReward = async ()=>{
    if(currentBattle && choosedCard){
      const rewardFetch= await axios.post(
          `https://wax.api.atomicassets.io/atomicassets/v1/assets`,
          { asset_id: currentBattle.reward })
      const rewardCard = rewardFetch.data.data[0]
      return <NftCard
                          className={s.reward__card}
                          rarity={rewardCard!.data.rarity}
                          card={rewardCard as Asset}
                          isEmic={true}
                      />
    }
  }

  const mobileGoBack = ()=>{
    setMobileChoosedCard(null)
    setChoosedCard(null)
    setBattle(initialBattle)
  }

  return (
    <ArenaField bgImage={settings.bgImage} battleStarts={!!(battle.starts || mobileChoosedCard)} className={mobileChoosedCard ? " " + s.mobile_arena : ""}>
      <div className={`${s.arena_name} ${mobileChoosedCard ? " " + s.arena_name_mobile : ""}`}>
        <ArenaName pageName={settings.arenaName} rarity={settings.cardsRarity} />

      </div>
      {/*MOBILE VERSION =============================================================================================*/}
      {!!mobileChoosedCard && (
          <div className={s.mobile_battle_content}>
            {!battle.searching && !battle.starts && choosedCard && !battle.found && (
                <>
                  <NftCard
                      className={s.choosed__card}
                      rarity={choosedCard!.data.rarity}
                      card={choosedCard as Asset}
                      isEmic={true}
                  />
                  <Button
                      className={s.controls__queue_btn}
                      withImg
                      onClick={queueOpponent}
                  >
                    Queue
                  </Button>
                  <br/>

                  {!battle.starts && !battle.battle && (
                      <ArenaHelpMessage
                          text={helpMsgState.text}
                          direction={helpMsgState.direction}
                      />
                  )}
                  <p className={s.controls__go_back} onClick={mobileGoBack}>
                    <img src={BlackArrow.src}/>
                    Go back
                  </p>
                </>
            )}
            {(battle.searching && choosedCard && !battle.found) && (
                <>
                  <div className={s.content__loading_container}>
                    <Image src={loading} className={s.content__loading} />
                  </div>
                  {!battle.starts && !battle.battle && (
                      <ArenaHelpMessage
                          text={helpMsgState.text}
                          direction={helpMsgState.direction}
                      />
                  )}
                  <Button className={s.controls__queue_btn} onClick={cancelQueue}>
                    Cancel
                  </Button>
                </>
            )}

            {!battle.searching &&
                battle.found &&
                !battle.starts &&
                opponentCard && (
                    <>
                      <NftCard
                          className={s.opponent__card}
                          rarity={opponentCard!.data.rarity}
                          card={opponentCard as Asset}
                          isEmic={true}
                      />
                      <br/>
                      <br/>
                      <ArenaHelpMessage
                          text={helpMsgState.text}
                          direction={helpMsgState.direction}
                      />
                    </>
                )}

            {!battle.finished && battle.starts && battle.found && opponentCard && (
                <div className={s.battle_starts}>
                  <div className={s.battle_starts__user_card}>
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${
                            choosedCard!.data!.img
                        }`}
                        className={s.battle_emic}
                    />

                  </div>
                  <div>
                    {battle.starts && !battle.battle && <img src={light.src} className={s.battle_light}/>}

                    {battle.battle && !battle.finished && (
                        <div className={s.battle_gif}>
                          <Image src={battleGif}  />
                        </div>
                    )}
                  </div>
                  <div className={s.battle_starts__opponent_card}>
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${
                            opponentCard!.data!.img
                        }`}
                        className={s.battle_emic}
                    />
                  </div>
                </div>
            )}

            {battle.finished && currentBattle && choosedCard && opponentCard && (
                <div className={s.finished_content}>
                  <div className={s.battle_info}>
                    {
                      currentBattle.winner ? (
                          +currentBattle.winner === +choosedCard.asset_id
                              ? (
                                  <div className={s.info__text}>
                                    <p className={s.text_red}>{choosedCard.name}</p>
                                    <p>smashed</p>
                                    <p className={s.text_red}>{opponentCard.name} </p>
                                  </div>
                              )
                              : (
                                  <div className={s.info__text}>
                                    <p className={s.text_red}>{opponentCard.name}</p>
                                    <p>smashed</p>
                                    <p className={s.text_red}>{choosedCard.name} </p>
                                  </div>
                              )
                      ) : "No winner"
                    }
                  </div>
                  <div className={s.battle_reward}>
                    <div className={s.reward_text}>Reward:</div>

                    {
                        (!!currentBattle.reward && (currentBattle.winner === +choosedCard.asset_id)) ?? renderReward()
                    }
                    {
                        !currentBattle.reward && <NftCard
                            className={s.reward__card}
                            rarity={choosedCard!.data.rarity}
                            card={{} as Asset}
                            isEmic={true}
                        />
                    }
                  </div>
                  <Link href={"/arena"}>
                    <a className={s.controls__go_back}>
                      <img src={BlackArrow.src}/>
                      Go to maps
                    </a>
                  </Link>
                </div>
            )}
          </div>
      )}
      {/*============================================================================================================*/}

      <div className={`${s.battle_content}${battle.finished ? " " + s.battle_content_finished : ""}`}>
        {!battle.starts && (
          <ArenaDropCard
            choosedCard={choosedCard}
            setChoosedCard={dropCardClickHandler}
            disabled={battle.found || battle.searching}
          />
        )}

        {!mobileChoosedCard && !battle.finished && battle.starts && battle.found && opponentCard && (
          <div className={`${s.emic_card_image} ${s.content__user_image_to_battle}`}>
            <Image
              src={`https://gateway.pinata.cloud/ipfs/${
                choosedCard!.data!.img
              }`}
              className={s.content__loading}
              layout="fill"
            />
          </div>
        )}

        {!mobileChoosedCard && battle.starts && !battle.battle && <Image src={light} />}

        {!mobileChoosedCard && !battle.starts && !battle.battle && (
          <ArenaHelpMessage
            text={helpMsgState.text}
            direction={helpMsgState.direction}
          />
        )}

        {!mobileChoosedCard && battle.battle && !battle.finished && (
            <div className={s.battle_gif}>
              <Image src={battleGif}  />
            </div>
        )}

        {!battle.finished && (
            <div className={s.opponent}>
              <div className={s.opponent__content}>
                {battle.searching && choosedCard && !battle.found && (
                    <div className={s.content__loading_container}>
                      <Image src={loading} className={s.content__loading} />
                    </div>
                )}

                {!battle.searching &&
                    battle.found &&
                    !battle.starts &&
                    opponentCard && (
                        <NftCard
                            className={s.opponent__card}
                            rarity={opponentCard!.data.rarity}
                            card={opponentCard as Asset}
                            isEmic={true}
                        />
                    )}

                {!mobileChoosedCard && battle.starts && battle.found && opponentCard && (
                    <div className={`${s.emic_card_image} ${s.content__opponent_image_to_battle}`}>
                      <Image
                          src={`https://gateway.pinata.cloud/ipfs/${
                              opponentCard!.data!.img
                          }`}
                          className={s.content__loading}
                          layout="fill"
                      />
                    </div>
                )}
              </div>
              <div className={s.opponent__controls}>{renderControlls()}</div>
            </div>
        )}

        {!mobileChoosedCard && battle.finished && currentBattle && choosedCard && opponentCard && (
              <div className={s.finished_content}>
                <div className={s.battle_cards}>
                  <NftCard
                      className={s.cards__item}
                      rarity={choosedCard!.data.rarity}
                      card={choosedCard as Asset}
                      isEmic={true}
                  />
                  <NftCard
                      className={s.cards__item}
                      rarity={opponentCard!.data.rarity}
                      card={opponentCard as Asset}
                      isEmic={true}
                  />
                </div>
                <div className={s.battle_info}>
                  {
                    currentBattle.winner ? (
                        +currentBattle.winner === +choosedCard.asset_id
                            ? (
                                <div className={s.info__text}>
                                  <p className={s.text_red}>{choosedCard.name}</p>
                                  <p>smashed</p>
                                  <p className={s.text_red}>{opponentCard.name} </p>
                                </div>
                            )
                            : (
                                <div className={s.info__text}>
                                  <p className={s.text_red}>{opponentCard.name}</p>
                                  <p>smashed</p>
                                  <p className={s.text_red}>{choosedCard.name} </p>
                                </div>
                            )
                    ) : "No winner"
                  }
                </div>
                <div className={s.battle_reward}>
                  <div className={s.reward_text}>Reward:</div>

                  {
                      (!!currentBattle.reward && (currentBattle.winner === +choosedCard.asset_id)) ?? renderReward()
                  }
                  {
                      !currentBattle.reward && <NftCard
                          className={s.reward__card}
                          rarity={choosedCard!.data.rarity}
                          card={{} as Asset}
                          isEmic={true}
                      />
                  }
                </div>
              </div>
        )}

      </div>
      {!mobileChoosedCard && battle.finished && currentBattle && choosedCard && opponentCard && (
          <Link href={"/arena"}>
            <a className={s.finished_go_back}>
              <img src={BlackArrow.src}/>
              Go to maps
            </a>
          </Link>
      )}
    </ArenaField>
  );
}

export default ArenaBattle;