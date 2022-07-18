// https://github.com/spotify/web-api-auth-examples/blob/master/client_credentials/app.js

import config from "../config/config.json";

import storage from "./storage";
import {showMessage} from "react-native-flash-message";

const AuthModel = {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        let notExpired = false;
        if (token) {
            const twentyFourHours = 1000 * 60 * 60 * 24;
            notExpired = (new Date().getTime() - token.date) < twentyFourHours;
        }


        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch(`${config.base_url}/auth/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, "errors")) {
            return {
                message: result.errors.title,
                description: result.errors.detail,
                type: "danger"
            }
        }

        await storage.storeToken(result.data.token);

        return {
            message: "Inloggning lyckades",
            description: result.data.message,
            type: "success"
        };
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        const response = await fetch(`${config.base_url}/auth/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });

        return await response.json();
    },
    logout: async function logout() {
        await storage.deleteToken();
    },
    validatePassword: function validatePassword(password: string) {
        if (password === undefined) {
            return false;
        }
        const pattern = /^(?=.*\d)(?=.*[a-z]).{4,}$/;
        return (password.match(pattern));
    },
    validateEmail: function validateEmail(email: string) {
        if (email === undefined) {
            return false;
        }
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (email.match(pattern));
    },
    validateUser: function validateUser(email: string, password: string) {
        if (!this.validateEmail(email)) {
            showMessage({
                message: "Email inte giltig",
                description: "Var vänlig ange en giltig email-address.",
                type: "warning"
            })
            return;
        }

        if (!this.validatePassword(password)) {
            showMessage({
                message: "Lösenordet inte giltigt",
                description: "Lösenordet behöver innehålla minst fyra tecken, en siffra och en bokstav.",
                type: "warning"
            })
            return;
        }

        return true;
    }
};

export default AuthModel;
