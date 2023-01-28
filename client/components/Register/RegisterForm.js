import { useState } from "react";
import { Box } from "@mui/system";
import { useFormik } from "formik"
import { validate } from "../../validate/validate";
import form from "../../styles/form.module.scss";
import button from "../../styles/button.module.scss";
import error from "../../styles/error.module.scss";
import { setCookie } from 'cookies-next';
import { useRouter } from "next/router";
import useHttp from "../../hooks/useHttp";

const RegisterForm = ({title, buttonTitle, url}) => {
    const router = useRouter()
    const { enterUser } = useHttp(url)

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validate,
        onSubmit: async (values) => {
            console.log(values);
            await enterUser({email: values.email, password: values.password})
                .then(data => {

                    if(data.response) {
                        const { message } = data.response.data
                        console.log('message', data)
                        return 
                    }

                    const { token } = data?.data
                    setCookie("token", token);
                    router.push('/')
                })
        }
    })

    return (
        <Box>
            <p className={form.form__title}>{title}</p>
            <Box
                className={form.form__wrapper}
            >
                <form
                    className={form.form}
                    onSubmit={formik.handleSubmit}
                >
                    <input 
                        className={form.form__field}
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoComplete="off"
                    />
                    {formik.errors.email ? <div className={error.error}>{formik.errors.email}</div> : null}

                    <input 
                        className={form.form__field}
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="new-password"
                    />
                    {formik.errors.password ? <div className={error.error} >{formik.errors.password}</div> : null}
                   <Box
                        className={form.button__wrapper}
                   >
                        <button
                            type="submit"
                            className={button.button__yellow__bold}
                        >
                            {buttonTitle}
                        </button>
                   </Box>
                </form>
            </Box>
        </Box>
    )
}
export default RegisterForm;