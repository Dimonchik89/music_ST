import { Box, Modal, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";
import useHttp from "../../../hooks/useHttp";
import { useRouter } from "next/router";

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

const ModalCategoryUpdate = ({open, handleClose, category, handleOpenAlert}) => {
    const file = useRef(null)
    const [name, setName] = useState(category.name)
    const [img, setImg] = useState(category.img)
    const { updateData } = useHttp(`category/${category.id}`)
    const router = useRouter()

    const changePreview = (e) => {
        const selectImg = e.target.files[0]
        setImg(selectImg)

        if (selectImg) {
            let fr = new FileReader();

            fr.addEventListener("load", function () {
                document.querySelector("#label").style.backgroundImage = "url(" + fr.result + ")";
            }, false);

            fr.readAsDataURL(e.target.files[0]);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('img', img)
        const response = await updateData(formData)
        console.log(response);
        if(response.status === 200) {
            handleClose()
            handleOpenAlert({status: response.status, text: response.statusText})
            router.reload()
        } else {
            handleClose()
            handleOpenAlert({status: response.response.status, text: response.message})
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <form 
                    className={modal.form__update}
                    onSubmit={onSubmit}    
                >
                    <TextField
                        variant="standard"
                        label="Name"
                        fullWidth
                        inputProps={{style: {fontSize: 20}}}
                        InputLabelProps={{style: {fontSize: 14}}}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Box className={modal.img__wrapper}>
                        <Box 
                            id="label"
                            className={modal.img}
                            style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_IMG_URL}${img})`}}
                        >
                        </Box>
                        <input
                            className={modal.file}
                            ref={file}
                            type="file"
                            accept="image/*"
                            onChange={e => {
                                changePreview(e)
                            }}
                        />
                    </Box>
                    <Box className={`${helper.d__flex} ${helper.space__between}`}>
                        <Button
                            variant="outlined"
                            onClick={() => file.current.click()}
                        >
                            Select Photo
                        </Button>
                        <Button type="submit" variant="outlined" color="success">
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}
export default ModalCategoryUpdate;