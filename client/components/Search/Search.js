import { useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

import search from "../../styles/search.module.scss";

const Search = () => {
    const [value, setValue] = useState("")
    const router = useRouter()

    const changeValue = (e) => {
        setValue(e.target.value);
    }

    const handleSend = (e) => {
        e.preventDefault()
        setValue("")
        router.push({
            pathname: "/",
            query: {keywords: value},
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
                value={value}
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
export default Search;