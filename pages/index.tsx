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

SwiperCore.use([Pagination, Navigation])

const Main: NextPage = () => {
  return (
    <>
      <section className={s.intro}>
        <div className="container">
          <div className={s.intro__content}>
            <img className={s.content__logo} src="img/intro/1.svg" alt="" />
            <p className={s.content__text}>Собери всю коллекцию!</p>
            <button className={`${s.intro__btn} play_btn`}>
              Play <img src="img/navigation/btn.svg" alt="" />
            </button>
          </div>
        </div>

        <img className={s.intro__left_wave} src="img/intro/left.svg" alt="" />
        <img className={s.intro__left_star} src="img/intro/big_star.svg" alt="" />

        <img className={s.intro__right_wave} src="img/intro/right.svg" alt="" />

        <img className={s.intro__right_smaller_star} src="img/intro/smaller_star.svg" alt="" />
        <img className={s.intro__right_small_star} src="img/intro/small_star.svg" alt="" />
        <img className={s.intro__right_middle_star} src="img/intro/middle_star.svg" alt="" />


      </section>

      <section className={s.collection}>
        <div className="container_right">
          <div className={s.collection__content}>
            <div className={s.content__img}>
              <img src="img/collection/1.png" alt="" />
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
        <img src="img/collection/stars/big.svg" className={`${s.collection__star} ${s['collection__star-big']}`} alt="" />
        <img src="img/collection/stars/middle.svg" className={`${s.collection__star} ${s['collection__star-middle']}`} alt="" />
        <img src="img/collection/stars/small.svg" className={`${s.collection__star} ${s['collection__star-small']}`} alt="" />

        <img src="img/collection/stars/smaller.svg" className={`${s.collection__star} ${s['collection__star-smaller-first']}`} alt="" />
        <img src="img/collection/stars/smaller.svg" className={`${s.collection__star} ${s['collection__star-smaller-second']}`} alt="" />
        <img src="img/collection/stars/smaller.svg" className={`${s.collection__star} ${s['collection__star-smaller-third']}`} alt="" />

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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                        <img src="img/collection/2.png" />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                          <span className={s.item__count}>10</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                          <span className={s.item__count}>12</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                          <span className={s.item__count}>26</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                        <img src="img/collection/2.png" />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                          <span className={s.item__count}>10</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                          <span className={s.item__count}>12</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                          <span className={s.item__count}>26</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <div id='collection_white_pagination' className={`${s['collection-white__pagination']} swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal`}></div>
              </Swiper>

              <div id='collection_white_prev_arrow' className={s["collection-white__prev"]}>
                  <img src="img/collection/arrow.svg" alt="" />
                </div>

                <div id='collection_white_next_arrow' className={s['collection-white__next']}>
                  <img src="img/collection/arrow.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                        <img src="img/collection/2.png" />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                          <span className={s.item__count}>10</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                          <span className={s.item__count}>12</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                          <span className={s.item__count}>26</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          Legendary
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                        <img src="img/collection/2.png" />
                      </div>

                      <div className={s.info__rarity}>
                        Rare
                        <hr />
                      </div>

                      <p className={s.info__name}>Любопытный Эми </p>

                      <div className={s.info__attributes}>
                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                          <span className={s.item__count}>10</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                          <span className={s.item__count}>12</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                          <span className={s.item__count}>26</span>
                        </div>

                        <div className={s.attributes__item}>
                          <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
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
                          <img src="img/collection/2.png" />
                        </div>

                        <div className={s.info__rarity}>
                          epic
                          <hr />
                        </div>

                        <p className={s.info__name}>Любопытный Эми </p>

                        <div className={s.info__attributes}>
                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/1.svg" alt="" />
                            <span className={s.item__count}>10</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/2.svg" alt="" />
                            <span className={s.item__count}>12</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/3.svg" alt="" />
                            <span className={s.item__count}>26</span>
                          </div>

                          <div className={s.attributes__item}>
                            <img className={s.item__image} src="img/collection/card_attr/4.svg" alt="" />
                            <span className={s.item__count}>9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </SwiperSlide>

                <div id='collection_filled_pagination' className={`${s['collection-white__pagination']} swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal`}></div>
              </Swiper>
              <div id='collection_filled_prev_arrow' className={s["collection-white__prev"]}>
                  <img src="img/collection/arrow.svg" alt="" />
                </div>

                <div id='collection_filled_next_arrow' className={s['collection-white__next']}>
                  <img src="img/collection/arrow.svg" alt="" />
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
                    <img src="img/fights/1.png" alt=""/>
                </div>
            </div>
        </div>

        <img className={s.fights__line} src="img/fights/line.svg" alt=""/>
      </section>

      <section className={s.awards}>
        <div className="container">
            <h2 className='section_title'>Награды</h2>

            <div className={s.awards__content}>
                <div className={s.content__info}>
                    <div className={`${s.block_text} block_text`}>Не следует, однако забывать, что новая модель организационной деятельности позволяет выполнять важные задания по разработке систем массового участия. Задача организации, в особенности же постоянное</div>
                    
                    <div className={s.info__emi}>
                        <div className={s.emi__crown}>
                            <img src="img/awards/crown.svg" alt=""/>
                        </div>

                        <div className={s.emi__image}>
                            <img src="img/awards/emi.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className={s.content__cards}>
                    <img src="img/awards/cards.svg" alt=""/>
                </div>
            </div>
        </div>

        <img className={s.awards__bg} src="img/awards/bg.png" alt=""/>
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
                        <img src="img/upgrades/1.png" alt=""/>
                    </div>

                    <div className={s.emics__plus}>
                        <img src="img/upgrades/plus.svg" alt=""/>
                    </div>

                    <div className={s.emics__item}>
                        <img src="img/upgrades/1.png" alt=""/>
                    </div>
                </div>

                <div className={s.content__equal}>
                    <img src="img/upgrades/equal.svg" alt=""/>
                </div>

                <div className={s.content__card}>
                    <div className={s.card__image}>
                        <img src="img/upgrades/card.png" alt=""/>
                    </div>

                    <div className={s.card__attributes}>
                        <div className={`${s.attributes__item} ${s['attributes__item-health']}`}>
                            <div className={`${s.item__text} ${s.text_health}`}>+8</div>
                            <div className={s.item__img}>
                                <img src="img/upgrades/health.svg" alt=""/>
                            </div>
                        </div>
                        
                        <div className={`${s.attributes__item} ${s['attributes__item-defence']}`}>
                            <div className={`${s.item__text} ${s.text_defence}`}>+12</div>
                            <div className={s.item__img}>
                                <img src="img/upgrades/defence.svg" alt=""/>
                            </div>
                        </div>
                        
                        <div className={`${s.attributes__item} ${s['attributes__item-attack']}`}>
                            <div className={`${s.item__text} ${s.text_attack}`}>+17</div>
                            <div className={`${s.item__img} ${s.attack_img}`}>
                                <img src="img/upgrades/attack.svg" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <img className={`${s.cloud} ${s['cloud-first']}`} src="img/map/cloud_2.svg" alt=""/>
        <img className={`${s.cloud} ${s['cloud-second']}`} src="img/map/cloud.svg" alt=""/>
        <img className={`${s.cloud} ${s['cloud-third']}`} src="img/map/cloud_3.svg" alt=""/>

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

                    <img className={s.item__img} src="img/map/6.svg" alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-fifth']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 5</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={s.item__little_emi} src="img/map/emi_2.png" alt=""/>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src="img/map/5.png" alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src="img/map/mobile_ways/5.svg" alt=""/>

                    <img className={s.item__img} src="img/map/5.svg" alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-fourth']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 4</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src="img/map/4.png" alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src="img/map/mobile_ways/4.svg" alt=""/>
                    <img className={`${s.item__img}`} src="img/map/4.svg" alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-third']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 3</p>   
                            <p className={s.info__exp}>200 exp - 300 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src="img/map/3.png" alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src="img/map/mobile_ways/3.svg" alt=""/>
                    <img className={s.item__img} src="img/map/3.svg" alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-second']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 2</p>   
                            <p className={s.info__exp}>100 exp - 200 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src="img/map/2.png" alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src="img/map/mobile_ways/2.svg" alt=""/>
                    <img className={s.item__img} src="img/map/2.svg" alt=""/>
                </div>

                <div className={`${s.walkway__item} ${s['walkway__item-first']}`}>
                    <div className={s.item__block}>
                        <div className={s.block__info}>
                            <p className={s.info__level}>Уровень 1</p>   
                            <p className={s.info__exp}>10 exp - 100 exp</p>           
                        </div>
                    </div>

                    <img className={`${s.item__way} ${s['item__way-md']}`} src="img/map/1.png" alt=""/>
                    <img className={`${s.item__way} ${s['item__way-mb']}`} src="img/map/mobile_ways/1.svg" alt=""/>
                    <img className={s.item__big_emi} src="img/map/emi.png" alt=""/>
                    <img className={s.item__img} src="img/map/1.svg" alt=""/>
                </div>
            </div>
            <div className="container">
                <div className={s.content__text}>Таким образом дальнейшее развитие различных форм деятельности влечет за собой процесс внедрения и модернизации соответствующий условий активизации. Задача организации, в особенности же дальнейшее развитие различных форм </div>
            </div>
            <img className={s.bg_ellipse} src="img/map/Ellipse.svg" alt=""/>
        </div>
      </section>
    </>
  )
}

export default notWithAuth(Main)
