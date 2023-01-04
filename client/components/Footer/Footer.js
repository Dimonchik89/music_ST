import { Container, Box } from "@mui/system";
import FooterHead from "./FooterHead";
import FooterIcons from "./FooterIcons";
import FooterBottom from "./FooterBottom";

import footer from "../../styles/footer.module.scss";
import helper from '../../styles/helper.module.scss';
import text from "../../styles/text.module.scss";


const Footer = () => {

    return (
        <Box className={footer.wrapper}>
            <Container maxWidth="xl">
                <FooterHead/>
                <FooterIcons/>
                <FooterBottom/>
            </Container>
        </Box>
    )
}
export default Footer