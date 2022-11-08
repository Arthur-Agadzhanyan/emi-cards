import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PageContainer, PageWrapper } from "@/shared/page";
import { withAuth } from "@/app/hocs/authentication";

import commonIcon from "@/public/img/arena/common.png";
import uncommonIcon from "@/public/img/arena/uncommon.png";
import rareIcon from "@/public/img/arena/rare.png";
import epicIcon from "@/public/img/arena/epic.png";
import legendaryIcon from "@/public/img/arena/legendary.png";
import mythicIcon from "@/public/img/arena/mythic.png";

import s from "@/styles/arena-page.module.scss";
import { ArenaName } from "@/features/arena";
import { Rarity } from "@/interfaces/assets";

interface ArenaInfo {
  name: string;
  rarity: Rarity;
  url: string;
  imgSrc: string;
}

function Arena() {
  const arenasInfo: ArenaInfo[] = [
    {
      name: "desert",
      rarity: Rarity.Common,
      url: "/arena/common",
      imgSrc: commonIcon.src,
    },
    {
      name: "forest",
      rarity: Rarity.Uncommon,
      url: "/arena/uncommon",
      imgSrc: uncommonIcon.src,
    },
    {
      name: "winther",
      rarity: Rarity.Rare,
      url: "/arena/rare",
      imgSrc: rareIcon.src,
    },
    {
      name: "mountain",
      rarity: Rarity.Epic,
      url: "/arena/epic",
      imgSrc: epicIcon.src,
    },
    {
      name: "sea",
      rarity: Rarity.Legendary,
      url: "/arena/legendary",
      imgSrc: legendaryIcon.src,
    },
    {
      name: "sky",
      rarity: Rarity.Mythic,
      url: "/arena/mythic",
      imgSrc: mythicIcon.src,
    },
  ];

  return (
    <PageWrapper>
      <PageContainer>
        <h1 className={`page__title ${s.page_title}`}>
          Choose an arena and start searching for an opponent among the equal
          rarity emics
        </h1>

        <div className={s.arenasContainer}>
          {arenasInfo.map((arena, i) => (
            <Link href={arena.url} key={arena.rarity}>
              <a className={`${i > 2 ? s.lastLink : ""}`}>
                <img src={arena.imgSrc} alt="" />

                <ArenaName className={s.arenaName} pageName={arena.name} rarity={arena.rarity} />
              </a>
            </Link>
          ))}
        </div>
      </PageContainer>
    </PageWrapper>
  );
}

export default withAuth(Arena);
