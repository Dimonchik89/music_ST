import { Box } from '@mui/material';
import { useRouter } from 'next/router'
import { allStop } from '../../store/actualMusics';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideHeaderPlayer } from '../../store/player/playerSlice';

import carousel from "../../styles/carousel.module.scss";

const CarouselItem = ({slide, allStop, hideHeaderPlayer}) => {
    const router = useRouter();

    const handleChangeQuery = () => {
        hideHeaderPlayer()
        allStop()
        router.push({ 
            pathname: '/', 
            query: { category: slide.id } }, 
            undefined, 
            {scroll: false}
        )
    }

    return (
        <Box className={carousel.carousel__item} onClick={handleChangeQuery}>
            <picture>
                <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}/${slide.img}`}
                    alt="category"
                />
            </picture>
            <Box className={carousel.carousel__title_wrapper}>
                <span className={`${carousel.title}`}>
                    {slide.name}
                </span>
            </Box>
            
        </Box>
    )
}

const mapDispatchToProps = dispatch => ({
    allStop: bindActionCreators(allStop, dispatch),
    hideHeaderPlayer: bindActionCreators(hideHeaderPlayer, dispatch)
})

export default connect(null, mapDispatchToProps)(CarouselItem);