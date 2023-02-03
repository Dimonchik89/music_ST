import { Box } from "@mui/material";

import sound from "../../styles/sound.module.scss";

const SoundLogo = ({iconPath}) => {

    return (
        <Box className={sound.logo__container}>
            <picture>
                <img
                    className={sound.logo}
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${iconPath}`}
                    alt="logo"
                />
            </picture>
        </Box>
    )
}
export default SoundLogo;