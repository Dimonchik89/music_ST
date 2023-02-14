import { useState, useEffect } from "react";
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
import { fetchPaginationMusic, addMusic, incrementPage, currentPage, allCount, changeLimit, limit, actualMusics } from "../../store/actualMusics";
import { useRouter } from "next/router";
import { bindActionCreators } from "@reduxjs/toolkit";
import {Button} from "@mui/material";

import main from "../../styles/main.module.scss";

const Main = ({showPlayer, allCategory, fetchPaginationMusic, addMusic, incrementPage, currentPage, allCount, changeLimit, limit, actualMusics }) => {
    const router = useRouter()

    const handleDownloadMore = () => {
        changeLimit(limit + +process.env.NEXT_PUBLIC_SOUND_LIMIT)
        incrementPage()
        console.log("limit", limit);
        if(limit === process.env.NEXT_PUBLIC_SOUND_LIMIT) {
            router.push({
                pathname: "/",
                query: {
                    ...router.query,
                    page: currentPage + 1,
                }
            }, undefined, { shallow: true })
        } else {
            router.push({
                pathname: "/",
                query: {
                    ...router.query,
                    page: currentPage + 1,
                    limit: limit + +process.env.NEXT_PUBLIC_SOUND_LIMIT,
                }
            }, undefined, { shallow: true })
        }

        const queryKeys = Object.keys(router.query)
        const tailQuery = queryKeys.filter(item => item !== "limit")
        const resultQuery = {}
        tailQuery.forEach(item => {
            resultQuery[item] = router.query[item]
        })

        fetchPaginationMusic(`music?${new URLSearchParams({...resultQuery, page: currentPage + 1, limit: process.env.NEXT_PUBLIC_SOUND_LIMIT})}`) //убрать лимит, он задан дефолтно на сервере
            .then(data => {
                addMusic(data.payload)
            })
    }

    return (
        <Box className={main.main}>
            <Header/>
            <Container maxWidth="xl">
                {showPlayer ? null : <Carousel styleWrapper={main.main__carousel} category={allCategory}/>}
                <Sound/>
                {/* <PagePagination pathname="/"/> */}
                <Box
                    style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
                >
                    <Button 
                        variant="contained" 
                        onClick={handleDownloadMore} 
                        disabled={ +allCount === actualMusics.length}
                        style={{fontSize: "24px", backgroundColor: "#f2d22b", borderRadius: "20px"}}
                    >
                        Show more
                    </Button>
                </Box>
                <ModalSubscribe/>
            </Container>
            <Footer/>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer,
    allCategory,
    currentPage,
    allCount,
    limit,
    actualMusics
})

const mapDispatchToProps = dispatch => ({
    fetchPaginationMusic: bindActionCreators(fetchPaginationMusic, dispatch),
    addMusic: bindActionCreators(addMusic, dispatch),
    incrementPage: bindActionCreators(incrementPage, dispatch),
    changeLimit: bindActionCreators(changeLimit, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);