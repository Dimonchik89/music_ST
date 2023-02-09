import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SoundItem from "./SoundItem";
import { useRouter } from 'next/router';
import { selectMusics, actualMusics, loading } from "../../store/actualMusics";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from "@reduxjs/toolkit";

import sound from "../../styles/sound.module.scss";

// const musics = [
//     {
//         id: 1,
//         title: 'Numb',
//         logo: '../../static/images/sound/logo1.jpg',
//         audio: '../../static/music/Numb.mp3',
//         description: "This track is perfect for setting the mood for a yoga class or meditation. It's got a dreamy, ambient vibe that's peaceful and inspiring. This is royalty-free music, so you can use it in your project without having to worry about paying any fees!",
//         tag: ['rock', 'corporate'],
//         category: '1',
//     },
//     {
//         id: 2,
//         title: 'Toxy city',
//         logo: '../../static/images/sound/logo1.jpg',
//         audio: '../../static/music/system.mp3',
//         description: "Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar",
//         tag: ['dark'],
//         category: '1',
//     },
//     {
//         id: 3,
//         title: 'Ляпис - АУ',
//         logo: '../../static/images/sound/logo1.jpg',
//         audio: '../../static/music/ljapis_au.mp3',
//         description: "Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar",
//         tag: ['dark'],
//         category: '2',
//     },
//     {
//         id: 4,
//         title: 'Ляпис - Хяли-Гали',
//         logo: '../../static/images/sound/logo1.jpg',
//         audio: '../../static/music/ljapis_hali.mp3',
//         description: "Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar Lorem ipsum dollar",
//         tag: ['dark'],
//         category: '2',
//     }
// ]

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