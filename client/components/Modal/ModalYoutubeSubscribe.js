import { Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from 'next/router';
import Link from "next/link"

import helper from "../../styles/helper.module.scss"
import modal from "../../styles/modal.module.scss"
import button from "../../styles/button.module.scss"

import logo from "../../static/images/Logo_sm.png"

const ModalYoutubeSubscribe = () => {

    return (
        <Box 
            className={modal.youtube__container}
        >
            <Box className={modal.logo__block}>
                <Image
                    src={logo}
                    alt="logo"
                    width={126}
                    height={114}
                />
                <span className={modal.text}>TuneBox: Free music for Content Creators</span>
            </Box>
            <Box className={modal.button__block}>
                <Link href="https://www.youtube.com/@tuneboxmusic" className={button.model__subscribe} target="_blank">
                    Subscribe
                </Link>
            </Box>
        </Box>
    )
}
export default ModalYoutubeSubscribe;