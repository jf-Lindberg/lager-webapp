import {View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Base} from '../styles';
import {Stock} from "./orders/Stock"

export default function Home({products, setProducts}) {
    return (
        <SafeAreaView style={Base.container}>
            <View style={Base.base}>
                <StatusBar style="auto"/>
                <Stock products={products} setProducts={setProducts}/>
            </View>
        </SafeAreaView>
    );
}
