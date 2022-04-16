import {useEffect} from "react";
import {Text, View} from "react-native";
import {Typography} from '../styles';
import {products as productsModel} from "../models/products";

function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productsModel.getProducts());
    }, []);

    const list = products.map((product, index) => <Text style={Typography.stockList}
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
