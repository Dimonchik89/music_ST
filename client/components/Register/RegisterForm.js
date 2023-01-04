import { useState } from "react";
import { Box } from "@mui/system";
import { useFormik } from "formik"
import { validate } from "../../validate/validate";
import text from "../../styles/text.module.scss";
import form from "../../styles/form.module.scss";
import button from "../../styles/button.module.scss";
import helper from "../../styles/helper.module.scss";
import error from "../../styles/error.module.scss";
import { setCookie } from 'cookies-next';

const RegisterForm = ({title, buttonTitle, onSubmit}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validate,
        onSubmit: async (values) => {
            const { data } = await onSubmit(values)
            setCookie("token", data?.token);
        }
    })

    return (
        <Box>
            <p className={`${text.title} ${text.text__center} ${form.form__title} ${helper.lineheight__60}`}>{title}</p>
            <Box
                className={helper.mt__81}
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
                        className={`${text.text__center} ${helper.mt__81}`}
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