import {View, Text, Button} from "react-native";
import {orders} from "../../models/orders";
import {products as productsModel} from "../../models/products";
import {OrderItem} from "../../interfaces/order_item";
import {Base, Typography} from "../../styles";

export default function PickList({route, navigation, setProducts}) {
    const {order} = route.params;

    async function pick() {
        await orders.pickOrder(order);
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
            style={Typography.stockList}
        >
            {item.name} - {item.amount} - {item.location}
        </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Orderinfo</Text>
            <View style={Typography.stockList}>
                <Text style={Typography.name}>{order.name}</Text>
                <Text style={Typography.address}>{order.address}</Text>
                <Text style={Typography.city}>{order.zip} {order.city}</Text>
            </View>
            <Text style={Typography.header2}>Produkter:</Text>
            <View>
                {orderItemsList}
            </View>
            {enoughInStock ? <Button title="Plocka order" onPress={pick}/> :
                <Button title="Plocka order" disabled onPress={pick}>Kan ej plockas</Button>}
        </View>
    )
};
