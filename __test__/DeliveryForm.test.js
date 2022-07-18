import {fireEvent, render} from '@testing-library/react-native';
import DeliveryForm from '../components/deliveries/DeliveryForm';

let navigation = () => false;
let setProducts = () => false;

jest.mock("../components/deliveries/ProductDropDown", () => "ProductDropDown");
jest.mock("../components/deliveries/DateTimePicker", () => "DateTimePicker");


test('testing DeliveryForm for creating a delivery', async () => {

    const {getByText, getAllByText, getByTestId} = render(<DeliveryForm
        navigation={navigation()}
        setProducts={setProducts()}
    />);
    const title = 'Ny inleverans';

    const titleElements = getAllByText(title);
    expect(titleElements.length).toBe(1);

    const productDropDown = getByTestId('delivery-product-dropdown');
    expect(productDropDown).toBeDefined();

    const amount = getByTestId('delivery-amount');
    expect(amount).toBeDefined();

    const dateDropDown = getByTestId('delivery-date-dropdown');
    expect(dateDropDown).toBeDefined();

    const comment = getByTestId('delivery-comment');
    expect(comment).toBeDefined();

    const button = getByTestId('delivery-button');
    expect(button).toBeDefined();
});
