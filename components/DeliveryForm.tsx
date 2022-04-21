import {useState} from 'react';
import {ScrollView, Text, TextInput, Button, KeyboardAvoidingView} from "react-native";
import {Base, Typography, Form} from '../styles';

import config from "../config/config.json";
import deliveries from "../models/deliveries";
import {Delivery} from '../interfaces/delivery';
import {products as productsModel, products} from "../models/products";
import {Product} from "../interfaces/product";
import {ProductDropDown} from "./ProductDropDown";
import {DateDropDown} from "./DateTimePicker";

export default function DeliveryForm({navigation, setProducts}) {
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    async function addDelivery() {
        console.log(`CURRENT PRODUCT: ${JSON.stringify(currentProduct)}`);
        console.log(`DELIVERY: ${JSON.stringify(delivery)}`);
        try {
            await deliveries.addDelivery(delivery);
            let changedProduct = {
                id: currentProduct.id,
                name: currentProduct.name,
                stock: currentProduct.stock + delivery.amount,
                api_key: config.api_key
            }
            await products.updateProduct(changedProduct);
            setProducts(await productsModel.getProducts());
            navigation.navigate("List", {reload: true});
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <ScrollView style={{...Base.base}}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                keyboardVerticalOffset={150}
                behavior={"position"}
            >
                <Text style={{...Typography.header2}}>Ny inleverans</Text>

                <Text style={{...Typography.label}}>Produkt</Text>
                <ProductDropDown
                    delivery={delivery}
                    setDelivery={setDelivery}
                    setCurrentProduct={setCurrentProduct}
                />

                <Text style={{...Typography.label}}>Antal</Text>
                <TextInput
                    style={{...Form.input}}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, amount: parseInt(content)})
                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType="numeric"
                />

                <Text style={{...Typography.label}}>Datum</Text>
                <DateDropDown
                    style={{...Form.input}}
                    delivery={delivery}
                    setDelivery={setDelivery}
                />

                <Text style={{...Typography.label}}>Kommentar</Text>
                <TextInput
                    style={{...Form.input}}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, comment: content})
                    }}
                    value={delivery?.comment}
                />
            </KeyboardAvoidingView>

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
            />
        </ScrollView>
    );
};
