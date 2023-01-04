import { useState } from "react";
import { Box } from "@mui/material";
import Share from "../Share/Share";
import Link from "next/link";

import helper from "../../styles/helper.module.scss";
import sound from "../../styles/sound.module.scss";

const SoundHead = ({music}) => {
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
            <Share musicId={music?.id}/>
        </div>
        : <button 
            className={`${sound.button} ${sound.button__share}`}
            onClick={changeButton}
        />

    return (
        <Box className={sound.head}>
            <span className={`${helper.fz__24} ${helper.color__white} ${helper.weight__medium}`}>
               {music?.title}
            </span>
            <Box className={`${helper.d__flex} ${helper.align__center}`}>
                <button className={`${sound.button} ${sound.button__heart}`}/>
                {showButton}
                <Link href={music?.audio} className={`${sound.button__text}`} download target="_blank">
                    <p>
                        Download
                    </p>
                </Link>
            </Box>
        </Box>
    )
}
export default SoundHead;