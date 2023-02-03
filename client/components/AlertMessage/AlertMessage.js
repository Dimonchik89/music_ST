import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertMessage = ({handleClose, open, status, text}) => {

    const content = status === 200 ? 
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '20%' }}>
                {text}
            </Alert>
        </Snackbar> :
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '20%' }}>
                {text}
            </Alert>
        </Snackbar>

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
        {content}
    </Stack>
  );
}

export default AlertMessage