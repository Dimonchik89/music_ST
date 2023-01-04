import { Box } from '@mui/material';
import { useRouter } from 'next/router'
import { allStop } from '../../store/actualMusics';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideHeaderPlayer } from '../../store/player/playerSlice';

import helper from "../../styles/helper.module.scss";
import text from "../../styles/text.module.scss";
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
                    src={slide.image}
                    alt="category"
                />
            </picture>
            <Box className={carousel.carousel__title_wrapper}>
                <span className={`${text.title} ${helper.color__white} ${helper.text__capitalize}`}>
                    {slide.title}
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