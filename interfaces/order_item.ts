interface OrderItem {
    product_id: number,
    amount: number,
    name: string,
    article_number: string,
    description: string,
    specifiers: string,
    stock: number,
    location: string,
    price: number
}

export { OrderItem };
