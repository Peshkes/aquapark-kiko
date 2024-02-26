type RequestOptions = {
    method: string,
    headers: Headers,
    body?: string,
    redirect: RequestRedirect
}

type LoginData = {
    login: string
    password: string
}

export class Server {

    private static serverUrl = 'http://10.0.0.6:8080';

    private static async sendRequest(method: string, endpoint: string, data?: Record<string, any>): Promise<any> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        const requestOptions: RequestOptions = {
            method: method,
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(`${this.serverUrl}${endpoint}`, requestOptions);
        const responseBody = await response.text();
        const result = await JSON.parse(responseBody);

        if (response.ok) {
            return result;
        } else {
            throw new Error(`Fetch ${result.status}:${result.error}`);
        }
    }

    static getTickets = async () => {
        return Server.sendRequest('GET', '/guest/tickets');
    }

    static getSale = async (couponCode: string) => {
        return Server.sendRequest('GET', '/guest/coupons?code=' + couponCode);
    }

    static login = async (loginData: LoginData) => {
        const data = {
            "username": loginData.login,
            "password": loginData.password
        };
        return Server.sendRequest("POST", '/guest/authentication', data);
    }
}