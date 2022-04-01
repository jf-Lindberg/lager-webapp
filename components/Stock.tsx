import {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import config from "../config/config.json";
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

function StockList() {
    let [fontsLoaded] = useFonts({
        DarkerGrotesque_400Regular,
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text style={styles.stockList}
                                                        key={index}>{product.name} - {product.stock}</Text>);

    if (!fontsLoaded) {
        return <Text>Not loaded yet</Text>;
    } else {
        return (
            <View>
                {list}
            </View>
        );
    }

}


export default function Stock() {
    return (
        <View>
            <Text style={styles.title}>Lagerförteckning</Text>
            <StockList/>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 33.75,
        alignSelf: 'center',
        fontFamily: 'DarkerGrotesque_400Regular'
    },
    stockList: {
        fontSize: 22.5,
        lineHeight: 33.75,
        alignSelf: 'center',
        fontFamily: 'DarkerGrotesque_400Regular',
    },
});
