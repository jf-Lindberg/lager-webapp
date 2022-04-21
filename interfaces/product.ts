interface Product {
    id: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: string,
    stock: number,
    location: string,
    price: string | number,
    api_key: string
}

export { Product };
