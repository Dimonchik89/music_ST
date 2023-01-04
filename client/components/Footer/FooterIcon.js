import { Box } from "@mui/material"
import Link from "next/link";

import footer from "../../styles/footer.module.scss";

const FooterIcon = ({icon}) => {

    return (
        <Link 
            href={icon.linkPath}
            target="_blank"
            className={footer.icon__wrapper}
        >
            <picture>
                <img 
                    className={footer.icon}
                    src={icon.iconPath}
                    alt={icon.title}
                />
            </picture>
        </Link>
    )
}
export default FooterIcon