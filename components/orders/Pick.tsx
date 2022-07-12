import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props: { setProducts: any; }) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="List" component={OrderList} />
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
