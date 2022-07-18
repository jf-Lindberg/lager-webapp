import {render, fireEvent} from '@testing-library/react-native';
import AuthFields from '../components/auth/AuthFields';

let auth = {};
const setAuth = (newAuth) => {
    auth = newAuth;
};

const mockSubmit = jest.fn();
const navigation = () => false;

test('testing authfield for login', async () => {
    const title = 'Logga in';
    const {getAllByText, getByTestId, getByLabelText} = render(<AuthFields
        auth={auth}
        setAuth={setAuth}
        submit={mockSubmit}
        title={title}
        navigation={navigation}
    />);
    const titleElements = getAllByText(title);

    expect(titleElements.length).toBe(2);

    const emailField = getByTestId('email-field');
    const passwordField = getByTestId('password-field');

    expect(emailField).toBeDefined();
    expect(passwordField).toBeDefined();

    const a11yLabel = `${title} genom att trycka`;
    const submitButton = getByLabelText(a11yLabel);

    expect(submitButton).toBeDefined();

    const fakeEmail = 'hej@hej.se';

    fireEvent.changeText(emailField, fakeEmail);
    expect(auth?.email).toEqual(fakeEmail);

    const fakePassword = 'test123';
    fireEvent.changeText(passwordField, fakePassword);
    expect(auth?.password).toEqual(fakePassword);
});
