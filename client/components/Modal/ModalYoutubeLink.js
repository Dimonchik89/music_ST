import { Box, FormControl, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from "next/image";

import helper from "../../styles/helper.module.scss";
import modal from "../../styles/modal.module.scss"

import youtube from "../../static/icon/youtube_big.svg"

const ModalYoutubeLink = () => {

    return (
        <Box className={modal.youtube__link__container}>
            <form className={modal.form}>
                <Image
                    src={youtube}
                    alt="youtube"
                    width={45}
                    height={31}
                    className={modal.form__logo}
                />
                <input
                    placeholder="YouTube video link"
                    className={modal.input}
                    type="text"
                />
                <Box className={modal.submit__wrapper}>
                    <span className={modal.submit}>Submit</span>
                    <ArrowForwardIcon color="white"/>
                </Box>
            </form>
            <Box className={modal.submit__mobile__wrapper}>
                <button className={modal.submit__mobile}>
                    <span className={modal.submit}>Submit</span>
                    <ArrowForwardIcon color="white" size="large"/>
                </button>
            </Box>
        </Box>
    )
}
export default ModalYoutubeLink;