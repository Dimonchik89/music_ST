import { Box, Button, Container, Tab, Tabs } from "@mui/material"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { role } from "../../store/user/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { getCookie, setCookie } from 'cookies-next';
import { addUser } from "../../store/user/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import AdminHeader from "../../components/Admin/AdminHeader";
import { selectMusics, actualMusics } from "../../store/actualMusics";
import AdminMusicItem from "../../components/Admin/AdminMusicItem";
import { addAllCategory } from "../../store/category/categorySlice";
import ModalMusicAdmin from "../../components/Modal/ModalMusic/ModalMusicAdmin";
import useHttp from "../../hooks/useHttp";
import AlertMessage from '../../components/AlertMessage/AlertMessage';

import admin from "../../styles/admin.module.scss";
import PagePagination from "../../components/PagePagination/PagePagination";

const Admin = ({role, checkRole, addUser, music, selectMusics, actualMusics, categories, addAllCategory}) => {
    const [showModalMusic, setShowModalMusic] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})
    const {postData} = useHttp('music')
    const router = useRouter()

    useEffect(() => {
        selectMusics(music);
    }, [music])

    useEffect(() => {
        addAllCategory(categories)
    }, [categories])

    useEffect(() => {
        if(checkRole?.token && jwt_decode(checkRole?.token).role !== "ADMIN") {
            router.push('/')
        }
    }, [])

    useEffect(() => {
        if(checkRole?.token) {
            setCookie("token", checkRole.token)
            addUser(checkRole.token)
        } else if(checkRole.message) {
            router.push('/')
        }
    }, [checkRole])

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

    const content = actualMusics?.map(item => <AdminMusicItem key={item.id} music={item}/>)

    return (
        <>
        <AdminHeader/>
        <Container maxWidth="xl">
            <Box className={admin.container}>
                <Box>
                    <Button 
                        variant="outlined"
                        onClick={handleOpenModalMusic}
                    >
                        Create
                    </Button>
                </Box>
                <Box className={admin.music__wrapper}>
                    {content}
                </Box>
            </Box>
        </Container>
        <PagePagination pathname={"/admin"}/>
        <ModalMusicAdmin 
            open={showModalMusic}
            handleClose={handleCloseModalMusic}    
            handleOpenAlert={handleOpenAlert}
            nameValue=""
            descriptionValue=""
            categoryIdValue={[]}
            keywordsValue=""
            imgValue={null}
            audioValue={null}
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
    role,
    actualMusics
})

const mapDispatchToProps = dispatch => ({
    addUser: bindActionCreators(addUser, dispatch),
    selectMusics: bindActionCreators(selectMusics, dispatch),
    addAllCategory: bindActionCreators(addAllCategory, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

export async function getServerSideProps({req, res, query}) {
    const responseChekRole = await fetch(`${process.env.BASE_URL}/user/auth`, {
        headers: {
        'authorization': `${unescape(encodeURIComponent(`Bearer ${getCookie('token', { req, res })}`))}`
        }
    })
  const checkRole = await responseChekRole.json()

  const responseMusic = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams({...query}))
  const music = await responseMusic.json()

  const resposne = await fetch(`${process.env.BASE_URL}category`)
  const errorCode = await resposne.ok ? false : resposne.statusCode
  const categories = await resposne.json()

  return {
    props: {
        checkRole,
        music,
        categories
    }
  }
}