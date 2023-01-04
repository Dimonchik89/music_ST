import { Box } from "@mui/material";
import SoundPlayer from "./SoundPlayer";

import helper from "../../styles/helper.module.scss";
import text from "../../styles/text.module.scss";
import button from "../../styles/button.module.scss"

const SoundContent = ({music}) => {

    const scale = {width: "100%", display: "flex", alignItems: "center", height: "45px", overflow: "hidden", position: "relative"}

    return (
        <Box className={`${helper.d__flex} ${helper.direction__column}`}>
            <Box>
                <span className={text.text__sm}>Tunebox</span>
            </Box>
            <Box className={helper.d__flex}>
                <SoundPlayer music={music} scale={scale} playStyle={button.play} pauseStyle={button.pause}/>  
            </Box>
        </Box>
    )
}
export default SoundContent;