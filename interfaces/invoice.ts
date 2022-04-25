interface Invoice {
    order_id: number,
    name: string,
    total_price: number,
    creation_date: string,
    due_date: string,
    api_key: string
}

export { Invoice };
