import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import helper from "../../styles/helper.module.scss";
import register from "../../styles/register.module.scss";

const RegisterRoute = ({text, link, linkPath, routeStyle}) => {
    
    return (
        <Box
            className={`${helper.d__flex} ${routeStyle}`}
        >
            <span
                className={`${helper.fz__24} ${helper.color__white} ${helper.fw__medium} ${helper.lineheight__12}`}
            >
                {text}
            </span>
            <Box
                className={register.register__route__link__wrapper}
            >
                <Link 
                    href={linkPath}
                    className={`${helper.fz__24} ${helper.color__yellow} ${helper.fw__medium}  ${helper.lineheight__12}`}
                >
                    {link}
                </Link>
            </Box>
        </Box>
    )
}
export default RegisterRoute;