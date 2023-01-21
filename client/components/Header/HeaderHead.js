import { useState } from "react";
import { Box } from '@mui/system';
import logo from "../../styles/logo.module.scss";
import Search from '../Search/Search';
import SlideMenu from "../SlideMenu/SlideMenu";
import SearchMobile from "../Search/SearchMobile";
import HeaderMobile from "./HeaderModile";
import { mobileMenu, mobileSearch, toggleMobileMenu, toggleMobileSearch } from '../../store/header';

import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { showPlayer } from '../../store/player/selectors';

import button from "../../styles/button.module.scss";
import header from "../../styles/header.module.scss";

const HeaderHead = ({showPlayer, mobileMenu, mobileSearch, toggleMobileMenu, toggleMobileSearch}) => {
    // const [showMenu, setShowMenu] = useState(false)
    // const [showSearch, setShowSearch] = useState(false)

    const headerStyle = showPlayer ? header.header__song__on : header.header__song__off

    const search = showPlayer ? <Search/> : null

    // const handleChangeShowMenu = () => {
    //     setShowMenu(showMenu => !showMenu)
    // }

    // const handleChangeShowSearch = () => {
    //     setShowSearch(showSearch => !showSearch)
    // }

    return (
        <Box className={header.header__inner}>
            <Box className={`${header.header__item} ${headerStyle}`}>
                <picture>
                    <img
                        className={logo.logo}
                        alt="logo"
                    />
                </picture>
                {search}
                <button
                    className={`${button.border_gray_text_yellow} ${header.header__button}`}
                >
                    Pro Catalog
                </button>
                <HeaderMobile 
                    toggleMobileMenu={toggleMobileMenu} 
                    toggleMobileSearch={toggleMobileSearch}
                    showMenu={mobileMenu}    
                />
            </Box>
            <SlideMenu show={mobileMenu} toggleMobileMenu={toggleMobileMenu}/>
            <SearchMobile show={mobileSearch} toggleMobileSearch={toggleMobileSearch}/>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer,
    mobileMenu,
    mobileSearch
})

const mapDispatchToProps = dispatch => ({
    toggleMobileMenu: bindActionCreators(toggleMobileMenu, dispatch),
    toggleMobileSearch: bindActionCreators(toggleMobileSearch, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHead);
