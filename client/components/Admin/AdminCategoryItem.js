import { Typography, Box, Button } from "@mui/material"

import admin from "../../styles/admin.module.scss";

const AdminCategoryItem = ({category}) => {

    return (
        <Box className={admin.category__item__container}>
            <picture>
                <img
                    className={admin.image}
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}category/${category.img}`}
                    alt=""
                />
            </picture>
            <Typography
                variant="h6"
                component="p"
                className={admin.text}
            >
                {category.name}
            </Typography>
            <Button variant="outlined">
                Delete
            </Button>
        </Box>
    )
}
export default AdminCategoryItem