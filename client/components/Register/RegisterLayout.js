import { useRef } from "react";
import { Box } from "@mui/system";
import register from "../../styles/register.module.scss";
import RegisterForm from "./RegisterForm";
import RegisterRoute from "./RegisterRoute";
import logo from "../../styles/logo.module.scss";
import HeaderMobile from "../Header/HeaderModile";
import { mobileMenu, mobileSearch, toggleMobileMenu, toggleMobileSearch } from "../../store/header";
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import SlideMenu from '../SlideMenu/SlideMenu';
import { useRouter } from "next/router";

const RegisterLayout = ({children, title, buttonTitle, text, link, linkPath, routeStyle, mobileMenu, mobileSearch, toggleMobileMenu, toggleMobileSearch, url}) => {
    const pageRef = useRef(null)
    const router = useRouter()

    return (
        <Box 
            className={register.register}
            ref={pageRef}
        >
            <Box className={register.register__wrapper}>
                <Box className={register.register__inner}>
                    <Box className={register.register__logo__wrapper}>
                        <picture
                            onClick={() => router.push('/')}
                        >
                            <img
                                className={logo.logo}
                                alt="logo"
                            />
                        </picture>
                        <HeaderMobile
                            toggleMobileSearch={toggleMobileSearch}
                            toggleMobileMenu={toggleMobileMenu}
                            showMenu={mobileMenu}
                        />
                    </Box>
                    <SlideMenu show={mobileMenu} toggleMobileMenu={toggleMobileMenu}/>
                    <RegisterForm title={title} buttonTitle={buttonTitle} url={url}/>
                    {children}
                    <RegisterRoute text={text} link={link} linkPath={linkPath} routeStyle={routeStyle}/>
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    mobileMenu,
    mobileSearch
})

const mapDispatchToProps = dispatch => ({
    toggleMobileMenu: bindActionCreators(toggleMobileMenu, dispatch),
    toggleMobileSearch: bindActionCreators(toggleMobileSearch, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLayout);