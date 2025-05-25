import { useState, useEffect, createContext, useContext } from 'react';
import { getToken, setToken, removeToken } from '../../utils/authToken';
import dashboardService from '../../services/dashboard/dashboardService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        verificarToken();
    }, []);

    const verificarToken = async () => {
        const token = getToken();
        if (token) {
            try {
                const userData = await dashboardService.auth.verificarToken();
                setUser(userData);
            } catch (error) {
                console.error('Erro ao verificar token:', error);
                removeToken();
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (email, senha) => {
        const response = await dashboardService.auth.login(email, senha);
        setToken(response.token);
        setUser(response.usuario);
        return response;
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    const register = async (userData) => {
        return await dashboardService.auth.registrar(userData);
    };

    const updateUser = async (userData) => {
        const response = await dashboardService.auth.atualizarUsuario(userData);
        setUser(response);
        return response;
    };

    const value = {
        user,
        loading,
        login,
        logout,
        register,
        updateUser,
        verificarToken
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export default useAuth; 