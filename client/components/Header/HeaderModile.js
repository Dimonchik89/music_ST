import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';


import header from "../../styles/header.module.scss";

const HeaderMobile = ({toggleMobileSearch, toggleMobileMenu, showMenu}) => {

    return (
        <Box
            className={header.header__mobile}
        >
            <IconButton 
                className={header.header__search}
                onClick={() => toggleMobileSearch()}    
            >
                <Image
                    src="/static/icon/search.png"
                    alt="search"
                    width={17}
                    height={17}
                />
            </IconButton>

            <IconButton
                color="white"
                aria-label="menu"
                sx={{ width: '1.8rem' }}
                onClick={() => toggleMobileMenu()}
            >
                {showMenu ? <ArrowBackIosIcon sx={{ fontSize: 18 }}/> : <MenuIcon sx={{ fontSize: 18  }}/>}
            </IconButton>
        </Box>
    )
}
export default HeaderMobile