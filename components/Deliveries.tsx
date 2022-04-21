import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="List">
                {(screenProps) => <DeliveriesList {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps} setProducts={props.setProducts}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
