import {Text, View, Button} from "react-native";
import {useEffect, useState} from "react";
import {Order} from "../../interfaces/order";
import {orders} from "../../models/orders";
import config from "../../config/config.json";
import {Base, Typography} from "../../styles";

export default function ShipList({route, navigation}) {
    const {reload} = route.params || false;
    const [allOrders, setAllOrders] = useState<Array<Order>>([]);

    if (reload) reloadOrders();

    async function reloadOrders() {
        setAllOrders(await orders.getOrders());
    }

    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setAllOrders(result.data));
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Packade ordrar</Text>
            {listOfOrders}
        </View>
    )
}
