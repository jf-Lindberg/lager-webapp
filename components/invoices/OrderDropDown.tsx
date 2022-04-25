import {useState, useEffect} from "react";
import { Picker } from '@react-native-picker/picker'
import {Order} from "../../interfaces/order";
import { orders as orderModel } from "../../models/orders";

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Array<Order>>([]);
    let orderHash: any = {};

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status_id != 600).map((ord, index) => {
        orderHash[ord.id] = ord;
        return <Picker.Item key={index} label={ord.name} value={ord.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
            }}>
            <Picker.Item value='' label='Välj en order'/>
            {ordersList}
        </Picker>
    );
}

export {OrderDropDown};
