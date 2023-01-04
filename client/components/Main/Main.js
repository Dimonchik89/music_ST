import { Box } from "@mui/system";
import { Container } from "@mui/material";
import Header from "../Header/Header";
import Carousel from "../Carousel/Carousel";
import Sound from "../Sound/Sound";
import Footer from "../Footer/Footer";
import { showPlayer } from '../../store/player/selectors';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import main from "../../styles/main.module.scss";


const category = [
    {
        id: 1,
        title: "dark",
        image: "../../static/images/category/dark.svg"
    },
    {
        id: 2,
        title: "inspiration ",
        image: "../../static/images/category/inspiration.svg"
    },
    {
        id: 3,
        title: "happy",
        image: "../../static/images/category/happy.svg"
    },
    {
        id: 4,
        title: "action",
        image: "../../static/images/category/action1.jpg"
    },
    {
        id: 5,
        title: "dark",
        image: "../../static/images/category/dark.svg"
    },
]

const Main = ({showPlayer}) => {

    return (
        <Box className={main.main}>
            <Header/>
            <Container maxWidth="xl">
                {showPlayer ? null : <Carousel styleWrapper={main.main__carousel} category={category}/>}
                <Sound/>
            </Container>
            <Footer/>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer
})

export default connect(mapStateToProps)(Main);