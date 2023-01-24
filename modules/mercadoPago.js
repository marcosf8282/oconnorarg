const mercadoPago = require('mercadopago')
const credential = process.env.ACCESS_TOKEN || "APP_USR-7631644521679159-100511-b9fd021ec0f63aa31fdb586bee8f9b6c-506074988"
let server = "http://localhost:3000" || 'https://oconnor.herokuapp.com/';
const procesed = `${server}/procesed`;
const failure = `${server}/failure`;
const pendin = `${server}/pendin`;

const mp  = async (items,cuotes,shipping) => {
    try {
        mercadoPago.configure({
            access_token: credential
        })
        let config = {
            items:items,
            back_urls:{
                success: procesed,
                failure: failure,
                pending: pendin
            },
            payment_methods:{
                installments:cuotes
            },
            auto_return: "approved",
            shipments:{
                cost: shipping,
                mode: "not_specified",
            }
        }

        let preference = await mercadoPago.preferences.create(config)

        return preference

    } catch (error) {
        throw new Error(error)
    }
}
module.exports = mp
