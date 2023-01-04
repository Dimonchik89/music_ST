import { useState, } from "react";
import { Box, Container } from "@mui/system";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { music } from "../../store/actualMusics";
import HeaderPlayerLogo from "./HeaderPlayerLogo";
import HeaderPlayerContent from "./HeaderPlayerContent";
import HeaderPlayerMusic from "./HeaderPlayerMusic";

import helper from "../../styles/helper.module.scss"
import header from "../../styles/header.module.scss"

const HeaderPlayer = ({music}) => {
    const [ focusDownload, setFocusDownload ] = useState(false)
    const [ activeButton, setActiveButton ] = useState(false)

    const changeButton = () => {
        setActiveButton(prev => !prev)
    }

    return (
        <Box
            className={header.player}
        >
            <Container maxWidth="xl">
                <Box>
                    <Box className={`${helper.d__flex}`}>
                        <HeaderPlayerLogo logoPath={music?.logo}/>
                        <HeaderPlayerContent 
                            music={music} 
                            changeButton={changeButton} 
                            setFocusDownload={setFocusDownload} 
                            activeButton={activeButton}
                            focusDownload={focusDownload}
                        />
                    </Box>
                    <HeaderPlayerMusic music={music}/>
                </Box>
            </Container>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    music
})

export default connect(mapStateToProps)(HeaderPlayer);