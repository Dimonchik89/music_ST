import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import SoundPlayer from '../Sound/SoundPlayer';
import ButtonPlay from '../Button/ButtonPlay';
import { togglePlay, changeProgress, cahngeCurrentTimeDublicate } from "../../store/actualMusics";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import helper from "../../styles/helper.module.scss";
import header from "../../styles/header.module.scss";
import button from "../../styles/button.module.scss"
import sound from "../../styles/sound.module.scss";


const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#7c7c7c",
  progressColor: "#F2D22B",
  cursorColor: "OrangeRed",
  barWidth: window.screen.width <= 375 ? 1 : 3,
  barRadius: 3,
  responsive: true,
  height: 104,
  normalize: true,
  partialRender: true,
});

const HeaderPlayerMusic = ({music, togglePlay, changeProgress, cahngeCurrentTimeDublicate}) => {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);
    const [ intervalId, setIntervalId ] = useState(null)
    const [duration, setDuration] = useState(0)
    const [ timerLeft, setTimerLeft] = useState(0)

    const handleChangeProgress = () => {
        changeProgress(wavesurfer?.current?.getCurrentTime())
    }

    useEffect(() => {
        setTimerLeft(10 + (music?.progress * (waveformRef.current?.scrollWidth / duration)))
    }, [music?.progress])

    const handlePlay = () => {
        togglePlay(music.id)
    }

    const handlePause = () => {
        togglePlay(music.id)
        clearInterval(intervalId)
    }

    const clickOntimeScale = async () => {

        setTimeout(() => {
            console.log(wavesurfer?.current.getCurrentTime());
            handleChangeProgress()
            cahngeCurrentTimeDublicate(wavesurfer?.current?.getCurrentTime())
        }, 0);

        if(!music.play) {            
            handlePlay()
            return
        } else {
            return
        }
    }

    const scale = {width: "100%", display: "flex", alignItems: "center", height: "52px", overflow: "hidden", position: "relative"}

    const selectButton = music?.play ? <ButtonPlay handleClick={handlePause} styleClass={header.pause__button}/> : <ButtonPlay handleClick={handlePlay} styleClass={header.play__button}/>;

     useEffect(() => {
        const create = async () => {
            const WaveSurfer = (await import("wavesurfer.js")).default;

            const options = formWaveSurferOptions(waveformRef.current);

            wavesurfer.current = WaveSurfer.create(options);
            wavesurfer.current.load(music?.audio);

            wavesurfer.current.on("audioprocess", function () {
                const currentTime = wavesurfer.current.getCurrentTime();
            });

            wavesurfer.current.on("ready", function () {
                const duration = wavesurfer.current.getDuration();
                setDuration(duration)
            });

            if(waveformRef?.current?.children.length > 1) {
                waveformRef?.current?.children[0]?.remove()
            }
        };
    
        create();
    
        return () => {
        if (wavesurfer.current) {
            console.log("destroy");
            wavesurfer.current.destroy();
        }
        };
    }, [music?.audio]);

    useEffect(() => {
        setTimeout(() => {
            wavesurfer?.current?.setCurrentTime(music?.progress)
        }, 1)

    }, [music?.progress])

    const howLongPlay = () => {
        if(Math.floor(music?.progress) >= 60 && (music?.progress % 60) > 10) {
        return `${Math.floor(music?.progress / 60)}: ${Math.floor(music?.progress % 60)}`
        } else if(Math.floor(music?.progress) >= 60 && (music?.progress % 60) < 10) {
        return `${Math.floor(music?.progress / 60)}: 0${Math.floor(music?.progress % 60)}`
        } else if(Math.floor(music?.progress) >= 10) {
        return `0: ${Math.floor(music?.progress)}`
        } else if(Math.floor(music?.progress) < 10 ) {
        return `0: 0${Math.floor(music?.progress)}`
        }
    }

    const howLongduration = () => {
        if(Math.floor(duration) >= 60 && (duration % 60) > 10) {
        return `${Math.floor(duration / 60)}: ${Math.floor(duration % 60)}`
        } else if(Math.floor(duration) >= 60 && (duration % 60) < 10) {
        return `${Math.floor(duration / 60)}: 0${Math.floor(duration % 60)}`
        } else if(Math.floor(duration) >= 10) {
        return `0: ${Math.floor(duration)}`
        } else if(Math.floor(duration) < 10 ) {
        return `0: 0${Math.floor(duration)}`
        }
    }

    const marginLeft = window.screen.width <= 375 ? 7 : 48

    return (
        <Box className={header.player__music__wrapper}>
            <Box className={header.player__music}>
                <Box className={`${helper.d__flex} ${helper.align__end}`}>
                    <div className={`${helper.d__flex} ${helper.align__end} ${helper.width__100}`}>
                        <div className={`${helper.d__flex} ${helper.align__end} ${helper.height__100}`}>
                            {selectButton}
                        </div>
                        <div 
                            className={header.player__scale}
                        >   
                            <div className={header.sound__start}>
                                <span className={helper.color__white}>
                                    0:00
                                </span>
                            </div>
                            <div id="waveform" ref={waveformRef} className={header.waveform} onClick={clickOntimeScale}/>
                            <div
                                className={sound.timer}
                                style={{
                                    left: timerLeft + marginLeft || 18,
                                }}
                            >
                                <p className={sound.timer__text}>
                                    {howLongPlay()}
                                </p>
                            </div>
                            <div className={`${helper.d__flex} ${helper.align__end} ${helper.height__100}`}>
                                <span className={helper.color__white}>
                                    {howLongduration()}
                                </span>
                            </div>
                            
                        </div>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}

const mapDispatchToProps = dispatch => ({
    togglePlay: bindActionCreators(togglePlay, dispatch),
    changeProgress: bindActionCreators(changeProgress, dispatch),
    cahngeCurrentTimeDublicate: bindActionCreators(cahngeCurrentTimeDublicate, dispatch),
})

export default connect(null, mapDispatchToProps)(HeaderPlayerMusic)