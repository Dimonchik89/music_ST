import { useRef } from 'react';
import { Box } from '@mui/system';
import header from "../../styles/header.module.scss";
import HeaderHead from './HeaderHead';
import HeaderContent from './HeaderContent';

const Header = () => {
    const pageRef = useRef(null)

    return (
        <Box
            ref={pageRef}
            className={header.header}
        >
            <HeaderHead/>
            <HeaderContent/>
        </Box>
    )
}
export default Header;
