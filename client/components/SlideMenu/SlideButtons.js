import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { toggleMobileMenu } from '../../store/header';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';

import button from "../../styles/button.module.scss"

const SlideButtons = ({toggleMobileMenu}) => {
    const router = useRouter()
    
    return (
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <button 
                className={button.mobile__sm__white}
                onClick={() => {
                    router.push('/login')
                    toggleMobileMenu()
                }}
            >    
                Log in
            </button>
            <button 
                className={button.mobile__sm__yellowe}
                onClick={() => {
                    router.push('/register')
                    toggleMobileMenu()
                }}
            >    
                Sign Up
            </button>
        </Box>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleMobileMenu: bindActionCreators(toggleMobileMenu, dispatch)
})

export default connect(null, mapDispatchToProps)(SlideButtons);