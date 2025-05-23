import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography
} from '@mui/material';
import { Warning, Error, Info, CheckCircle } from '@mui/icons-material';

const ConfirmDialog = ({ 
    open, 
    title, 
    message, 
    onConfirm, 
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    confirmColor = 'error',
    icon = 'warning'
}) => {
    const getIcon = () => {
        switch (icon) {
            case 'error':
                return <Error color="error" sx={{ fontSize: 60 }} />;
            case 'info':
                return <Info color="info" sx={{ fontSize: 60 }} />;
            case 'success':
                return <CheckCircle color="success" sx={{ fontSize: 60 }} />;
            default:
                return <Warning color="warning" sx={{ fontSize: 60 }} />;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minWidth: 400
                }
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center', pt: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    {getIcon()}
                    <Typography variant="h6" component="div">
                        {title}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText 
                    id="alert-dialog-description"
                    sx={{ 
                        textAlign: 'center',
                        color: 'text.primary',
                        fontSize: '1rem',
                        mt: 2
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 2 }}>
                <Button 
                    onClick={onCancel} 
                    variant="outlined"
                    sx={{ 
                        minWidth: 100,
                        borderRadius: 2
                    }}
                >
                    {cancelText}
                </Button>
                <Button 
                    onClick={onConfirm} 
                    color={confirmColor} 
                    variant="contained"
                    autoFocus
                    sx={{ 
                        minWidth: 100,
                        borderRadius: 2
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog; 