import RegisterLayout from "../components/Register/RegisterLayout"
import register from "../styles/register.module.scss";
import useHttp from "../hooks/useHttp";

const Register = () => {
    const { enterUser } = useHttp("user/register")

    return (
        <RegisterLayout 
            title="Sign in" 
            buttonTitle="Sign In"
            text="Already have an account?"
            link="Log In"
            linkPath="/login"
            routeStyle={register.register__wrapper__register}
            onSubmit={enterUser}
        />
    )
}
export default Register