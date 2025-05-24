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


//Formatar cartão de crédito
export const formatarNumeroCartao = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for(let i = 0, len = match.length; i < len; i += 4){
        parts.push(match.substring(i, i + 4));
    }

    if(parts.length){
        return parts.join(' ');
    }else{
        return value;
    }
}


export const formatarDataExpiracao = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (v.length >= 3) {
        return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
}