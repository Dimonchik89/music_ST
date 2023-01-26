import { useEffect } from "react";
import Main from "../components/Main/Main";
import { addAllCategory, selectActualCategoryId } from "../store/category";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

import Link from "next/link";
import styles from '../styles/Home.module.scss'

const Home = ({category, addAllCategory, selectActualCategoryId}) => {
  const router = useRouter()

  useEffect(() => {
    selectActualCategoryId(+router.query.category || category[0]?.id)
  }, [router])

  useEffect(() => {
    addAllCategory(category);
  }, [category])

  return (
    <>
      <Main/>
      {/* <Link href="/login">Login</Link>
      <Link href="/register">Register</Link> */}
    </>
  )
}


export async function getStaticProps() {
  const categoryResponse = await fetch(`${process.env.BASE_URL}/category`)
  const category = await categoryResponse.json()

  return {
    props: {
      category
    }
  }
}

const mapDispatchToProps = dispatch => ({
  addAllCategory: bindActionCreators(addAllCategory, dispatch),
  selectActualCategoryId: bindActionCreators(selectActualCategoryId, dispatch),
})

export default connect(null, mapDispatchToProps)(Home)