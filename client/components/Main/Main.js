import { Box } from "@mui/system";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Carousel from "../Carousel/Carousel";
import Sound from "../Sound/Sound";
import Footer from "../Footer/Footer";
import { showPlayer } from '../../store/player/selectors';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import ModalSubscribe from "../Modal/ModalSubscribe";
import { allCategory } from '../../store/category';
import PagePagination from "../PagePagination/PagePagination";

import main from "../../styles/main.module.scss";

const Main = ({showPlayer, allCategory}) => {

    return (
        <Box className={main.main}>
            <Header/>
            <Container maxWidth="xl">
                {showPlayer ? null : <Carousel styleWrapper={main.main__carousel} category={allCategory}/>}
                <Sound/>
                <PagePagination pathname="/"/>
                <ModalSubscribe/>
            </Container>
            <Footer/>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer,
    allCategory
})

export default connect(mapStateToProps)(Main);