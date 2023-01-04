import React, { useState, useEffect, useRef } from "react";
import ButtonPlay from "../Button/ButtonPlay";
import { useRouter } from "next/router";
import { togglePlay, changeProgress, resetProgress } from "../../store/actualMusics";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { showHeaderPlayer } from "../../store/player/playerSlice";
import { selectMusic } from "../../store/actualMusics";
import { createStructuredSelector } from 'reselect';

import button from "../../styles/button.module.scss";
import sound from "../../styles/sound.module.scss";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#7c7c7c",
  progressColor: "#F2D22B",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 90,
  normalize: true,
  partialRender: true,
});

function WaveSurferNext({ music, togglePlay, showHeaderPlayer, selectMusic, changeProgress, resetProgress, scale, playStyle, pauseStyle }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [ intervalId, setIntervalId ] = useState(null)
  const [ duration, setDuration ] = useState(0)
  const router = useRouter();

const handleChangeProgress = () => {
  changeProgress(wavesurfer.current?.getCurrentTime())
}

  useEffect(() => {
    console.log('intervalId', intervalId)
  }, [intervalId])

  const handlePlay = () => {
        resetProgress() // 
        togglePlay(music.id)
        showHeaderPlayer()
        selectMusic(music.id)
        router.push({ 
            pathname: '/', 
            query: { ...router.query, sound: music.id } }, 
            undefined, 
            {scroll: false}
        )

        wavesurfer.current.play();
      
      setIntervalId(setInterval(handleChangeProgress, 500))
    }

  const handlePause = () => {
      togglePlay(music.id)
      wavesurfer.current.pause();
      
      clearInterval(intervalId)
  }

  const clickOntimeScale = () => {
    if(!music.play) {
      handlePlay()
      return
    } else {
      return
    }
  }

  const selectButton = music.play ? <ButtonPlay handleClick={handlePause} styleClass={pauseStyle}/> : <ButtonPlay handleClick={handlePlay} styleClass={playStyle}/>;

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
        wavesurfer.current?.setCurrentTime(music?.progress)
        const duration = wavesurfer.current.getDuration();
        setDuration(duration);
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

  let timerLeft = 40 + (music?.progress * (waveformRef.current?.scrollWidth / duration))

  //----------------------------

  useEffect(() => {
      wavesurfer.current?.setCurrentTime(music?.progress)
  }, [music?.progress])

  //--------------------------


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

  return (
    <div 
      style={scale}
    >
      <div style={{display: 'flex', alignItems: 'flex-end', height: "100%"}}>
        {selectButton}
      </div>
        
      <div id="waveform" ref={waveformRef} style={{flex: '1 0 auto', maxWidth: "80%", marginLeft: "30px", marginTop: "45px"}} onClick={clickOntimeScale}/>
      <div
        className={sound.timer}
        style={{
          left: timerLeft,
        }}
      >
        <p className={sound.timer__text}>
          {howLongPlay()}
        </p>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  togglePlay: bindActionCreators(togglePlay, dispatch),
  showHeaderPlayer:  bindActionCreators(showHeaderPlayer, dispatch),
  selectMusic: bindActionCreators(selectMusic, dispatch),
  changeProgress: bindActionCreators(changeProgress, dispatch),
  resetProgress: bindActionCreators(resetProgress, dispatch),
})

export default connect(null, mapDispatchToProps)(WaveSurferNext);