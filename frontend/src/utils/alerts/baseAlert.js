import Swal from 'sweetalert2';
import { colors } from '../../styles/themes/colors';

export const baseAlert = {
    success: (message, title = 'Sucesso') => 
        Swal.fire({
            toast: true,
            title,
            text: message,
            icon: 'success',
            iconColor: colors.toast_success.icon,
            position: 'top-end',
            showCloseButton: true,
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            background: colors.toast_success.main,
            color: colors.toast_success.contrastText,
            didOpen: (toast) => {
                toast.style.marginTop = '60px';
            }
        }),
    error: (message, title = 'Erro') => 
        Swal.fire({
            toast: true,
            title,
            text: message,
            icon: 'error',
            iconColor: colors.toast_error.icon,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 5000,
            timerProgressBar: true,
            background: colors.toast_error.main,
            color: colors.toast_error.contrastText,
            didOpen: (toast) => {
                toast.style.marginTop = '60px';
            }
        }),
    confirm: (message, title = 'Tem certeza?') => 
        Swal.fire({
            title,
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: colors.error,
            cancelButtonColor: colors.secondary.main,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            background: colors.background.paper,
            color: colors.text.primary
        }),
}