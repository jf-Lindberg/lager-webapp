import {View, Text, Button} from "react-native";
import orderModel from "../models/orders";
import {products as productsModel} from "../models/products";
import {OrderItem} from "../interfaces/order_item";
import {Typography} from "../styles/index";

export default function PickList({route, navigation, setProducts}) {
    const {order} = route.params;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productsModel.getProducts());
        navigation.navigate("List", {reload: true});
    }

    let enoughInStock = true;
    const orderItemsList = order.order_items.map((item: Partial<OrderItem>, index: number) => {
        if (item.stock - item.amount < 0) {
            enoughInStock = false;
        }
        return <Text
            key={index}
        >
            {item.name} - {item.amount} - {item.location}
        </Text>;
    });

    return (
        <View>
            <Text style={Typography.header2}>Orderinfo</Text>
            <View style={Typography.stockList}>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>
            </View>
            <Text style={Typography.header2}>Produkter:</Text>
            <View style={Typography.stockList}>
                {orderItemsList}
            </View>
            {enoughInStock ? <Button title="Plocka order" onPress={pick}/> :
                <Button title="Plocka order" disabled onPress={pick}>Kan ej plockas</Button>}
        </View>
    )
};
