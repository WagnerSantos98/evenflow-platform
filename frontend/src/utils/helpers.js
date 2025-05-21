//Gerador de senha para novos usuários
export const generatePassword = (length = 12) => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppersase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*';

    const getRandomChar = (chars) => 
        chars[Math.floor(Math.random() * chars.length)];

        //Garante pelo menos um caractere de cada tipo
        const requiredChars = [
            getRandomChar(lowercase),
            getRandomChar(uppersase),
            getRandomChar(numbers),
            getRandomChar(symbols)
        ];

        const allChars = lowercase + uppersase + numbers + symbols;

        //Preenche o restante da senha
        const remainingChars = Array.from({ length: length - requiredChars.length }, () =>
            getRandomChar(allChars)
        );

        //Pega os valores embaralha e retorna
        const password = [...requiredChars, ...remainingChars]
            .sort(() => Math.random() - 0.5)
            .join('');

        return password;

};

//Via CEP pesquisa automática
export const buscarCep = async(cep, setFormData, setCamposDesabilitados) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if(cepLimpo.length !== 8) return null;

    try{
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if(data.erro){
            setCamposDesabilitados({
                rua: false,
                bairro: false,
                cidade: false,
                estado: false
            });
            return;
        }

        setFormData(prev => ({
            ...prev,
            endereco:{
                ...prev.endereco,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
            }
        }));

        setCamposDesabilitados({
            rua: true,
            bairro: true,
            cidade: true,
            estado: true
        })
    }catch(error){
        console.error('Erro ao buscar CEP:', error);
        setCamposDesabilitados({
            rua: false,
            bairro: false,
            cidade: false,
            estado: false
        });
    }
};