import { useState } from "react";
import { Box } from "@mui/material";
import Share from "../Share/Share";
import Link from "next/link";
import { handleOpenModal } from "../../store/modal";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import helper from "../../styles/helper.module.scss";
import sound from "../../styles/sound.module.scss";


const SoundHead = ({music, handleOpenModal}) => {
    const [ activeButton, setActiveButton ] = useState(false)

    const changeButton = () => {
        setActiveButton(prev => !prev)
    }

    const showButton = activeButton ? 
        <div className={sound.button__close_wrapper}>
            <button 
                className={`${sound.button__share_close}`}
                onClick={changeButton}
            /> 
            <Share musicId={music?.id} changeButton={changeButton}/>
        </div>
        : <button 
            className={`${sound.button} ${sound.button__share}`}
            onClick={changeButton}
        />

    return (
        <Box className={sound.head}>
            <span className={sound.title}>
               {music?.title}
               
            </span>
            <Box className={`${helper.d__flex} ${helper.align__center}`}>
                <button className={`${sound.button} ${sound.button__heart}`}/>
                {showButton}
                <Link 
                    href={music?.audio} 
                    className={`${sound.button__text}`} 
                    download target="_blank"
                    onClick={() => handleOpenModal()}    
                >
                    <p className={sound.text__inner}>
                        Download
                    </p>
                </Link>
            </Box>
        </Box>
    )
}

const mapDispatchToProps = dispatch => ({
    handleOpenModal: bindActionCreators(handleOpenModal, dispatch)

})

export default connect(null, mapDispatchToProps)(SoundHead);