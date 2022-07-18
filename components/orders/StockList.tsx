import {useEffect} from "react";
import {products as productsModel} from "../../models/products";
import {Typography} from '../../styles';
import {Product} from "../../interfaces/product";
import {Text, View} from "react-native";

export default function StockList({products, setProducts}) {
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
