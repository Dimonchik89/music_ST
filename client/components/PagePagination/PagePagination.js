import { useState } from 'react';
import { Pagination } from "@mui/material"
import { allCount } from "../../store/actualMusics"
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { useRouter } from "next/router";

const PagePagination = ({allCount}) => {
    const [page, setPage] = useState(1)
    const router = useRouter()
    const allPage = Math.floor(+allCount / 1)
    
    const handleChangePage = (e, value) => {
        setPage(value)
        router.push({
            pathname: "/",
            query: {...router.query, page: value}
        }, undefined, { scroll: false})
    }

    return (
        <Pagination
            count={allPage}
            variant='outlined'
            color='white'
            className='pagination'
            page={page}
            onChange={handleChangePage}
         />
    )
}

const mapStateToProps = createStructuredSelector({
    allCount
})

export default connect(mapStateToProps)(PagePagination)