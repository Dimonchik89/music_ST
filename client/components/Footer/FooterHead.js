import { Box } from "@mui/material";

import footer from "../../styles/footer.module.scss";
import helper from '../../styles/helper.module.scss';
import text from "../../styles/text.module.scss";

const FooterHead = () => {

    return (
        <Box>
            <h2 className={`${text.title} ${text.text__center} ${helper.color__white}`}>
                 Check Out the Latest Royalty Free Music Collections
            </h2>
            <Box className={footer.text__wrapper}>
                <p className={`${helper.fz__24} ${text.text__center} ${helper.color__white}`}>
                    I've compiled themed collections of production music libraries for your media projects, so you don't have to search 
                    endlessly for the perfect track. With TakeTones, all the royalty-free music you need is in one place.
                        Here are four of the latest collections compiled by our experts. Take a listen!
                </p>
            </Box>
        </Box>
    )
}
export default FooterHead;