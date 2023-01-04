import { useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import SoundPlayer from '../Sound/SoundPlayer';

import helper from "../../styles/helper.module.scss";
import header from "../../styles/header.module.scss";

const HeaderPlayerMusic = ({music}) => {

    const scale = {width: "100%", display: "flex", alignItems: "center", height: "52px", overflow: "hidden", position: "relative"}

    return (
        <Box className={header.player__music__wrapper}>
            <Box className={header.player__music}>
                <Box className={helper.d__flex}>
                    {/* <button className={header.play__button}>
                        <Image
                            // className={header.play__button}
                            src={"/static/icon/play-white-big.svg"}
                            width={43}
                            height={43}
                            alt="play"
                        />
                    </button> */}
                    <SoundPlayer music={music} scale={scale} playStyle={header.play__button} pauseStyle={header.pause__button}/>
                </Box>
            </Box>
        </Box>
    )
}
export default HeaderPlayerMusic