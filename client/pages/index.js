import { useEffect } from "react";
import Main from "../components/Main/Main";
import { addAllCategory, selectActualCategoryId } from "../store/category";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { getCookie, setCookie } from 'cookies-next';
import { addUser } from "../store/user/userSlice";

import Link from "next/link";
import styles from '../styles/Home.module.scss'

const Home = ({category, checkRole, addAllCategory, selectActualCategoryId, addUser}) => {
  const router = useRouter()

  useEffect(() => {
    if(checkRole?.token) {
      setCookie("token", checkRole.token)
      addUser(checkRole.token)
    }
  }, [checkRole])

  useEffect(() => {
    selectActualCategoryId(+router.query.category || category[0]?.id)
  }, [router])

  useEffect(() => {
    addAllCategory(category);
  }, [category])

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

  const responseChekRole = await fetch(`${process.env.BASE_URL}/user/auth`, {
    headers: {
      'authorization': `${unescape(encodeURIComponent(`Bearer ${getCookie('token', { req, res })}`))}`
    }
  })
  const checkRole = await responseChekRole.json()
  return {
    props: {
      category,
      checkRole
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addAllCategory: bindActionCreators(addAllCategory, dispatch),
  selectActualCategoryId: bindActionCreators(selectActualCategoryId, dispatch),
  addUser: bindActionCreators(addUser, dispatch)
})

export default connect(null, mapDispatchToProps)(Home)