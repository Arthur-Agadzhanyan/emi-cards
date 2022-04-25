import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import s from '@/styles/main-page.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { notWithAuth } from '@/HOC/auth'

import introLogo from '@/public/img/intro/1.svg';
import introLeftArea from '@/public/img/intro/left.svg';
import introBigStar from "@/public/img/intro/big_star.svg";
import introSmallerStar from "@/public/img/intro/smaller_star.svg";
import introRigthArea from "@/public/img/intro/right.svg"

import playImg from "@/public/img/navigation/btn.svg"
import smallStar from "@/public/img/intro/small_star.svg"
import middleStar from '@/public/img/intro/middle_star.svg'

import collectionCards from '@/public/img/collection/1.png'
import collectionBigStar from '@/public/img/collection/stars/big.svg'
import collectionMiddleStar from '@/public/img/collection/stars/middle.svg'
import collectionSmallStar from '@/public/img/collection/stars/small.svg'
import collectionSmallerStar from '@/public/img/collection/stars/smaller.svg'

import collectionEmiImage from '@/public/img/collection/2.png'
import collectionEmiAttrHealth from "@/public/img/collection/card_attr/1.svg"
import collectionEmiAttrAttack from "@/public/img/collection/card_attr/2.svg"
import collectionEmiAttrSpeed from "@/public/img/collection/card_attr/3.svg"
import collectionEmiAttrLuck  from "@/public/img/collection/card_attr/4.svg"

import collectionSliderArrow from '@/public/img/collection/arrow.svg'

import fightsCards from '@/public/img/fights/1.png'
import fightsLine from '@/public/img/fights/line.svg'

import awardsCrown from '@/public/img/awards/crown.svg'
import awardsEmi from "@/public/img/awards/emi.png"
import awardsCards from '@/public/img/awards/cards.svg'
import awardsBg from '@/public/img/awards/bg.png'

import upgradesEmi from '@/public/img/upgrades/1.png'
import upgradesPlus from '@/public/img/upgrades/plus.svg'
import upgradesEqual from '@/public/img/upgrades/equal.svg'
import upgradesCard from '@/public/img/upgrades/card.png'

import upgradesHealthIcon from "@/public/img/upgrades/health.svg"
import upgradesDefenceIcon from '@/public/img/upgrades/defence.svg'
import upgradesAttackIcon from '@/public/img/upgrades/attack.svg'

import firstCloud from '@/public/img/map/cloud.svg'
import secondCloud from '@/public/img/map/cloud_2.svg'
import thirdCloud from '@/public/img/map/cloud_3.svg'

import mapItemFirst from '@/public/img/map/1.svg'
import mapItemSecond from '@/public/img/map/2.svg'
import mapItemThird from '@/public/img/map/3.svg'
import mapItemFourth from '@/public/img/map/4.svg'
import mapItemFifth from '@/public/img/map/5.svg'
import mapItemSixth from '@/public/img/map/6.svg'

import mapEmiFirst from '@/public/img/map/emi.png'
import mapEmiSecond from '@/public/img/map/emi_2.png'

import mapWayFirst from '@/public/img/map/1.png'
import mapWaySecond from '@/public/img/map/2.png'
import mapWayThird from '@/public/img/map/3.png'
import mapWayFourth from '@/public/img/map/4.png'
import mapWayFifth from '@/public/img/map/5.png'

import mapMobileWayFirst from '@/public/img/map/mobile_ways/1.svg'
import mapMobileWaySecond from '@/public/img/map/mobile_ways/2.svg'
import mapMobileWayThird from '@/public/img/map/mobile_ways/3.svg'
import mapMobileWayFourth from '@/public/img/map/mobile_ways/4.svg'
import mapMobileWayFifth from '@/public/img/map/mobile_ways/5.svg'

import mapEllipse from '@/public/img/map/Ellipse.svg'

SwiperCore.use([Pagination, Navigation])

const Main: NextPage = () => {
  return (
    <>
      <section className={s.intro}>
        <div className="container">
          <div className={s.intro__content}>
            <img className={s.content__logo} src={introLogo.src} alt="" />
            <p className={s.content__text}>Собери всю коллекцию!</p>
            <button className={`${s.intro__btn} play_btn`}>
              Play <img src={playImg.src} alt="" />
            </button>
          </div>
        </div>

        <img className={s.intro__left_wave} src={introLeftArea.src} alt="" />
        <img className={s.intro__left_star} src={introBigStar.src} alt="" />

        <img className={s.intro__right_wave} src={introRigthArea.src} alt="" />

        <img className={s.intro__right_smaller_star} src={introSmallerStar.src} alt="" />
        <img className={s.intro__right_small_star} src={smallStar.src} alt="" />
        <img className={s.intro__right_middle_star} src={middleStar.src} alt="" />

      </section>

      <section className={s.collection}>
        <div className="container_right">
          <div className={s.collection__content}>
            <div className={s.content__img}>
              <img src={collectionCards.src} alt="" />
            </div>

            <div className={s.content__info}>
              <div className={`${s.info__block} ${s['info__block-first']}`}>
                <h2 className={`collection_title ${s['text-right']}`}>Коллекция</h2>
                <p className={`block_text ${s["text-right"]}`}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм </p>
              </div>

              <div className={`${s.info__block} ${s["info__block-second"]}`}>
                <p className={s.second__text}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм </p>
              </div>
            </div>
          </div>
        </div>
        <img src={collectionBigStar.src} className={`${s.collection__star} ${s['collection__star-big']}`} alt="" />
        <img src={collectionMiddleStar.src} className={`${s.collection__star} ${s['collection__star-middle']}`} alt="" />
        <img src={collectionSmallStar.src} className={`${s.collection__star} ${s['collection__star-small']}`} alt="" />

        <img src={collectionSmallerStar.src} className={`${s.collection__star} ${s['collection__star-smaller-first']}`} alt="" />
        <img src={collectionSmallerStar.src} className={`${s.collection__star} ${s['collection__star-smaller-second']}`} alt="" />
        <img src={collectionSmallerStar.src} className={`${s.collection__star} ${s['collection__star-smaller-third']}`} alt="" />

      </section>

      <section className={s.collection_cards}>
        <div className={`${s.container} container`}>
          <div className={s.collection_cards__content}>
            <div className={s.content__header}>
              <h2 className={`collection_title ${s['text-right']}`}>Коллекция</h2>
              <p className={`block_text ${s['text-right']}`}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм </p>
            </div>

            {/* TODO: выделить слайдер в отдельный компонент */}
            <div className={s.content__slider}>
              <Swiper
                modules={[Navigation]}
                className={`${s['collection-white-slider']}`}

                pagination={{
                  clickable: true,
                  type: 'bullets',
                  el: `#collection_white_pagination`,
                  bulletElement: 'span',
                  bulletClass: `swiper-pagination-bullet ${s['swiper-pagination-bullet']}`,
                  bulletActiveClass: `${s['swiper-pagination-bullet-active']}`,
                  renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                  }
                }}

                loop={true}
                speed={1000}
                slidesPerView={4}
                spaceBetween={24}
                slidesPerGroup={2}

                navigation={{
                  prevEl: '#collection_white_prev_arrow',
                  nextEl: '#collection_white_next_arrow',
                }}

                onSlideChange={() => console.log('slide change')}

                breakpoints={{
                  320:{
                    slidesPerView: 1.15,
                    slidesPerGroup: 1,
                    spaceBetween: 12,
                  },
                  400:{
                      slidesPerView: 1.3,
                      slidesPerGroup: 1,
                      spaceBetween: 12,
                  },
                  
                  500:{
                      slidesPerView: 1.7,
                      slidesPerGroup: 1
                  },
                  600:{
                      slidesPerView: 2.2,
                      slidesPerGroup: 1
                  },
                  800:{
                      slidesPerView: 2.5,
                      slidesPerGroup: 1
                  },
                  1100:{
                      slidesPerView: 3
                  },
                  1400:{
                      slidesPerView: 4
                  },
                }
              }
              autoHeight= {true}
              >
                <SwiperSlide>
                  <div className={`${s['collection-white__slide']}`}>
                      <div className={`${s.slide__info} ${s['slide__info-legendary']}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']}`}>
                    <div className={`${s.slide__info} ${s['slide__info-rare']}`}>
                      <div className={s.info__hash}>#5636</div>

                      <div className={s.info__img}>
                        <img src={collectionEmiImage.src} />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']}`}>
                      <div className={`${s.slide__info} ${s['slide__info-epic']}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']}`}>
                      <div className={`${s.slide__info} ${s['slide__info-legendary']}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']}`}>
                    <div className={`${s.slide__info} ${s['slide__info-rare']}`}>
                      <div className={s.info__hash}>#5636</div>

                      <div className={s.info__img}>
                        <img src={collectionEmiImage.src} />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']}`}>
                      <div className={`${s.slide__info} ${s['slide__info-epic']}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <div id='collection_white_pagination' className={`${s['collection-white__pagination']} swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal`}></div>
              </Swiper>

              <div id='collection_white_prev_arrow' className={s["collection-white__prev"]}>
                  <img src={collectionSliderArrow.src} alt="" />
                </div>

                <div id='collection_white_next_arrow' className={s['collection-white__next']}>
                  <img src={collectionSliderArrow.src} alt="" />
                </div>
            </div>


            <div className={s.content__slider}>
            <Swiper
                modules={[Navigation]}
                className={`${s['collection-white-slider']}`}

                pagination={{
                  clickable: true,
                  type: 'bullets',
                  el: `#collection_filled_pagination`,
                  bulletElement: 'span',
                  bulletClass: `swiper-pagination-bullet ${s['swiper-pagination-bullet']}`,
                  bulletActiveClass: `${s['swiper-pagination-bullet-active']}`,
                  renderBullet: function (index, className) {
                    return '<span class="' + className + '"></span>';
                  }
                }}

                loop={true}
                speed={1000}
                slidesPerView={4}
                spaceBetween={24}
                slidesPerGroup={2}

                navigation={{
                  prevEl: '#collection_filled_prev_arrow',
                  nextEl: '#collection_filled_next_arrow',
                }}

                onSlideChange={() => console.log('slide change')}

                breakpoints={{
                  320:{
                    slidesPerView: 1.15,
                    slidesPerGroup: 1,
                    spaceBetween: 12,
                  },
                  400:{
                      slidesPerView: 1.3,
                      slidesPerGroup: 1,
                      spaceBetween: 12,
                  },
                  
                  500:{
                      slidesPerView: 1.7,
                      slidesPerGroup: 1
                  },
                  600:{
                      slidesPerView: 2.2,
                      slidesPerGroup: 1
                  },
                  800:{
                      slidesPerView: 2.5,
                      slidesPerGroup: 1
                  },
                  1100:{
                      slidesPerView: 3
                  },
                  1400:{
                      slidesPerView: 4
                  },
                }
              }
              autoHeight= {true}
              >
                <SwiperSlide>
                  <div className={`${s['collection-white__slide']} ${s['collection-white__slide-bg']} ${s['collection-white__slide-bg-legendary']}`}>
                      <div className={`${s.slide__info}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']} ${s['collection-white__slide-bg']} ${s['collection-white__slide-bg-rare']}`}>
                    <div className={`${s.slide__info} ${s['slide__info']}`}>
                      <div className={s.info__hash}>#5636</div>

                      <div className={s.info__img}>
                        <img src={collectionEmiImage.src} />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                    <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']} ${s['collection-white__slide-bg']} ${s['collection-white__slide-bg-epic']}`}>
                      <div className={`${s.slide__info}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']} ${s['collection-white__slide-bg']} ${s['collection-white__slide-bg-legendary']}`}>
                      <div className={`${s.slide__info}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']} ${s['collection-white__slide-bg']} ${s['collection-white__slide-bg-rare']}`}>
                    <div className={`${s.slide__info} ${s['slide__info']}`}>
                      <div className={s.info__hash}>#5636</div>

                      <div className={s.info__img}>
                        <img src={collectionEmiImage.src} />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className={`${s['collection-white__slide']} ${s['collection-white__slide-bg']} ${s['collection-white__slide-bg-epic']}`}>
                      <div className={`${s.slide__info}`}>
                        <div className={s.info__hash}>#5636</div>

                        <div className={s.info__img}>
                          <img src={collectionEmiImage.src} />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrHealth.src} alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrAttack.src} alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrSpeed.src} alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src={collectionEmiAttrLuck.src} alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <div id='collection_filled_pagination' className={`${s['collection-white__pagination']} swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal`}></div>
              </Swiper>
              <div id='collection_filled_prev_arrow' className={s["collection-white__prev"]}>
                  <img src={collectionSliderArrow.src} alt="" />
                </div>

                <div id='collection_filled_next_arrow' className={s['collection-white__next']}>
                  <img src={collectionSliderArrow.src} alt="" />
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className={s.fights}>
        <h2 className="section_title">Сражения</h2>
        
        <div className="container_left">
            <div className={s.fights__content}>
                <div className={s.content__info}>
                    <div className={s.info__text}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации </div>
                    <p className="block_text">Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм </p>
                    <p className="block_text">Не следует, однако забывать, что новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия. Задача организации, в особенности же постоянное </p>
                </div>

                <div className={s.content__img}>
                    <img src={fightsCards.src} alt=""/>
                </div>
            </div>
        </div>

        <img className={s.fights__line} src={fightsLine.src} alt=""/>
      </section>

      <section className={s.awards}>
        <div className="container">
            <h2 className='section_title'>Награды</h2>

            <div className={s.awards__content}>
                <div className={s.content__info}>
                    <div className={`${s.block_text} block_text`}>Не следует, однако забывать, что новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия. Задача организации, в особенности же постоянное</div>
                    
                    <div className={s.info__emi}>
                        <div className={s.emi__crown}>
                            <img src={awardsCrown.src} alt=""/>
                        </div>

                        <div className={s.emi__image}>
                            <img src={awardsEmi.src} alt=""/>
                        </div>
                    </div>
                </div>

                <div className={s.content__cards}>
                    <img src={awardsCards.src} alt=""/>
                </div>
            </div>
        </div>

        <img className={s.awards__bg} src={awardsBg.src} alt=""/>
      </section>

      <section className={s.upgrades}>
        <div className={s.upgrades__header}>
            <h2 className={`${s.section_title} section_title`}>Апгрейды</h2>
            <div className={`${s.block_text} block_text`}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации</div>
        </div>
        
        <div className={`${s.container} container`}>
            <div className={s.upgrades__content}>
                <div className={s.content__emics}>
                    <div className={s.emics__item}>
                        <img src={upgradesEmi.src} alt=""/>
                    </div>

                    <div className={s.emics__plus}>
                        <img src={upgradesPlus.src} alt=""/>
                    </div>

                    <div className={s.emics__item}>
                        <img src={upgradesEmi.src} alt=""/>
                    </div>
                </div>

                <div className={s.content__equal}>
                    <img src={upgradesEqual.src} alt=""/>
                </div>

                <div className={s.content__card}>
                    <div className={s.card__image}>
                        <img src={upgradesCard.src} alt=""/>
                    </div>

                    <div className={s.card__attributes}>
                        <div className={`${s.attributes__item} ${s['attributes__item-health']}`}>
                            <div className={`${s.item__text} ${s.text_health}`}>+8</div>
                            <div className={s.item__img}>
                                <img src={upgradesHealthIcon.src} alt=""/>
                            </div>
                        </div>
                        
                        <div className={`${s.attributes__item} ${s['attributes__item-defence']}`}>
                            <div className={`${s.item__text} ${s.text_defence}`}>+12</div>
                            <div className={s.item__img}>
                                <img src={upgradesDefenceIcon.src} alt=""/>
                            </div>
                        </div>
                        
                        <div className={`${s.attributes__item} ${s['attributes__item-attack']}`}>
                            <div className={`${s.item__text} ${s.text_attack}`}>+17</div>
                            <div className={`${s.item__img} ${s.attack_img}`}>
                                <img src={upgradesAttackIcon.src} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <img className={`${s.cloud} ${s['cloud-first']}`} src={secondCloud.src} alt=""/>
        <img className={`${s.cloud} ${s['cloud-second']}`} src={firstCloud.src} alt=""/>
        <img className={`${s.cloud} ${s['cloud-third']}`} src={thirdCloud.src} alt=""/>

      </section>

      <section className={s.map}>
        <div className={s.map__header}>
            <h2 className="section_title">Карта</h2>
        </div>

        <div className={s.map__content}>
            <div className={s.content__walkway}>
                <div className={`${s.walkway__item} ${s['walkway__item-sixth']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 6</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={s.item__img} src={mapItemSixth.src} alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-fifth']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 5</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={s.item__little_emi} src={mapEmiSecond.src} alt=""/>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src={mapWayFifth.src} alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src={mapMobileWayFifth.src} alt=""/>

                    <img className={s.item__img} src={mapItemFifth.src} alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-fourth']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 4</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src={mapWayFourth.src} alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src={mapMobileWayFourth.src} alt=""/>
                    <img className={`${s.item__img}`} src={mapItemFourth.src} alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-third']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 3</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src={mapWayThird.src} alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src={mapMobileWayThird.src} alt=""/>
                    <img className={s.item__img} src={mapItemThird.src} alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-second']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 2</p>   
                            <p className={s.info__exp}>100 exp - 200 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src={mapWaySecond.src} alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src={mapMobileWaySecond.src} alt=""/>
                    <img className={s.item__img} src={mapItemSecond.src} alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-first']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 1</p>   
                            <p className={s.info__exp}>10 exp - 100 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src={mapWayFirst.src} alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src={mapMobileWayFirst.src} alt=""/>
                    <img className={s.item__big_emi} src={mapEmiFirst.src} alt=""/>
                    <img className={s.item__img} src={mapItemFirst.src} alt=""/>
                </div>
            </div>
            <div className="container">
                <div className={s.content__text}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм </div>
            </div>
            <img className={s.bg_ellipse} src={mapEllipse.src} alt=""/>
        </div>
      </section>
    </>
  )
}

export default notWithAuth(Main)
