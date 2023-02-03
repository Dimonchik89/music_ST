import { useRef } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { categoryValidate } from '../../../validate/validate';
import useHttp from "../../../hooks/useHttp";
import { useRouter } from "next/router";

import error from "../../../styles/error.module.scss";
import modal from "../../../styles/modal.module.scss";
import helper from "../../../styles/helper.module.scss";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCategoryCreate = ({open, handleClose, handleOpenAlert}) => {
    const file = useRef(null)
    const { postData } = useHttp('category')
    const router = useRouter()

    const changePreview = (e) => {
        console.log(e.target.files)
        const selectImg = e.target.files[0]
        if (selectImg) {
            let fr = new FileReader();

            fr.addEventListener("load", function () {
                document.querySelector("#label__create").style.backgroundImage = "url(" + fr.result + ")";
            }, false);

            fr.readAsDataURL(e.target.files[0]);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            img: null,

        },
        validate: categoryValidate,
        onSubmit: async (values) => {
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("img", values.img)
            const response = await postData(formData)
            console.log(response);
            if(response.status === 200) {
                handleClose()
                handleOpenAlert({status: response.status, text: response.statusText})
                values.name = ""
                values.img = null
                router.reload()
            } else {
                handleClose()
                handleOpenAlert({status: response.response.status, text: response.message})
                values.name = ""
                values.img = null
            }
        }
    })

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h4" component="h2" textAlign="center">
                    Create category
                </Typography>
                <Box>
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <Box className={modal.field__wrapper}>
                            <TextField
                                className={modal.category__field}
                                label="Name Category"
                                variant="standard" 
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 20}}}
                                InputLabelProps={{style: {fontSize: 14}}}
                            />
                            {formik.errors.name ? <div className={error.error}>{formik.errors.name}</div> : null}
                        </Box>

                        <Box className={modal.field__wrapper}>
                            <Box 
                                id="label__create"
                                className={modal.img}
                            ></Box>
                            
                            <input 
                                className={modal.category__file}
                                ref={file}
                                type="file"
                                name="img"
                                accept='image/*'
                                onChange={(e) => {
                                    changePreview(e)
                                    formik.setFieldValue('img', e.currentTarget.files[0])
                                }}
                            />
                            {formik.errors.img ? <div className={error.error}>{formik.errors.img}</div> : null}
                        </Box>

                        <Box className={`${helper.d__flex} ${helper.space__between}`}>
                            <Button
                                variant="outlined"
                                onClick={() => file.current.click()}
                            >
                                Select Photo
                            </Button>
                            <Button
                                variant="outlined"
                                type="submit"
                                color="success"
                            >
                                Create
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalCategoryCreate