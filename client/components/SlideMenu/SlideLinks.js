import { Box } from "@mui/system";
import Link from "next/link"

import slide from "../../styles/slideMenu.module.scss";

const links = [
    {
        name: "Pro Catalog",
        path: "/"
    },
    {
        name: "Privacy Policy",
        path: "/"
    },
    {
        name: "License",
        path: "/"
    }
]

const SlideLinks = ({toggleMobileMenu}) => {

    return (
        <Box className={slide.links__wrapper}>
            <Box className={slide.links__container}>
                {links?.map(item => (
                    <Link 
                        key={item.name} 
                        href={item.path}
                        className={slide.link}
                        onClick={() => toggleMobileMenu()}
                    >
                        {item.name}
                    </Link>
                ))}
            </Box>
        </Box>
    )
}
export default SlideLinks;