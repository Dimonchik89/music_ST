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
import { generateMusicLink } from "../../api/playApi";

import helper from "../../styles/helper.module.scss";
import button from "../../styles/button.module.scss";
import sound from "../../styles/sound.module.scss";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#7c7c7c",
  progressColor: "#F2D22B",
  cursorColor: "OrangeRed",
  barWidth: window.screen.width <=375 ? 1 : 3,
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 90,
  normalize: true,
  partialRender: true,
  xhr: {
        responseType: "arraybuffer",
        mode: "no-cors",
        dest: "audio",
        redirect: "follow"
      },
  preload: true,
  hideScrollbar: true
});


function WaveSurferNext({ currentTimeDublicate, music, togglePlay, showHeaderPlayer, selectMusic, changeProgress, headerMusic, allStop }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [ intervalId, setIntervalId ] = useState(null)
  const [ duration, setDuration ] = useState(0)
  const router = useRouter();
  const [timerLeft, setTimerLeft] = useState(0)

  const handleChangeProgress = () => {
    changeProgress(wavesurfer?.current?.getCurrentTime())
  }

  const handlePlay = () => {
      if(music.id != headerMusic?.id) {
        router.push({ 
          pathname: '/', 
          query: { ...router.query, sound: music.id } }, 
          undefined, 
          {scroll: false, shallow: true}
        )
        allStop()
        selectMusic(music.id)
      }
      showHeaderPlayer()
      togglePlay(music.id)
  }

  const handlePause = () => {
      togglePlay(music.id)
  }

  const clickOntimeScale = () => {
    if(!music.play) {
      handlePlay()
      return
    } else {
      return
    }
  }

  const selectButton = music.play ? <ButtonPlay handleClick={handlePause} styleClass={button.pause}/> : <ButtonPlay handleClick={handlePlay} styleClass={button.play}/>;

  useEffect(() => {
    const create = async () => {
      const WaveSurfer = (await import("wavesurfer.js")).default;

      const options = formWaveSurferOptions(waveformRef.current);

      wavesurfer.current = WaveSurfer?.create(options);
      const musicUrl = await generateMusicLink(music.audio)
      wavesurfer.current.load(musicUrl);

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

    setTimeout(() => {
      create();
    }, 500)
    
    // create();
    
    return () => {
      if (wavesurfer.current) {
        console.log("destroy");
        wavesurfer.current.destroy();
      }
    };
  }, [music?.audio]);

  let deltaTimerLeft = window.screen.width <= 375 ? -3 : 10;
  // let timerLeft = deltaTimerLeft + (music?.progress * (waveformRef.current?.scrollWidth / duration))

  useEffect(() => {
      setTimerLeft(deltaTimerLeft + (music?.progress * (waveformRef.current?.scrollWidth / duration)))

  }, [music?.progress])

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
            left: `${timerLeft}px`,
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
  allStop: bindActionCreators(allStop, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(WaveSurferNext);