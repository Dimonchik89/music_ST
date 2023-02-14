import { useEffect, useState, useCallback, useMemo } from "react";
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

    const content = actualMusics?.map((item, i) => <SoundItem key={item.id} music={item}/>)

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