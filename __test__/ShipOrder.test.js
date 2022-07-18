import {render} from '@testing-library/react-native';
import ShipOrder from '../components/ship/ShipOrder';

let route = {
    params: {
        "order": {
            id: 1,
            name: "Filip Lindberg",
            address: "Kyrkogatan 6A",
            zip: "37132",
            city: "Karlskrona",
            country: "Sweden",
            status: "Packad",
            status_id: "200",
            order_items: [{
                product_id: 1,
                amount: 1,
                name: "Soja",
                article_number: "37712",
                description: "Soja",
                specifiers: "Soja",
                stock: 5,
                price: 100
            }],
        }
    }
};

test('testing shipOrder for shipment info', async () => {

    const {getByText, getAllByText, getByTestId} = render(<ShipOrder
        route={route}
    />);
    const title = 'Skicka order';
    const name = 'Filip Lindberg';
    const address = 'Kyrkogatan 6A';
    const city = 'Karlskrona';
    const amountAndProduct = '1 Soja';

    const titleElements = getAllByText(title);
    expect(titleElements.length).toBe(1);

    const orderName = getByText(name);
    expect(orderName).toBeDefined();

    const orderAddress = getByText(address);
    expect(orderAddress).toBeDefined();

    const orderCity = getByText(city);
    expect(orderCity).toBeDefined();

    const orderProduct = getByText(amountAndProduct);
    expect(orderProduct).toBeDefined();

    const shipMap = getByTestId('ship-map');
    expect(shipMap).toBeDefined();
});
