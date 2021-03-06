import {Auth} from '../../interfaces/auth';
import {useState} from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';

export default function Register({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (AuthModel.validateUser(auth.email, auth.password)) {
            await AuthModel.register(auth.email, auth.password);
            navigation.navigate("Login");
        }

    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    )
}
