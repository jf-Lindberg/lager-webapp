import {Button, ScrollView, Text} from 'react-native';
import {useState} from 'react';
import {Invoice} from '../../interfaces/invoice'
import invoices from '../../models/invoices';
import {DateDropDown} from "./DateTimePicker";
import {OrderDropDown} from './OrderDropDown';
import {Base, Form, Typography} from '../../styles/index';

export default function InvoicesForm({navigation}) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function addInvoice() {
        try {
            await invoices.addInvoice(invoice);
            navigation.navigate("List", {reload: true});
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Ny faktura</Text>

            <Text style={Typography.label}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={Typography.label}>Faktureringsdatum</Text>
            <DateDropDown
                style={{...Form.input}}
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Button
                title="Skapa faktura"
                onPress={() => {
                    void addInvoice();
                }}
            />
        </ScrollView>

        )
}
