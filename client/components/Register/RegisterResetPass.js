import { Box } from '@mui/system';
import Link from 'next/link';

import helper from "../../styles/helper.module.scss";
import register from "../../styles/register.module.scss";

const RegisterResetPas = () => {

    return (
        <Box className={register.reset__wrapper}>
            <Link href="/" className={`${helper.color__yellow} ${helper.fz__24} ${helper.fw__medium} ${register.register__reset__link}`}>
                Forgot password?
            </Link>
        </Box>
    )
}
export default RegisterResetPas;