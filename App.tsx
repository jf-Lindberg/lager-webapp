import {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Header from "./components/Header";
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import {Base} from './styles';

import {
    useFonts,
    // DarkerGrotesque_300Light,
    DarkerGrotesque_400Regular,
    // DarkerGrotesque_500Medium,
    // DarkerGrotesque_600SemiBold,
    // DarkerGrotesque_700Bold,
    // DarkerGrotesque_800ExtraBold,
    // DarkerGrotesque_900Black
} from '@expo-google-fonts/darker-grotesque';
import {Text} from "react-native";

const routeIcons: { [key: string]: string } = {
    "Lager": "home",
    "Plock": "list",
    "Inleveranser": "car-outline"
};
const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);

    let [fontsLoaded] = useFonts({
        DarkerGrotesque_400Regular,
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
                    </Tab.Navigator>
                </NavigationContainer>
                <StatusBar style="auto"/>
            </SafeAreaView>
        );
    }
}
