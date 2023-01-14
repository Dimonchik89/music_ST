import { useState } from "react";
import Image from 'next/image';
import { Box } from '@mui/system';
import button from "../../styles/button.module.scss";
import header from "../../styles/header.module.scss";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../styles/logo.module.scss";
import Search from '../Search/Search';
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { showPlayer } from '../../store/player/selectors';

const HeaderHead = ({showPlayer}) => {
    const headerStyle = showPlayer ? header.header__song__on : header.header__song__off

    const search = showPlayer ? <Search/> : null

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
                <Box
                    className={header.header__mobile}
                >
                    <Box className={header.header__search}>
                        <Image
                            src="/static/icon/search.png"
                            alt="search"
                            width={17}
                            height={17}
                        />
                    </Box>

                    <IconButton
                        color="white"
                        aria-label="menu"
                        sx={{ width: '1.8rem' }}
                    >
                        <MenuIcon sx={{ fontSize: 18  }}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer
})

export default connect(mapStateToProps)(HeaderHead);
