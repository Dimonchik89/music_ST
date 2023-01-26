import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useHttp from "../../hooks/useHttp";

import modal from "../../styles/modal.module.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalCreateCategory = ({open, handleClose}) => {
    const [name, setName] = useState("")
    const [file, setFile] = useState(null)
    const { createCategory } = useHttp('category')

    const selectFile = (e) => {
        console.log(e.target?.files[0]);
        setFile(e.target?.files[0])
    }

    const addCategory = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("img", file)
        createCategory(formData).then(data => {
            setName("")
            setFile(null)
            handleClose()
        })
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <form 
                    className={modal.form}
                    onSubmit={addCategory}    
                >
                    <TextField 
                        label="Name" 
                        variant="standard" 
                        className={modal.field}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="file" 
                        onChange={selectFile}
                    />
                    <Button type="submit">
                        Send
                    </Button>
                </form>
            </Box>
      </Modal>
    )
}
export default ModalCreateCategory;