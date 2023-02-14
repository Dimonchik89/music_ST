import { useEffect } from "react";
import Main from "../components/Main/Main";
import { addAllCategory, selectActualCategoryId } from "../store/category";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { getCookie, setCookie } from 'cookies-next';
import { addUser } from "../store/user/userSlice";
import { selectMusics, changeCurrentPage, changeLimit } from "../store/actualMusics";
import { changeSearchValue } from "../store/search";

import Link from "next/link";
import styles from '../styles/Home.module.scss'

const Home = ({category, checkRole, serverAudio, addAllCategory, selectActualCategoryId, addUser, selectMusics, changeSearchValue, changeCurrentPage, changeLimit}) => {
  const router = useRouter()

  useEffect(() => {
    if(checkRole?.token) {
      setCookie("token", checkRole.token)
      addUser(checkRole.token)
    }
  }, [checkRole])

  useEffect(() => {
    selectActualCategoryId(+router.query.categoryId || 0)
  }, [router])

  useEffect(() => {
    addAllCategory(category);
  }, [category])

  useEffect(() => {
    selectMusics(serverAudio)
  }, [serverAudio])

  useEffect(() => {
    changeSearchValue(router.query?.keywords)
    if(router.query?.page) {
      changeCurrentPage(+router.query.page)
    }
    if(router.query?.limit) {
      changeLimit(+router.query?.limit)
    }
  }, [])

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

  const queryTail = {};
  const filteredQuery = Object.keys(query).filter(item => item !== "page")
  filteredQuery.forEach(item => {
    queryTail[item] = query[item]
  })

  if(query.categoryId) {
    const audioResponse = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams({...queryTail})) 
    // const audioResponse = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams(query)) // пагинация с кнопками страниц
    serverAudio = await audioResponse.json()
  } else {
    const audioResponse = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams({...queryTail})) 
    // const audioResponse = await fetch(`${process.env.BASE_URL}/music?` + new URLSearchParams(query)) // пагинация с кнопками страниц
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
  changeSearchValue: bindActionCreators(changeSearchValue, dispatch),
  changeCurrentPage: bindActionCreators(changeCurrentPage, dispatch),
  changeLimit: bindActionCreators(changeLimit, dispatch),
})

export default connect(null, mapDispatchToProps)(Home)

//hum78766@zslsz.com