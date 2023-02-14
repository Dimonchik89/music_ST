import { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from "@mui/material"
import { allCount, fetchPaginationMusic, allStop } from "../../store/actualMusics"
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useRouter } from "next/router";
import { clearSearchValue } from '../../store/search';
import { hideHeaderPlayer } from '../../store/player';

import pagination from "../../styles/pagination.module.scss";

const PagePagination = ({allCount, pathname, fetchPaginationMusic, clearSearchValue, hideHeaderPlayer, allStop}) => {
    const router = useRouter()
    const [page, setPage] = useState(+router.query.page || 1)
    const allPage = Math.ceil(+allCount / process.env.NEXT_PUBLIC_SOUND_LIMIT) || 1

    const handleChangePage = (e, value) => {
        allStop()
        hideHeaderPlayer()
        clearSearchValue()
        setPage(value)
        router.push({
            pathname: pathname,
            query: {...router.query, page: value}
        }, undefined, { scroll: false})
        fetchPaginationMusic(`music?page=${value}`)
            .then(data => console.log(data))
    }

    useEffect(() => {
        setPage(+router.query.page || 1)
    }, [router.query.page])

    return (
        <Pagination
            count={allPage}
            variant='outlined'
            color='white'
            page={page}
            onChange={handleChangePage}
            shape="rounded"
            className={pagination.container}
            renderItem={(item) => (
                <PaginationItem
                    // className={pagination.item}
                    {...item}
                />
            )}
         />
    )
}

const mapStateToProps = createStructuredSelector({
    allCount
})

const mapDispatchToProps = dispatch => ({
    fetchPaginationMusic: bindActionCreators(fetchPaginationMusic, dispatch),
    clearSearchValue: bindActionCreators(clearSearchValue, dispatch),
    hideHeaderPlayer: bindActionCreators(hideHeaderPlayer, dispatch),
    allStop: bindActionCreators(allStop, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PagePagination)