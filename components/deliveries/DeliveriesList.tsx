import { useState, useEffect } from 'react';
import {View, ScrollView, Text, Button} from "react-native";
import {Delivery} from "../../interfaces/delivery";
import deliveries from "../../models/deliveries";

import {Base, Typography, DeliveryListStyling} from "../../styles";
import config from "../../config/config.json";

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState<Array<Delivery>>([]);

    if (reload) reloadDeliveries();
    async function reloadDeliveries() {
        setAllDeliveries(await deliveries.getDeliveries());
    }

    useEffect(() => {
        fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setAllDeliveries(result.data));
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            console.log(delivery);
            return <View key={delivery.id} style={DeliveryListStyling.deliveriesList}>
                <Text key={delivery.product_name} style={Typography.deliveryListItem}>Produkt: {delivery.product_name}</Text>
                <Text key={delivery.amount}>Antal: {delivery.amount}</Text>
                <Text key={delivery.delivery_date}>Datum: {delivery.delivery_date}</Text>
            </View>
        });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {allDeliveries.length === 0 && <Text style={Typography.textCenter}>Det finns inte några leveranser att visa.</Text>}
            {allDeliveries.length > 0 && listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}

