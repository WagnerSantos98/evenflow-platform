import { baseAlert } from "./baseAlert";

export const usuariosAlert = {
    sucesso: (acao) => {
        const mensagens = {
            criar: 'Usuário cadastrado com sucesso!',
            editar: 'Usuário atualizado com sucesso!',
            excluir: 'Usuário excluído com sucesso!',
        };
        return baseAlert.success(mensagens[acao] || 'Operação realizada com sucesso!');
    },
    
    erro: (acao) => {
        const mensagens = {
            criar: 'Erro ao cadastrar usuário.',
            editar: 'Erro ao atulizar usuário.',
            excluir: 'Erro ao excluir usuário',
        };
        return baseAlert.error(mensagens[acao] || 'Erro na operação.');
    },

    confirmar: async () => {
        const result = await baseAlert.confirm(
            'Deseja realmente excluir este usuário? Esta ação não pode ser desfeita.',
            'Confirmar exclusão'
        );
        if(result.isConfirmed){
            return baseAlert.success('Usuário excluído com sucesso!');
        }        
    }
};

export const eventosAlert = {

};