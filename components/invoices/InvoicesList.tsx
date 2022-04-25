import {useState, useEffect} from 'react';
import {DataTable} from 'react-native-paper';
import invoices from '../../models/invoices';
import {Invoice} from '../../interfaces/invoice';
import {Button, ScrollView, Text} from "react-native";
import {Base, Typography, Table} from '../../styles/index';
import storage from '../../models/storage';

export default function InvoicesList({route, navigation, setIsLoggedIn}) {
    const {reload} = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Array<Invoice>>([]);

    if (reload) void reloadInvoices();

    async function reloadInvoices() {
        try {
            setAllInvoices(await invoices.getInvoices());
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        void reloadInvoices();

        return setAllInvoices([]);
    }, []);

    async function logOut() {
        await storage.deleteToken();
        setIsLoggedIn(false);
    }

    const invoicesRows =
        allInvoices.map((invoice, index) => {
            return (<DataTable.Row key={index}>
                <DataTable.Cell style={{flex: 1}}>{invoice.name}</DataTable.Cell>
                <DataTable.Cell numeric style={{flex: 2, marginRight: 20}}>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>);
        });


    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>

            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />

            <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut()
                }}
            />

        </ScrollView>
    );
}
