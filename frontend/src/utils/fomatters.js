//Fomatar Data DD/MM/YYYY
export const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
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

//Formatar documento CPF e CNPJ
export const formatarDocumento = (value, tipo) => {
    const numeros = value.replace(/\D/g, '');

    if(tipo === 'CPF'){
        return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }else if(tipo === 'CNPJ'){
        return numeros.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    return value;
};

//Formatar telefone
export const formatarTelefone = (value) => {
    const numeros = value.replace(/\D/g, '');
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
}