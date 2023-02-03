import { Box } from "@mui/material";
import SoundLogo from "./SoundLogo";
import SoundHead from "./SoundHead";
import SoundContent from "./SoundContent";

import sound from "../../styles/sound.module.scss";

const SoundItem = ({music}) => {
    return (
        <Box className={sound.inner}>
            <Box className={sound.item}>
                <SoundLogo iconPath={music?.img}/>

                <Box className={sound.content}>
                    <SoundHead music={music}/>
                    <SoundContent music={music}/>
                </Box>
            </Box>
        </Box>
    )
}
export default SoundItem;