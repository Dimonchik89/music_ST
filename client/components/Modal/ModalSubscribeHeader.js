import { Box } from '@mui/material';
import Image from 'next/image';

import helper from "../../styles/helper.module.scss"
import modal from "../../styles/modal.module.scss"

import youtube from "../../static/icon/youtube_big.svg"

const ModalSubscribeHeader = () => {

    return (
        <Box className={`${helper.d__flex} ${helper.direction__column} ${helper.align__center}`}>
            <Image
                src={youtube}
                alt="youtube"
                width={78}
                height={54}
                className={modal.header__logo}
            />
            <Box className={modal.title__wrapper}>
                <p className={modal.title}>
                    Protect you video and release copyright claim
                </p>
            </Box>
        </Box>
    )
}
export default ModalSubscribeHeader;