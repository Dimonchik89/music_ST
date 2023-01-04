import { useCallback, useRef } from 'react';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselItem from './CarouselItem';

import helper from "../../styles/helper.module.scss";
import text from "../../styles/text.module.scss";
import carousel from "../../styles/carousel.module.scss";

const Carousel = ({styleWrapper, category}) => {
    const sliderRef = useRef(null)

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    })

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const slides = category?.map((item, i) => (
        <SwiperSlide key={i}>
            <CarouselItem slide={item}/>
        </SwiperSlide>
    ))

    return (
        <Box className={styleWrapper}>
            <Box className={carousel.carousel__wrapper}>
                <Swiper
                    freeMode={true}
                    grabCursor={true}
                    spaceBetween={20}
                    slidesPerView={4}
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {}}
                    navigation
                    breakpoints={{
                        
                    }}
                    ref={sliderRef}
                >
                    {slides}
                </Swiper>  

                <IconButton 
                    className={`${carousel.navigation} ${carousel.navigation__prev}`}
                    onClick={handlePrev}
                > 
                    <ArrowBackIosNewIcon color="white"/>
                </IconButton>
                <IconButton 
                    className={`${carousel.navigation} ${carousel.navigation__next}`}
                    onClick={handleNext}
                > 
                    <ArrowForwardIosIcon color="white"/>
                </IconButton>
            </Box>
        </Box>


    )
}
export default Carousel;