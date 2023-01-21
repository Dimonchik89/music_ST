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
                className={`${register.text} ${helper.color__white}`}
            >
                {text}
            </span>
            <Box
                className={register.register__route__link__wrapper}
            >
                <Link 
                    href={linkPath}
                    className={`${register.text} ${helper.color__yellow}`}
                >
                    {link}
                </Link>
            </Box>
        </Box>
    )
}
export default RegisterRoute;