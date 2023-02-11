import { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from "@mui/material"
import { allCount, fetchPaginationMusic } from "../../store/actualMusics"
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useRouter } from "next/router";

import pagination from "../../styles/pagination.module.scss";

const PagePagination = ({allCount, pathname, fetchPaginationMusic}) => {
    const router = useRouter()
    const [page, setPage] = useState(+router.query.page || 1)
    const allPage = Math.ceil(+allCount / process.env.NEXT_PUBLIC_SOUND_LIMIT) || 1

    const handleChangePage = (e, value) => {
        setPage(value)
        router.push({
            pathname: pathname,
            query: {...router.query, page: value}
        }, undefined, { scroll: false, shallow: true})
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
    fetchPaginationMusic: bindActionCreators(fetchPaginationMusic, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PagePagination)