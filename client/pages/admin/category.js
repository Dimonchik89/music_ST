import AdminHeader from "../../components/Admin/AdminHeader"
import AdminCategoryItem from "../../components/Admin/AdminCategoryItem"
import { useEffect } from "react"
import { Box, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"

import admin from "../../styles/admin.module.scss"

const Category = ({categories, errorCode}) => {
    const router = useRouter()

    useEffect(() => {
        console.log(categories);
    }, [])

    if(categories.length === 0 || errorCode) {
        return (
            <Button
                onClick={() => router.reload()}
            >
                Ups, Reload page
            </Button>
        )
    }

    const content = categories.map(category => <AdminCategoryItem key={category.id} category={category}/>)

    return (
        <> 
            <AdminHeader/>
            <Container>
                <Box className={admin.category__container}>
                    {content}
                </Box>
            </Container>
        </>
    )
}
export default Category

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