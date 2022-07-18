import {useState, useEffect} from "react";
import {Text, View, StyleSheet} from "react-native";
import {Base, Typography} from "../../styles";
import MapView, {Marker} from "react-native-maps";
import * as Location from "expo-location";

import getCoordinates from "../../models/nominatim";
import {stockList} from "../../styles/typography";

export default function ShipOrder({route}) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        (async () => {
            const result = await getCoordinates(`${order.address},${order.city}`)
            console.log(result);

            setMarker(<Marker
                coordinate={{latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon)}}
                title={result[0].display_name}
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied.");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />)
        })();
    }, []);

    let orderItems = order.order_items.map(item => {
        return `${item.amount} ${item.name}\n`;
    })


    return (
        <View style={Base.base}>
            <View style={styles.infoContainer}>
                <View>
                    <Text style={Typography.header2}>Skicka order</Text>
                    <Text style={Typography.header3}>{order.name}</Text>
                    <Text style={Typography.header3}>{order.address}</Text>
                    <Text style={Typography.header3}>{order.city}</Text>
                </View>
                <View>
                    <Text style={Typography.products}>{orderItems}</Text>
                </View>
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 7,
                        longitudeDelta: 7
                    }}
                    testID="ship-map"
                >
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    infoContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    }
});
