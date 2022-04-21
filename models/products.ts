import config from "../config/config.json";
import {Product} from "../interfaces/product";
import {Delivery} from "../interfaces/delivery";

const products = {
    getProducts: async function getProducts (): Promise<Product[]> {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },
/*    getSpecificProduct: async function getSpecificProduct(id: number): Promise<Product[]> {
        const response = await fetch(`${config.base_url}/products/${id}?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },*/
    updateProduct: async function updateProduct(product: Partial<Product>) {
        await fetch(`${config.base_url}/products`, {
            body: JSON.stringify(product),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
    }
}

export { products }
