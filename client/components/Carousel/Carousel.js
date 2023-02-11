import { useCallback, useRef } from 'react';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from "swiper";
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselItem from './CarouselItem';
import { Grid } from "swiper";

import carousel from "../../styles/carousel.module.scss";

SwiperCore.use([Navigation]);

const Carousel = ({styleWrapper, category}) => {
    const sliderRef = useRef(null)
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)

    const slides = category?.map((item, i) => (
        <SwiperSlide key={i} style={{merginRight: 0}}>
            <CarouselItem slide={item}/>
        </SwiperSlide>
    ))

    return (
        <Box className={styleWrapper}>
            <Box className={carousel.carousel__wrapper}>
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;
                    }}
                    modules={[Grid]}
                    className="mySwiper"
                    breakpoints={{
                        375: {
                            grid: {rows: 2, fill: "row"},
                            modules: [Grid],
                            slidesPerView: 2,
                            marginRight: 10,
                            slidesPerGroup: 2,
                        },
                        900: {
                            slidesPerView: 4,
                        }
                    }}
                >
                    {slides}
                </Swiper>

                <div 
                    ref={navigationPrevRef}
                    className={`${carousel.navigation} ${carousel.navigation__prev}`}
                > 
                    <ArrowBackIosNewIcon color="white"/>
                </div>
                <div 
                    ref={navigationNextRef}
                    className={`${carousel.navigation} ${carousel.navigation__next}`}
                > 
                    <ArrowForwardIosIcon color="white"/>
                </div>
            </Box>
        </Box>


    )
}
export default Carousel;