import { Box } from "@mui/material";

import modal from "../../styles/modal.module.scss"

const ModalBlock = ({title, children}) => {

    return (
        <Box className={modal.block}>
            <Box className={modal.subtitle__wrapper}>
                <span className={modal.subtitle}>{title}</span>
            </Box>
            {children}
        </Box>
    )
}
export default ModalBlock;