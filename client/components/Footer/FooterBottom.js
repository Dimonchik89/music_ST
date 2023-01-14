import { Box } from "@mui/material";
import Link from "next/link";

import helper from "../../styles/helper.module.scss";
import footer from "../../styles/footer.module.scss";

const FooterBottom = () => {

    return (
        <Box className={footer.bottom}>
            <Box className={`${helper.d__flex} ${helper.align__center} ${helper.justify__center}`}>
                <Link 
                    href="/"
                    className={`${helper.color__yellow} ${helper.fz__24}`}
                >
                    Got a Claim? Fix it
                </Link>
            </Box>
            <Box className={footer.bottom__logo}>
                <picture>
                    <img
                        src="../../static/images/Logo_sm.png"
                    />
                </picture>
            </Box>
        </Box>
    )
}
export default FooterBottom;