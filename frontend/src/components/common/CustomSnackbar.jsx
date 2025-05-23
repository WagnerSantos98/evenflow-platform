import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { Slide } from '@mui/material';

const CustomSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
                position: 'fixed',
                top: '80px !important',
                zIndex: 1000
            }}
            TransitionComponent={Slide}
            TransitionProps={{ direction: 'left' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{ 
                    width: '100%',
                    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
                    '& .MuiAlert-message': {
                        fontSize: '0.9rem'
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar; 