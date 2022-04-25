import config from "../config/config.json";
import storage from './storage';
import {Invoice} from "../interfaces/invoice";
import {orders as orderModel} from "./orders";
import {Order} from "../interfaces/order";

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice[]> {
        const tokenObject: any = await storage.readToken();
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'content-type': 'application/json',
                'x-access-token': tokenObject.token
            }
        });
        const result = await response.json();

        return result.data;
    },
    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        let order = await orderModel.getOrder(invoice.order_id);
        order.status_id = 600;
        await orderModel.updateOrder(order);

        invoices.calcTotalPrice(invoice, order);
        invoices.setDueDate(invoice);

        invoice.api_key = config.api_key;

        const tokenObject: any = await storage.readToken()
        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoice),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token
                },
                method: 'POST'
            });

            console.log(response);
        } catch (e) {
            console.log(e);
        }
    },
    setDueDate: (invoice: Partial<Invoice>) => {
        const currentDate = new Date().toLocaleDateString('se-SV');
        invoice.creation_date = invoice.creation_date ?? currentDate;

        let dueDate = new Date(invoice.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);
        invoice.due_date = dueDate.toLocaleDateString('se-SV');
    },
    calcTotalPrice: (invoice: Partial<Invoice>, order: Order) => {
        invoice.total_price = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);
    }
}

export default invoices;
