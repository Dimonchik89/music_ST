import React, { useState, useEffect, useRef } from "react";
import ButtonPlay from "../Button/ButtonPlay";
import { useRouter } from "next/router";
import { togglePlay, changeProgress, resetProgress, allStop, currentTimeDublicate } from "../../store/actualMusics";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { showHeaderPlayer } from "../../store/player/playerSlice";
import { selectMusic } from "../../store/actualMusics";
import { createStructuredSelector } from 'reselect';
import { music } from "../../store/actualMusics";

import helper from "../../styles/helper.module.scss";
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

function WaveSurferNext({ currentTimeDublicate, music, togglePlay, showHeaderPlayer, selectMusic, changeProgress, resetProgress, scale, playStyle, pauseStyle, deltaTimerLeft, deltaHeight, headerMusic, allStop }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [ intervalId, setIntervalId ] = useState(null)
  const [ duration, setDuration ] = useState(0)
  const router = useRouter();

  const handleChangeProgress = () => {
    changeProgress(wavesurfer?.current?.getCurrentTime())
  }

  const handlePlay = () => {
      if(music.id != headerMusic?.id) {
        allStop()
      }
      if(headerMusic?.id !== music.id) {
        selectMusic(music.id)
        showHeaderPlayer()
        router.push({ 
          pathname: '/', 
          query: { ...router.query, sound: music.id } }, 
          undefined, 
          {scroll: false}
        )
      }
      
      togglePlay(music.id)
      
      // wavesurfer.current.play();
      
    // setIntervalId(setInterval(handleChangeProgress, 100))
  }

  const handlePause = () => {
      togglePlay(music.id)
      // wavesurfer.current.pause();
      // clearInterval(intervalId)
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


  let timerLeft = deltaTimerLeft + (music?.progress * (waveformRef.current?.scrollWidth / duration))
  //----------------------------
  useEffect(() => {
    wavesurfer?.current?.setCurrentTime(music?.progress)
  }, [currentTimeDublicate])

  useEffect(() => {
    if(music.play) {
      setTimeout(() => {
        wavesurfer?.current?.play();
      }, 1)
      setIntervalId(setInterval(handleChangeProgress, 100))
    } else {
      setTimeout(() => {
        wavesurfer?.current?.pause();
      }, 1)
      clearInterval(intervalId)
    }
  }, [music?.play])

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
    <>
      <div className={`${helper.d__flex} ${helper.align__end} ${helper.height__100}`}>
        {selectButton}
      </div>
      <div 
        className={sound.scale}
      >   
        <div id="waveform" ref={waveformRef} className={sound.waveform} onClick={clickOntimeScale}/>
        <div
          className={sound.timer}
          style={{
            left: timerLeft || 0,
          }}
        >
          <p className={sound.timer__text}>
            {howLongPlay()}
          </p>
        </div>
      </div>
    </>

  );
}

const mapStateToProps = createStructuredSelector({
  headerMusic: music,
  currentTimeDublicate
})

const mapDispatchToProps = dispatch => ({
  togglePlay: bindActionCreators(togglePlay, dispatch),
  showHeaderPlayer:  bindActionCreators(showHeaderPlayer, dispatch),
  selectMusic: bindActionCreators(selectMusic, dispatch),
  changeProgress: bindActionCreators(changeProgress, dispatch),
  resetProgress: bindActionCreators(resetProgress, dispatch),
  allStop: bindActionCreators(allStop, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(WaveSurferNext);