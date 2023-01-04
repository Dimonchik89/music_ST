import { useRef, useEffect, useState } from "react";
import { Box } from "@mui/system";
import register from "../../styles/register.module.scss";
import Image from 'next/image'
import RegisterForm from "./RegisterForm";
import RegisterRoute from "./RegisterRoute";
import { logoPath, logoPath375 } from "../../imagePath/imagePath";
import logo from "../../styles/logo.module.scss";

const RegisterLayout = ({children, title, buttonTitle, text, link, linkPath, routeStyle, onSubmit}) => {
    const [width, setWidth] = useState(0)
    const pageRef = useRef(null)

    useEffect(() => {
        setWidth(pageRef.current.getBoundingClientRect().width)
    }, [pageRef])

    return (
        <Box 
            className={register.register}
            ref={pageRef}
        >
            <Box className={register.register__wrapper}>
                <Box className={register.register__inner}>
                    <Box className={register.register__logo__wrapper}>
                        <picture>
                            <img
                                className={logo.logo}
                                alt="logo"
                            />
                        </picture>
                    </Box>
                    <RegisterForm title={title} buttonTitle={buttonTitle} onSubmit={onSubmit}/>
                    {children}
                    <RegisterRoute text={text} link={link} linkPath={linkPath} routeStyle={routeStyle}/>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterLayout;