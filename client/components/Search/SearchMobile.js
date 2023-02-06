import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

import search from "../../styles/search.module.scss";

const SearchMobile = ({show, toggleMobileSearch}) => {
    const [value, setValue] = useState("")
    const router = useRouter()

    const handleSend = (e) => {
        e.preventDefault()
        setValue('')
        router.push({
            pathname: "/",
            query: {keywords: value},
        }, undefined, {scroll: false})
        toggleMobileSearch()
    }

    const handleChangeFindText = (e) => {
        setValue(e.target.value)
    }

    const showSearch = show ? null : {display: "none !important"}

    return (
        <Box className={search.mobile__container} sx={showSearch}>
            <Box className={search.mobile__wrapper}>
                <form onSubmit={handleSend}>
                    <input 
                        value={value}
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