import { baseAlert } from './alerts/baseAlert';
import { usuariosAlert } from './alerts/alerts';

const alertService = {
    base: baseAlert,
    usuarios: usuariosAlert
};

export default alertService;