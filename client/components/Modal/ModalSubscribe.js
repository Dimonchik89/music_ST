import { Box, Modal } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import { showModal, handleCloseModal } from '../../store/modal';
import CloseIcon from '@mui/icons-material/Close';
import { createStructuredSelector } from "reselect";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import ModalSubscribeHeader from "./ModalSubscribeHeader";
import ModalBlock from "./ModalBlock";
import ModalYoutubeSubscribe from "./ModalYoutubeSubscribe";
import ModalYoutubeComment from "./ModalYoutubeComment";
import ModalYoutubeLink from "./ModalYoutubeLink";

import helper from "../../styles/helper.module.scss"
import modal from "../../styles/modal.module.scss"
import button from "../../styles/button.module.scss"


const ModalSubscribe = ({showModal, handleCloseModal}) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <Modal
            hideBackdrop
            open={showModal}
            onClose={handleCloseModal}
        >
            <Box 
                // sx={{ ...style, width: 200 }}
                className={modal.container}    
            >
                <IconButton
                    className={button.modal__close}
                    onClick={() => handleCloseModal()}
                >
                    <CloseIcon color="white" fontSize="large"/>
                </IconButton>
                <ModalSubscribeHeader/>
                <ModalBlock title="Subscribe to Youtube">
                    <ModalYoutubeSubscribe/>
                </ModalBlock>
                <ModalBlock title="Copy and paste this text into the description for your video">
                    <ModalYoutubeComment/>
                </ModalBlock>
                <ModalBlock title="Paste the link to your video we will take care of it">
                    <ModalYoutubeLink/>
                </ModalBlock>
            </Box>
        </Modal>
    )
}

const mapStateToProps = createStructuredSelector({
    showModal
})

const mapDispatchToProps = dispatch => ({
    handleCloseModal: bindActionCreators(handleCloseModal, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalSubscribe);