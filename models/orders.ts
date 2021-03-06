import config from "../config/config.json";
import { Order } from "../interfaces/order";
import { OrderItem } from "../interfaces/order_item";
import { products } from "./products";

const orders = {
    getOrders: async function getOrders(): Promise<Order[]> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    getOrder: async function getOrder(order_id: number | undefined): Promise<Order> {
        const response = await fetch(`${config.base_url}/orders/${order_id}?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    pickOrder: async function pickOrder(order: Order) {
        await Promise.all(order.order_items.map(async (order_item: OrderItem) =>
        {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key
            }

            await products.updateProduct(changedProduct);
        }))
        order.status_id = 200;
        await orders.updateOrder(order);
    },
    updateOrder: async (order: Partial<Order>) => {
        order.api_key = config.api_key;
        await fetch(`${config.base_url}/orders`, {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })

    }
};

export { orders };
