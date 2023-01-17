import { Box } from "@mui/material";
import Link from "next/link";

import helper from "../../styles/helper.module.scss";
import footer from "../../styles/footer.module.scss";

const FooterBottom = () => {

    // const logo = window.screen.width <= 375 ? "../../static/images/Logo_md.png" : "../../static/images/Logo_sm.png";

    return (
        <Box className={footer.bottom}>
            <Box className={footer.bottom__content}>
                <Link 
                    href="/"
                    className={footer.link}
                >
                    Got a Claim? Fix it
                </Link>
            </Box>
            <Box className={footer.bottom__logo}>
                {/* <picture>
                    <img
                        className={footer.logo}
                        src={"../../static/images/Logo_sm.png"}
                    />
                </picture> */}
            </Box>
        </Box>
    )
}
export default FooterBottom;