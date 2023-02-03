import { useEffect } from "react";
import Main from "../components/Main/Main";
import { addAllCategory, selectActualCategoryId } from "../store/category";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { getCookie, setCookie } from 'cookies-next';
import { addUser } from "../store/user/userSlice";
import { selectMusics } from "../store/actualMusics";

import Link from "next/link";
import styles from '../styles/Home.module.scss'

const Home = ({category, checkRole, serverAudio, addAllCategory, selectActualCategoryId, addUser, selectMusics}) => {
  const router = useRouter()

  useEffect(() => {
    if(checkRole?.token) {
      setCookie("token", checkRole.token)
      addUser(checkRole.token)
    }
  }, [checkRole])

  useEffect(() => {
    selectActualCategoryId(+router.query.categoryId || category[0]?.id)
  }, [router])

  useEffect(() => {
    addAllCategory(category);
  }, [category])

  useEffect(() => {
    selectMusics(serverAudio)
  }, [serverAudio])

  return (
    <>
      <Main/>
      {/* <Link href="/admin">Admin</Link> */}
      {/* <Link href="/register">Register</Link> */}
    </>
  )
}


export async function getServerSideProps({req, res, query}) {
  const categoryResponse = await fetch(`${process.env.BASE_URL}/category`)
  const category = await categoryResponse.json()
  let serverAudio;

  if(query.categoryId) {
    const audioResponse = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams(query))
    serverAudio = await audioResponse.json()
  } else {
    const audioResponse = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams({categoryId: "1"}))
    serverAudio = await audioResponse.json()
  }  

  const responseChekRole = await fetch(`${process.env.BASE_URL}/user/auth`, {
    headers: {
      'authorization': `${unescape(encodeURIComponent(`Bearer ${getCookie('token', { req, res })}`))}`
    }
  })
  const checkRole = await responseChekRole.json()
  return {
    props: {
      category,
      checkRole,
      serverAudio
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addAllCategory: bindActionCreators(addAllCategory, dispatch),
  selectActualCategoryId: bindActionCreators(selectActualCategoryId, dispatch),
  addUser: bindActionCreators(addUser, dispatch),
  selectMusics: bindActionCreators(selectMusics, dispatch),
})

export default connect(null, mapDispatchToProps)(Home)