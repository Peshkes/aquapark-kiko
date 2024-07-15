import {CreateOrderRequest, SaleRequest} from "core/redux/types";
import {setAuthStatus} from "core/redux/auth/authSlice";
import {store} from "core/redux/store";
import {axiosInstance} from "core/api/axios";
import {AxiosResponse} from "axios";

export class Server {
    public static async login(): Promise<void> {
        const data = {
            username: process.env.REACT_APP_API_LOGIN,
            password: process.env.REACT_APP_API_PASSWORD,
        };

        try {
            const response = await axiosInstance.post('/guest/authentication', data);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            axiosInstance.defaults.headers.common['Refresh-Token'] = response.data.refreshToken;
            store.dispatch(setAuthStatus(true));
        } catch (error: any) {
            store.dispatch(setAuthStatus(false));
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    public static async getToken(): Promise<void> {
        try {
            const response = await axiosInstance.get('/guest/csrf-token');
            axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
        } catch (error: any) {
            throw new Error(`Failed to retrieve token: ${error.message}`);
        }
    }

    public static async getSale(saleRequest: SaleRequest): Promise<AxiosResponse> {
        return await axiosInstance.get(`/site/coupon?code=${saleRequest.couponCode}&institution=${saleRequest.institutionId}`);
    }

    public static async getTicketsByInstitution(institution: string): Promise<AxiosResponse> {
        return await axiosInstance.get(`/site/tickets?institution=${institution}`);
    }

    public static async getInstitutions(): Promise<AxiosResponse> {
        return await axiosInstance.get('/site/institutions');
    }

    public static async createNewOrder(request: CreateOrderRequest): Promise<AxiosResponse> {
        const data = {
            tickets: request.tickets,
            sum: request.sum,
            name: request.name,
            email: request.email
        }
        return await axiosInstance.post('/site/new-order', data);
    }

    public static async getDebugAuthInfo(): Promise<any> {
        return await axiosInstance.get('/debug/auth');
    }
}
