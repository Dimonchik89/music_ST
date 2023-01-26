import { Box, Button, Container } from "@mui/material"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { role } from "../store/user/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import ModalCreateCategory from "../components/Modal/ModalCreateCategory";

import admin from "../styles/admin.module.scss";

const Admin = ({role}) => {
    const [showCategory, setShowCategory] = useState(false)
    const [createSong, setCreateSong] = useState(false)
    const router = useRouter()

    const openCategoryModal = () => {
        setShowCategory(true)
    }

    const hideCategoryModal = () => {
        setShowCategory(false)
    }

    useEffect(() => {
        // if(role !== "ADMIN") {
        //     router.push('/')
        // }
    }, [role])

    return (
        <>
            <Container>
                <Box className={admin.container}>
                    <Button 
                        variant="outlined"
                        onClick={openCategoryModal}    
                    >
                        Create Category
                    </Button>
                    <Button variant="outlined">
                        Create Song
                    </Button>
                </Box>
            </Container>
            <ModalCreateCategory 
                open={showCategory} 
                handleClose={hideCategoryModal}
            />
        </>

    )
}

const mapStateToProps = createStructuredSelector({
    role
})

export default connect(mapStateToProps)(Admin)