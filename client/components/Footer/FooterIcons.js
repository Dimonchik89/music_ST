import { Box } from "@mui/material";
import FooterIcon from "./FooterIcon";
import { footerIcons } from "../../iconsPath/footerIcons";

import helper from '../../styles/helper.module.scss';
import footer from "../../styles/footer.module.scss";

const FooterIcons = () => {
    const content = footerIcons?.map((item, i) => <FooterIcon key={i} icon={item}/>)

    return (
        <Box className={`${helper.d__flex} ${helper.justify__center} ${footer.icons__wrapper}`}>
            {content}
        </Box>
    )
}
export default FooterIcons;