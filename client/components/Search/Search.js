import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { hideHeaderPlayer, showPlayer } from "../../store/player";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";
import { searchValue, changeSearchValue } from '../../store/search';

import search from "../../styles/search.module.scss";

const Search = ({ hideHeaderPlayer, showPlayer, searchValue, changeSearchValue  }) => {
    const router = useRouter()

    const changeValue = (e) => {
        changeSearchValue(e.target.value);
    }

    const handleSend = (e) => {
        e.preventDefault()
        if(showPlayer) {
           hideHeaderPlayer() 
        }
        router.push({
            pathname: "/",
            query: {keywords: searchValue},
        }, undefined, {scroll: false})
    }

    return (
        <div
            component="form"
            className={search.search}
        >
            <InputBase
                className={search.input}
                placeholder="Search"
                value={searchValue}
                onChange={changeValue}
                onKeyDown={e => {
                    if(e.keyCode === 13) handleSend(e)
                }}
            />
            <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search"
                onClick={handleSend}
            >
                <Image
                    src="/static/icon/arrow.svg"
                    alt="arrow"
                    width={20}
                    height={15}
                />
            </IconButton>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer,
    searchValue
})

const mapDispatchToProps = dispatch => ({
    hideHeaderPlayer: bindActionCreators(hideHeaderPlayer, dispatch),
    changeSearchValue: bindActionCreators(changeSearchValue, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);