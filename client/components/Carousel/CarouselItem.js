import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router'
import { allStop } from '../../store/actualMusics';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideHeaderPlayer } from '../../store/player/playerSlice';
import { selectActualCategoryId, actualCategoryId } from '../../store/category';
import { createStructuredSelector } from 'reselect';
import { changeLimit } from '../../store/actualMusics';

import carousel from "../../styles/carousel.module.scss";

const CarouselItem = ({slide, allStop, hideHeaderPlayer, selectActualCategoryId, actualCategoryId, changeLimit}) => {
    const [style, setStyle] = useState("")
    const router = useRouter();

    const handleChangeQuery = () => {
        hideHeaderPlayer()
        allStop()
        router.push({ 
            pathname: '/', 
            query: { categoryId: slide.id } }, 
            undefined, 
            {scroll: false}
        )
        selectActualCategoryId(slide.id)
        changeLimit(process.env.NEXT_PUBLIC_SOUND_LIMIT)
    }

    useEffect(() => {
        if(actualCategoryId === slide.id) {
            setStyle(`${carousel.carousel__item} ${carousel.active}`)
        } else {
            setStyle(`${carousel.carousel__item}`)
        }
    }, [actualCategoryId])

    return (
        <Box className={style} onClick={handleChangeQuery}>
            <picture>
                <img
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${slide.img}`}
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

const mapStateToProps = createStructuredSelector({
    actualCategoryId
})

const mapDispatchToProps = dispatch => ({
    allStop: bindActionCreators(allStop, dispatch),
    hideHeaderPlayer: bindActionCreators(hideHeaderPlayer, dispatch),
    selectActualCategoryId: bindActionCreators(selectActualCategoryId, dispatch),
    changeLimit: bindActionCreators(changeLimit, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);