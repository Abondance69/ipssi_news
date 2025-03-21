

export default class UserServices {

    async login(email, password) {
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            return response.json();
        } catch (error) {
            console.log("Une erreur est survenue", error);
        }
    }

    async register(firstname, lastname, email, password) {
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstname, lastname, email, password }),
            });
            return response.json();
        } catch (error) {
            console.log("Une erreur est survenue", error);
        }
    }
}