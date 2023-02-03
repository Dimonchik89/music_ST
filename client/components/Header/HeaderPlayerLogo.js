import { Box } from "@mui/material"

import header from "../../styles/header.module.scss"

const HeaderPlayerLogo = ({logoPath}) => {

    return (
        <Box>
            <picture className={header.picture}>
                <img
                    className={header.logo}
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${logoPath}`}
                />
            </picture>
        </Box>
    )
}
export default HeaderPlayerLogo;