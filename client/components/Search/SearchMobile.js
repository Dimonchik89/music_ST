import { Box, TextField } from "@mui/material";
import { useState } from "react";

import search from "../../styles/search.module.scss";

const SearchMobile = ({show, toggleMobileSearch}) => {
    const [findText, setFindText] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        
        setFindText('')
        toggleMobileSearch()
    }

    const handleChangeFindText = (e) => {
        setFindText(e.target.value)
    }

    const showSearch = show ? null : {display: "none !important"}

    return (
        <Box className={search.mobile__container} sx={showSearch}>
            <Box className={search.mobile__wrapper}>
                <form onSubmit={onSubmit}>
                    <input 
                        value={findText}
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
export default SearchMobile;