import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InvoicesList from '../invoices/InvoicesList';
import InvoicesForm from '../invoices/InvoicesForm';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="List">
                {(screenProps) => <InvoicesList {...screenProps} setIsLoggedIn={props.setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Form">
                {(screenProps) => <InvoicesForm {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
