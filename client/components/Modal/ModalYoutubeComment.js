import { Box } from "@mui/material"
import { songIsDownloading } from "../../store/actualMusics"
import { connect } from "react-redux"
import { createStructuredSelector } from 'reselect';


import modal from "../../styles/modal.module.scss"

const ModalYoutubeComment = ({songIsDownloading}) => {
    
    return (
        <Box className={modal.info__container}>
            <p className={modal.info__item}>Song: {songIsDownloading.name}</p>
            <p className={modal.info__item}>Music provided by TuneBox</p>
            <p className={modal.info__item}>Free Download: https://tunebox.com/?sound={songIsDownloading.id}</p>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    songIsDownloading
})

export default connect(mapStateToProps)(ModalYoutubeComment)