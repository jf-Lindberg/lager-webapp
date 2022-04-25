import {useEffect} from "react";
import {Text, View} from "react-native";
import {Typography} from '../../styles';
import {products as productsModel} from "../../models/products";
import {Product} from "../../interfaces/product";

function StockList({products, setProducts}) {
    useEffect(() => {
        async function getProducts() {
            const response = await productsModel.getProducts();
            setProducts(response);
        }
        getProducts();
    }, []);

    const list = products.map((product: Product, index: number) => <Text style={Typography.stockList}
                                                        key={index}>{product.name} - {product.stock}</Text>);
    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={Typography.header2}>Lagerförteckning</Text>
            <StockList products={products} setProducts={setProducts}/>
        </View>
    )
}

export {Stock}
