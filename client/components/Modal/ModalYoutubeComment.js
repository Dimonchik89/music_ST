import { Box } from "@mui/material"

import modal from "../../styles/modal.module.scss"

const ModalYoutubeComment = () => {
    
    return (
        <Box className={modal.info__container}>
            <p className={modal.info__item}>Song: The Temptation of a String</p>
            <p className={modal.info__item}>Music provided by TuneBox</p>
            <p className={modal.info__item}>Free Download: https://tunebox.com/track/12463-inspire/</p>
        </Box>
    )
}
export default ModalYoutubeComment