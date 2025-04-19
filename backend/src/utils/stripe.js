import Stripe from 'stripe';

// inicia conexão com a  stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET, {
    httpClient: Stripe.createFetchHttpClient(),
});

// verifica se já existe um cliente com o mesmo email na base da stripe
export const getStripeCustomerByEmail = async (email) =>{
    const customers = await stripe.customers.list({email});
    return customers?.data[0];
};

// cria cliente
export const createStripeCustomer = async({ email, name }) => {
    try{
        const customer = await getStripeCustomerByEmail(email);
        if(customer) return customer;
    
        const newCustomer = await stripe.customers.create({
            email: email,
            name: name
        });
        return newCustomer
    }
    catch(Error){
        console.log('createStripeCustomer Error: ', error);
        throw error; 
    }
  
};

// Cria produto (No nosso caso seria o evento)
export const createStripeProduct = async({name, description, price}) =>{
    try{
        let product = await stripe.products.create({
            name: name,
            description: description,
            active: true,
            default_price_data: {
                currency: 'brl',
                unit_amount_decimal: price
            }
        });
        return product;
    }
    catch(Error){
        console.log('createStripeProduct Error: ', error);
        throw error; 
    }
   
}

// Cria a sessão de pagamento pdo ingresso do usuario.
export const createStripeCheckout = async({email, usuarioId, priceId, quantity}) =>{
    try {
        // retorna o cliente na stripe, se não existir cria um
        const customer = await createStripeCustomer({ email });

        const thisSession  = await stripe.checkout.sessions.create({
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_ERROR_URL,
            mode: 'payment',
            customer: customer.id,
            client_reference_id: usuarioId,
            line_items : [
                {
                    price: priceId,
                    quantity: quantity
                }
            ],
            payment_method_types : ['card', 'boleto'],

        })
        return thisSession;

    } catch (error) {
        console.log('checkout Error: ', error);
        throw error; 
    }
}

