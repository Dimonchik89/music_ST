import Link from "next/link"
import MainContainer from "../components/MainContainer/MainContainer"
import RegisterLayout from "../components/Register/RegisterLayout"
import RegisterResetPas from "../components/Register/RegisterResetPass"
import register from "../styles/register.module.scss";
import useHttp from "../hooks/useHttp";

const Login = () => {
    const { enterUser } = useHttp("user/login")

    return (
        <RegisterLayout 
            title="Log In" 
            buttonTitle="Log In"
            text="Don't have an account?"
            link="Sign Up"
            linkPath="/register"
            routeStyle={register.register__wrapper__Login}
            onSubmit={enterUser}
        >
            <RegisterResetPas/>
        </RegisterLayout>
    )
}
export default Login