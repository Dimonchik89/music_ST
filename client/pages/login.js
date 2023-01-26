import RegisterLayout from "../components/Register/RegisterLayout"
import RegisterResetPas from "../components/Register/RegisterResetPass"
import register from "../styles/register.module.scss";

const Login = () => {
    
    return (
        <RegisterLayout 
            title="Log In" 
            buttonTitle="Log In"
            text="Don't have an account?"
            link="Sign Up"
            linkPath="/register"
            routeStyle={register.register__wrapper__Login}
            url="/user/login"
        >
            <RegisterResetPas/>
        </RegisterLayout>
    )
}
export default Login