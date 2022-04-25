import {useState, useEffect} from "react";
import { Picker } from '@react-native-picker/picker'
import {Product} from "../../interfaces/product";
import {products as productModel} from "../../models/products";

function ProductDropDown(props) {
    const [products, setProducts] = useState<Array<Product>>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            <Picker.Item value='' label='Välj en produkt'/>
            {itemsList}
        </Picker>
    );
}

export {ProductDropDown};
