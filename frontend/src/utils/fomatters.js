//Fomatar Data DD/MM/YYYY
export const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

//Formatar valor BRL(R$)
export const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
};

//Formatar percentual
export const formatarPercentual = (valor) => {
    return `${(valor * 100).toFixed(2)}%`
};