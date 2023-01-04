import { useEffect } from 'react';
import { Box, Container } from '@mui/system';
import Search from '../Search/Search';
import { showPlayer } from '../../store/player/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux"
import HeaderPlayer from './HeaderPlayer';
import { showHeaderPlayer } from '../../store/player/playerSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { selectMusic } from '../../store/actualMusics';

import text from "../../styles/text.module.scss";
import header from "../../styles/header.module.scss";
import helper from "../../styles/helper.module.scss";
import search from "../../styles/search.module.scss";

const HeaderContent = ({showPlayer, showHeaderPlayer, selectMusic}) => {
    const router = useRouter()
    const id = router.query['sound']

    useEffect(() => {
        if(id) {
            showHeaderPlayer()
            selectMusic(id)
        }
    }, [id])

    const showSearch = showPlayer ? null : <Search/> 

    const headContentStyle = showPlayer ? header.content_player : header.header__content;

    return (
        <Box className={`${headContentStyle} ${helper.color__white}`}>
            { showPlayer 
                ? <HeaderPlayer/> 
                : <Container maxWidth="xl">
                    <Box className={`${helper.d__flex} ${helper.align__center} ${helper.justify__center} ${helper.direction__column}`}>
                        <h1
                            className={text.title}
                        >
                            ROYALTY FREE MUSIC FOR VIDEO WITHOUT CLAIMS
                        </h1>
                        <p className={`${text.subtitle} ${helper.color__white}`}>
                            100% Claim-Free for any Platforms. Find Your Royalty Free Music Now!
                        </p>
                    </Box>
                    <Box
                        className={`${helper.horizontal__center} ${search.search_header__wrapper}`}
                    >               
                        {showSearch}
                    </Box>
                </Container>
            }
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    showPlayer,
})

const mapDispatchToProps = dispatch => ({
    showHeaderPlayer: bindActionCreators(showHeaderPlayer, dispatch),
    selectMusic: bindActionCreators(selectMusic, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContent)