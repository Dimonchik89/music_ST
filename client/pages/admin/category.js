import { useState } from "react"
import AdminHeader from "../../components/Admin/AdminHeader"
import AdminCategoryItem from "../../components/Admin/AdminCategoryItem"
import { useEffect } from "react"
import { Box, Button, Container } from "@mui/material"
import { addAllCategory, allCategory } from "../../store/category"
import { bindActionCreators } from "@reduxjs/toolkit"
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux"
import { useRouter } from "next/router"
import AlertMessage from "../../components/AlertMessage/AlertMessage"
import ModalCategoryAdmin from "../../components/Modal/ModalCategory/ModalCategoryAdmin"
import useHttp from "../../hooks/useHttp"

import admin from "../../styles/admin.module.scss"
import helper from "../../styles/helper.module.scss"

const Category = ({categories, errorCode, addAllCategory, allCategory}) => {
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})
    const router = useRouter()
    const { postData } = useHttp('category')

    useEffect(() => {
        addAllCategory(categories)
    }, [categories])

    if(errorCode) {
        return (
            <Button
                onClick={() => router.reload()}
            >
                Ups, Reload page
            </Button>
        )
    }

    const handleOpenAlert = ({status, text}) => {
        setShowAlert(prev => ({status, show: true, text}))
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(prev => ({...prev, show: false}));
    }

    const handleOpen = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const content = allCategory?.map(category => <AdminCategoryItem key={category.id} category={category}/>)

    return (
        <> 
            <AdminHeader/>
            <Box 
                className={helper.text__center}
                style={{marginTop: "2rem"}}    
            >
                <Button 
                    variant="outlined"
                    onClick={handleOpen}    
                >
                    Create category
                </Button>
            </Box>
            <Container className={admin.category__container}>
                <Box className={admin.category__wrapper}>
                    {content}
                </Box>
            </Container>
            <ModalCategoryAdmin
                open={showModal} 
                handleClose={handleClose} 
                handleOpenAlert={handleOpenAlert}
                nameValue=""
                imgValue=""
                serverFunc={postData}
                buttonTitle="create"
            />
            <AlertMessage 
                handleClose={handleCloseAlert} 
                open={showAlert.show} 
                status={showAlert.status} 
                text={showAlert.text}
            />
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    allCategory
})

const mapDispatchToProps = dispatch => ({
    addAllCategory: bindActionCreators(addAllCategory, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Category)

export async function getStaticProps() {
    const resposne = await fetch(`${process.env.BASE_URL}category`)
    const errorCode = await resposne.ok ? false : resposne.statusCode
    const categories = await resposne.json()

    return {
        props: {
            categories,
            errorCode
        }
    }
}