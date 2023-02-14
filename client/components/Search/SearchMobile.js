import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { searchValue, changeSearchValue } from '../../store/search';
import { connect } from "react-redux"
import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from "reselect";

import search from "../../styles/search.module.scss";

const SearchMobile = ({show, toggleMobileSearch, searchValue, changeSearchValue}) => {
    // const [value, setValue] = useState("")
    const router = useRouter()

    const handleSend = (e) => {
        e.preventDefault()
        router.push({
            pathname: "/",
            query: {keywords: searchValue},
        }, undefined, {scroll: false})
        toggleMobileSearch()
    }

    const handleChangeFindText = (e) => {
        changeSearchValue(e.target.value)
    }

    const showSearch = show ? null : {display: "none !important"}

    return (
        <Box className={search.mobile__container} sx={showSearch}>
            <Box className={search.mobile__wrapper}>
                <form onSubmit={handleSend}>
                    <input 
                        value={searchValue}
                        onChange={handleChangeFindText}
                        placeholder="Search free music"
                        type="text" 
                        className={search.input}
                    />
                </form>
            </Box>
        </Box>

    )
}

const mapStateToProps = createStructuredSelector({
    searchValue
})

const mapDispatchToProps = dispatch => ({
    changeSearchValue: bindActionCreators(changeSearchValue, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchMobile);