import { useRef } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, TextField, Typography, TextareaAutosize } from "@mui/material"
import { useFormik, Field, FormikProvider } from "formik"
import { musicValidate } from '../../../validate/validate';
import { useRouter } from "next/router";
import { allCategory } from "../../../store/category";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


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

const ModalMusicAdmin = ({open, handleClose, handleOpenAlert, nameValue, imgValue, descriptionValue, categoryIdValue, keywordsValue, audioValue, serverFunc, buttonTitle, allCategory}) => {
    const imgRef = useRef(null)
    const audioRef = useRef(null)
    const router = useRouter()

    const changePreview = (e) => {
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
            name: nameValue,
            description: descriptionValue,
            categoryId: categoryIdValue,
            keywords: keywordsValue,
            audio: audioValue,
            img: imgValue
        },
        validate: musicValidate,
        onSubmit: async (values) => {
            console.log(values.categoryId.join(", "));
            const formData = new FormData()
            formData.append("name", values.name.trim())
            formData.append("description", values.description.trim())
            formData.append("keywords", values.keywords.trim())
            formData.append("categoryId", values.categoryId.join(", "))
            formData.append("img", values.img)
            formData.append("audio", values.audio)
            const response = await serverFunc(formData)
            if(response.status === 200) {
                handleClose()
                handleOpenAlert({status: response.status, text: response.statusText})
                values.name = ""
                values.description = ""
                values.categoryId = []
                values.keywords = ""
                values.audio = null
                values.img = null
                router.reload()
            } else {
                handleClose()
                handleOpenAlert({status: response.response.status, text: response.message})
                values.name = ""
                values.description = ""
                values.categoryId = []
                values.keywords = ""
                values.audio = null
                values.img = null
            }
        }
    })

    return (
        <FormikProvider value={formik}>
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
                        className={modal.form__update}
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
                            <TextField
                                className={modal.category__field}
                                label="description"
                                variant="standard" 
                                name="description"
                                type="text"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 16}}}
                                InputLabelProps={{style: {fontSize: 14}}}
                                rows={6}
                                multiline
                                maxRows={8}
                            />
                            {formik.errors.description ? <div className={error.error}>{formik.errors.description}</div> : null}
                        </Box>

                        <Box className={modal.field__wrapper}>
                            <TextField
                                className={modal.category__field}
                                label="keywords"
                                variant="standard" 
                                name="keywords"
                                type="text"
                                value={formik.values.keywords}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 20}}}
                                InputLabelProps={{style: {fontSize: 14}}}
                            />
                            {formik.errors.keywords ? <div className={error.error}>{formik.errors.keywords}</div> : null}
                        </Box>

                        <Box>
                            <FormGroup>
                                {allCategory?.map(category => <Field
                                                                type="checkbox"
                                                                name="categoryId"
                                                                value={category.id}
                                                                key={category.id}
                                                                as={FormControlLabel}
                                                                control={<Checkbox/>}
                                                                checked={formik.values.categoryId.includes(`${category.id}`)}
                                                                label={category.name}
                                                               />
                                )}
                            </FormGroup>
                        </Box>

                        <Box className={modal.img__wrapper}>
                            <Box 
                            ></Box>
                            <Box>Music: {formik.values?.audio?.name || formik.values?.audio}</Box>
                            <input 
                                className={modal.file}
                                ref={audioRef}
                                type="file"
                                name="audio"
                                accept='audio/*'
                                onChange={(e) => {
                                    formik.setFieldValue('audio', e.currentTarget.files[0])
                                }}
                            />
                            {formik.errors.img ? <div className={error.error}>{formik.errors.img}</div> : null}
                        </Box>

                        <Box className={modal.img__wrapper}>
                            <Box 
                                id="label__create"
                                className={modal.img}
                                style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL}${formik.values.img})`}}
                            ></Box>
                            <input 
                                className={modal.file}
                                ref={imgRef}
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
                                onClick={() => imgRef.current.click()}
                            >
                                Select Photo
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => audioRef.current.click()}
                            >
                                Select Music
                            </Button>
                            <Button
                                variant="outlined"
                                type="submit"
                                color="success"
                            >
                                {buttonTitle}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
        </FormikProvider>
    )
}

const mapStateToProps = createStructuredSelector({
    allCategory
})

export default connect(mapStateToProps)(ModalMusicAdmin);