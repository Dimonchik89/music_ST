import { Box } from "@mui/material";
import { useRouter } from "next/router";

import helper from "../../styles/helper.module.scss";
import share from "../../styles/share.module.scss";

const ShareItem = ({iconPath, title, Component, musicId, changeButton}) => {
    const {query} = useRouter()

    // console.log('router', `${process.env.NEXT_PUBLIC_PAGE_URL}?` + new URLSearchParams({...query, sound: musicId}));

    return (
        <Component 
            url={`${process.env.NEXT_PUBLIC_PAGE_URL}?` + new URLSearchParams({...query, sound: musicId})} 
            style={{marginBottom: "8px"}}
            onClick={changeButton}    
        >
            <Box className={`${helper.d__flex} ${helper.align__center} ${helper.justify__center}`}>
                <picture>
                    <img
                        className={share.icon}
                        src={iconPath}
                        alt={title}
                    />
                </picture>
                <span className={share.text}>{title}</span>
            </Box>  
        </Component>
    )
}
export default ShareItem;