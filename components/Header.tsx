import {Image, Text, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {Base, Typography} from '../styles';
// @ts-ignore
import food from "../assets/food.jpg";


export default function Header() {
    return (
        <SafeAreaView>
            <View style={Base.header}>
                <Text style={Typography.header1}>Asia Online</Text>
                <Image source={food} style={Base.mainImg}/>
            </View>
        </SafeAreaView>
    );
}
