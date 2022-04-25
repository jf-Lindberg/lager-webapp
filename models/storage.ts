import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async (token: string) => {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // saving error
        }
    },
    readToken: async (): Promise<any> => {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    },
    deleteToken: async () => {
        await AsyncStorage.removeItem('@token');
    }
};

export default storage;
