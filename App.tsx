import {StatusBar} from 'expo-status-bar';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import food from './assets/food.jpg';
import Stock from './components/Stock.tsx';
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

export default function App() {
    let [fontsLoaded] = useFonts({
        DarkerGrotesque_400Regular,
    });

    if (!fontsLoaded) {
        return <Text>Not loaded yet</Text>;
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.base}>
                    <Text style={styles.title}>Lager-Appen</Text>
                    <Image source={food} style={styles.mainImg}/>
                    <Stock/>
                    <StatusBar style="auto"/>
                </View>
            </SafeAreaView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffdd0',
    },
    base: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingLeft: 12,
        paddingRight: 12,
    },
    title: {
        fontSize: 50.063,
        textAlign: 'center',
        fontFamily: 'DarkerGrotesque_400Regular'
    },
    mainImg: {
        width: 320,
        height: 240,
        alignSelf: 'center',
    }
});
