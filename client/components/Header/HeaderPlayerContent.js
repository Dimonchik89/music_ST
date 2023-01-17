import { Box } from "@mui/material"
import Image from "next/image";
import Link from "next/link";
import Share from "../Share/Share";

import helper from "../../styles/helper.module.scss"
import header from "../../styles/header.module.scss"
import button from "../../styles/button.module.scss"
import sound from "../../styles/sound.module.scss";

const HeaderPlayerContent = ({music, changeButton, setFocusDownload, activeButton, focusDownload}) => {
    const headerStyle = {
        right: '-2rem',
        borderRadius: "2rem"
    }

    const showButton = activeButton ? 
        <div className={header.button__close_wrapper}>
            <button 
                className={` ${button.header__close} ${button.header__square}`}
                onClick={changeButton}
            /> 
            <Share musicId={music?.id} addedStyle={headerStyle} changeButton={changeButton}/>
        </div>
        : <button 
            className={`${button.header__square} ${header.button__share}`}
            onClick={changeButton}
        />

    const downloadStyle = focusDownload ? button.header__download__hover : null;
    
    const downloadIcon = focusDownload ? 
        <Image
            style={{marginBottom: '7px'}}
            src="/static/icon/download-black.svg"
            width={20}
            height={21}
            alt="download"
        /> : 
        <Image
            style={{marginBottom: '7px'}}
            src="/static/icon/download.svg"
            width={20}
            height={21}
            alt="download"
        />

    return (
        <Box className={header.content}>
            <h2 className={header.title}>
                {music?.title}
            </h2>
            <p className={header.subtitle}>Tunebox</p>
            <Box className={header.description__wrapper}>
                <p className={header.text}>{music?.description}</p>
            </Box>
            <Box className={header.button__group}>
                <Link
                    download
                    target="_blank"
                    className={`${button.header__download} ${downloadStyle}`}
                    href={music?.audio}
                    onMouseEnter={() => setFocusDownload(true)}
                    onMouseLeave={() => setFocusDownload(false)}
                >
                    {downloadIcon}
                    <p>
                        Download
                    </p>
                </Link>
                <Box className={helper.d__flex}>
                    <button className={`${button.header__square} ${button.header__heart}`}/>
                    {showButton}
                </Box>
            </Box>
        </Box>
    )
}
export default HeaderPlayerContent