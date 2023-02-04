import { Box, Button, Container, Tab, Tabs } from "@mui/material"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { role } from "../../store/user/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import ModalCreateCategory from "../../components/Modal/ModalCreateCategory";
import { getCookie, setCookie } from 'cookies-next';
import { addUser } from "../../store/user/userSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import AdminHeader from "../../components/Admin/AdminHeader";
import AdminMusic from "../../components/Admin/AdminMusic";

import admin from "../../styles/admin.module.scss";

const Admin = ({role, checkRole, addUser, music}) => {
    const [showCategory, setShowCategory] = useState(false)
    const [createSong, setCreateSong] = useState(false)
    const router = useRouter()

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

    const openCategoryModal = () => {
        setShowCategory(true)
    }

    const hideCategoryModal = () => {
        setShowCategory(false)
    }

    const content = music?.rows?.map(item => {
        return JSON.stringify(item, null, 2)
    })

    return (
        <>
        <AdminHeader/>
            <Container>
                <Box className={admin.container}>
                    <AdminMusic music={music}/>
                    {content}
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

const mapDispatchToProps = dispatch => ({
    addUser: bindActionCreators(addUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

export async function getServerSideProps({req, res}) {
    const responseChekRole = await fetch(`${process.env.BASE_URL}/user/auth`, {
        headers: {
        'authorization': `${unescape(encodeURIComponent(`Bearer ${getCookie('token', { req, res })}`))}`
        }
    })
  const checkRole = await responseChekRole.json()

  const responseMusic = await fetch(`${process.env.BASE_URL}/music`)
  const music = await responseMusic.json()

  return {
    props: {
        checkRole,
        music
    }
  }
}