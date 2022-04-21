import config from "../config/config.json";
import {Delivery} from "../interfaces/delivery";

const deliveries = {
    getDeliveries: async function getDeliveries(): Promise<Delivery[]> {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Delivery) {
        const currentDate = new Date().toLocaleDateString('se-SV');
        let deliveryToAdd = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date ?? currentDate,
            comment: delivery.comment,
            api_key: config.api_key
        }
        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(deliveryToAdd),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }
}

export default deliveries;
