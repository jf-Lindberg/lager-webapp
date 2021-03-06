import {useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FlashMessage from "react-native-flash-message";

import {Base} from './styles';

import Header from "./components/Header";
import Home from "./components/Home";
import Pick from "./components/orders/Pick";
import Deliveries from "./components/deliveries/Deliveries";
import Auth from './components/auth/Auth';
import AuthModel from './models/auth';
import Invoices from './components/invoices/Invoices';
import Ship from './components/ship/Ship';

import {
    useFonts,
    // DarkerGrotesque_300Light,
    DarkerGrotesque_400Regular,
    // DarkerGrotesque_500Medium,
    // DarkerGrotesque_600SemiBold,
    DarkerGrotesque_700Bold,
    // DarkerGrotesque_800ExtraBold,
    // DarkerGrotesque_900Black
} from '@expo-google-fonts/darker-grotesque';
import {Text} from "react-native";

const routeIcons: { [key: string]: string } = {
    "Lager": "home",
    "Plock": "list",
    "Inleveranser": "car-outline",
    "Faktura": "cash-outline",
    "Skicka": "send-outline",
    "Logga in": "enter-outline"
};
const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const checkLoggedIn = async () => {
            setIsLoggedIn(await AuthModel.loggedIn())
        };
        checkLoggedIn().then();
    }, []);

    let [fontsLoaded] = useFonts({
        DarkerGrotesque_400Regular,
        DarkerGrotesque_700Bold
    });
    if (!fontsLoaded) {
        return <Text>Not loaded yet</Text>;
    } else {
        return (
            <SafeAreaView style={Base.container}>
                <Header/>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName = routeIcons[route.name] || "alert";

                            // @ts-ignore
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                        tabBarActiveTintColor: 'blue',
                        tabBarInactiveTintColor: 'gray',
                        headerShown: false
                    })}
                    >
                        <Tab.Screen name="Lager">
                            {() => <Home products={products} setProducts={setProducts}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Plock">
                            {() => <Pick setProducts={setProducts}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Inleveranser">
                            {() => <Deliveries products={products} setProducts={setProducts}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Skicka" component={Ship}/>
                        {isLoggedIn ?
                            <Tab.Screen name="Faktura">
                                {() => <Invoices setIsLoggedIn={setIsLoggedIn}/>}
                            </Tab.Screen> :
                            <Tab.Screen name="Logga in">
                                {() => <Auth setIsLoggedIn={setIsLoggedIn}/>}
                            </Tab.Screen>
                        }
                    </Tab.Navigator>
                </NavigationContainer>
                <StatusBar style="auto"/>
                <FlashMessage position="top"/>
            </SafeAreaView>
        );
    }
}
