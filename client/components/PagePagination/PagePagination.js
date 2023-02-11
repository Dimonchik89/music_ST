import { useState, useEffect } from 'react';
import { Pagination, PaginationItem } from "@mui/material"
import { allCount } from "../../store/actualMusics"
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { useRouter } from "next/router";

import pagination from "../../styles/pagination.module.scss";

const PagePagination = ({allCount, pathname}) => {
    const router = useRouter()
    const [page, setPage] = useState(+router.query.page || 1)
    const allPage = Math.ceil(+allCount / process.env.NEXT_PUBLIC_SOUND_LIMIT) || 1

    const handleChangePage = (e, value) => {
        setPage(value)
        router.push({
            pathname: pathname,
            query: {...router.query, page: value}
        }, undefined, { scroll: false})
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

export default connect(mapStateToProps)(PagePagination)