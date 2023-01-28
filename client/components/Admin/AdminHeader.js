import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import { useRouter } from "next/router"

const AdminHeader = () => {
    const router = useRouter()

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar 
                    variant="dense"
                    sx={{display: "flex", justifyContent: "center"}}    
                >
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        component="div"
                        sx={{marginLeft: 20, marginRight: 20, cursor: 'pointer'}}
                        onClick={() => router.push('/admin')}
                    >
                        Music
                    </Typography>
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        component="div"
                        sx={{marginLeft: 20, marginRight: 20, cursor: 'pointer'}}
                        onClick={() => router.push('/admin/category')}
                    >
                        Category
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default AdminHeader;