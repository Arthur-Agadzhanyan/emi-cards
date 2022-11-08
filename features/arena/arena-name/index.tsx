import { Rarity } from "@/interfaces/assets";
import React, { memo } from "react";
import s from "./arena-name.module.scss";

interface Props {
  pageName: string;
  rarity: Rarity;
  className?: string;
}

export const ArenaName = ({ pageName, rarity, className }: Props) => {
  return (
    <div
      className={`${s.arena_name} ${s[`arena_name-${rarity.toLowerCase()}`]}${
        !!className ? " " + className : ""
      }`}
    >
      <h2 className={s.name__title}>{pageName}</h2>
      <p className={s.name__subtitle}>{rarity}</p>
    </div>
  );
};