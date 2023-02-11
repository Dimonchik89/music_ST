import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SoundItem from "./SoundItem";
import { useRouter } from 'next/router';
import { selectMusics, actualMusics, loading } from "../../store/actualMusics";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from "@reduxjs/toolkit";
import useHttp from "../../hooks/useHttp";

import sound from "../../styles/sound.module.scss";

const Sound = ({actualMusics, selectMusics, loading}) => {
    const { query } = useRouter();

    useEffect(() => {
        selectMusics(actualMusics.filter(item => {
            if(query.category) {
                return item.category == query.category
            } else {
                return item.category === "1"
            }
        }).map(item => ({...item, play: false})))
        
    }, [query.category])

    const content = actualMusics?.map((item, i) => <SoundItem key={i} music={item}/>)

    if(loading) {
        return <h2>Loading...</h2>
    }

    return (
        <Box className={sound.container}>
            <Box className={sound.wrapper}>
                {content}
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    actualMusics,
    loading
})

const mapDispatchToProps = dispatch => ({
    selectMusics: bindActionCreators(selectMusics, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sound);