import { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material"
import { removeCategory } from "../../store/category";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import useHttp from "../../hooks/useHttp";
import ErrorModal from "../Modal/ErrorModal";
import AlertMessage from '../AlertMessage/AlertMessage';
import ModalCategoryAdmin from "../Modal/ModalCategory/ModalCategoryAdmin";

import admin from "../../styles/admin.module.scss";

const AdminCategoryItem = ({category, removeCategory}) => {
    const { deleteData, updateData } = useHttp(`category/${category.id}`)
    const [errorModal, setErrorModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})

    const handleOpenAlert = ({status, text}) => {
        setShowAlert({status, show: true, text})
    }

    useEffect(() => {
        console.log('showAlert', showAlert);
    }, [showAlert])

    const deleteCategory = async () => {
        const response = await deleteData()
        if(response.status === 200) {
            removeCategory(category.id)
        } else {
            setErrorModal(true)
        }
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(prev => ({...prev, show: false}));
    }

    const handleCloseErrorModal = () => {
        setErrorModal(false)
    }

    const handleOpenUpdateModal = () => {
        setUpdateModal(true)
    }

    const handleCloseUpdateModal = () => {
        setUpdateModal(false)
    }

    return (
        <>
            <Box className={admin.category__item}>
                <picture>
                    <img
                        className={admin.image}
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${category.img}`}
                        alt={category.name}
                    />
                </picture>
                <Typography
                    variant="h6"
                    component="p"
                    className={admin.text}
                >
                    {category.name}
                </Typography>
                <Box style={{marginRight: "2rem"}}>
                    <Button 
                        variant="outlined"
                        onClick={handleOpenUpdateModal}
                    >
                        Update
                    </Button>
                </Box>
                <Button 
                    variant="outlined"
                    color="error"
                    onClick={deleteCategory}
                >
                    Delete
                </Button>
            </Box>
            <ErrorModal 
                open={errorModal} 
                handleClose={handleCloseErrorModal} 
                text="category not deleted, try later"
            />
            <ModalCategoryAdmin 
                open={updateModal} 
                handleClose={handleCloseUpdateModal} 
                category={category} 
                handleOpenAlert={handleOpenAlert}
                nameValue={category.name}
                imgValue={category.img}
                serverFunc={updateData}
                buttonTitle="update"
            />
            <AlertMessage 
                handleClose={handleCloseAlert} 
                open={showAlert.show} 
                status={showAlert.status} 
                text={showAlert.text}/>
        </>

    )
}

const mapDispatchToProps = dispatch => ({
    removeCategory: bindActionCreators(removeCategory, dispatch)
})

export default connect(null, mapDispatchToProps)(AdminCategoryItem)