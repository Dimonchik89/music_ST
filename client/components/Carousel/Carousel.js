import { useCallback, useRef } from 'react';
import { Box } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselItem from './CarouselItem';
import { Grid } from "swiper";

import helper from "../../styles/helper.module.scss";
import text from "../../styles/text.module.scss";
import carousel from "../../styles/carousel.module.scss";
import { useEffect } from 'react';

const Carousel = ({styleWrapper, category}) => {
    const sliderRef = useRef(null)

    // useEffect(() => {
    //     console.log(category);
    // }, [category])

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    })

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

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
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
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