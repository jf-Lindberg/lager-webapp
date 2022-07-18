import {useState} from 'react';
import {ScrollView, Text, TextInput, Button, KeyboardAvoidingView} from "react-native";
import {Base, Typography, Form} from '../../styles';

import config from "../../config/config.json";
import deliveries from "../../models/deliveries";
import {Delivery} from '../../interfaces/delivery';
import {products as productsModel, products} from "../../models/products";
import {Product} from "../../interfaces/product";
import ProductDropDown from "./ProductDropDown";
import DateDropDown from "./DateTimePicker";
import {showMessage} from "react-native-flash-message";

export default function DeliveryForm({navigation, setProducts}) {
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});

    async function addDelivery() {
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

    function deliveryValidated() {
        return (delivery.delivery_date && delivery.amount && delivery.product_name);
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
                    testID="delivery-product-dropdown"
                />

                <Text style={{...Typography.label}}>Antal</Text>
                <TextInput
                    style={{...Form.input}}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, amount: parseInt(content)})
                    }}
                    value={delivery?.amount?.toString()}
                    keyboardType="numeric"
                    testID="delivery-amount"
                />

                <Text style={{...Typography.label}}>Datum</Text>
                <DateDropDown
                    style={{...Form.input}}
                    delivery={delivery}
                    setDelivery={setDelivery}
                    testID="delivery-date-dropdown"
                />

                <Text style={{...Typography.label}}>Kommentar</Text>
                <TextInput
                    style={{...Form.input}}
                    onChangeText={(content: string) => {
                        setDelivery({...delivery, comment: content})
                    }}
                    value={delivery?.comment}
                    testID="delivery-comment"
                />
            </KeyboardAvoidingView>

            <Button
                style={Base.button}
                title="Gör inleverans"
                onPress={() => {
                    if (deliveryValidated()) {
                        addDelivery().then();
                    } else {
                        showMessage({
                            message: "Formuläret ej korrekt ifyllt",
                            description: "Produkt, antal och datum är obligatoriska fält.",
                            type: "warning"
                        })
                    }
                }}
                testID="delivery-button"
            />
        </ScrollView>
    );
};
