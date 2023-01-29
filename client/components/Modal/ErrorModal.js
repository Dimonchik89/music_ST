import { Modal, Box, Typography } from "@mui/material"

import modal from "../../styles/modal.module.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  p: 4,
};

const ErrorModal = ({open, handleClose, text}) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box 
                sx={style}
                className={modal.error__container}    
            >
                <Typography 
                    variant="h4" 
                    component="h2"
                    align="center"    
                >
                    {text}
                </Typography>
            </Box>
        </Modal>
    )
}
export default ErrorModal;