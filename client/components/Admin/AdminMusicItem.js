import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { allCategory } from '../../store/category';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import useHttp from "../../hooks/useHttp";
import { deleteMusic } from "../../store/actualMusics";
import { bindActionCreators } from "@reduxjs/toolkit";
import ModalMusicAdmin from "../Modal/ModalMusic/ModalMusicAdmin";
import AlertMessage from "../AlertMessage/AlertMessage";

import admin from "../../styles/admin.module.scss";

const AdminMusicItem = ({music, allCategory, deleteMusic}) => {
    const { deleteData, updateData } = useHttp(`music/${music.id}`)
    const [categoriesInSound, setCategoriesInSound] = useState([])
    const arrCategoriesId = music.categoryId.split(', ')
    const [showModalMusic, setShowModalMusic] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})

    useEffect(() => {
        setCategoriesInSound(allCategory.filter(item => arrCategoriesId.includes(`${item.id}`)))
    }, [allCategory])

    const handleDelete = () => {
        deleteData()
            .then(data => {
                console.log(data);
                if(data.status === 200) {
                    deleteMusic(music.id)
                }

            })
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

    const handleOpenModalMusic = () => {
        setShowModalMusic(true)
    }

    const handleCloseModalMusic = () => {
        setShowModalMusic(false)
    }

    const categoryContent = categoriesInSound?.map(item => item.name).join(", ")

    return (
        <>
            <Box className={admin.music__item}>
                <picture>
                    <img
                        className={admin.music__img}
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${music.img}`}
                        alt={music.name}
                    />
                </picture>
                <Box className={admin.text__container}>
                    <Typography
                        variant="h5"
                        component="p"
                    >
                        Name: {music.name}
                    </Typography>
                </Box>
                <Box className={admin.description__container}>
                    <Typography
                        variant="h5"
                        component="p"
                    >
                        {music.description}
                    </Typography>
                </Box>
                <Box className={admin.text__container}>
                    <Typography
                        variant="h5"
                        component="p"
                    >
                        keywords: {music.keywords}
                    </Typography>
                </Box>
                <Box className={admin.text__container}>
                    <Typography
                        variant="h5"
                        component="p"
                    >
                        category: {categoryContent}
                    </Typography>
                </Box>

                <audio
                    controls
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${music.audio}`}
                />
                <Box>
                    <Button
                        variant="outlined"
                        onClick={handleOpenModalMusic}
                    >
                        Update
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
            <ModalMusicAdmin 
                open={showModalMusic}
                handleClose={handleCloseModalMusic}    
                handleOpenAlert={handleOpenAlert}
                nameValue={music.name}
                descriptionValue={music.description}
                keywordsValue={music.keywords}
                categoryIdValue={music.categoryId.split(", ")}
                imgValue={music.img}
                audioValue={music.audio}
                serverFunc={updateData}
                buttonTitle="update"
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
    deleteMusic: bindActionCreators(deleteMusic, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminMusicItem);