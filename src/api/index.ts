import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getAuth } from 'firebase/auth';
import app from '../components/utils/firebase/firebaseConfig';

class AxiosService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3001', // Replace with your API base URL
      // Additional default settings can be added here
    });

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );
  }

  private async handleRequest(config: InternalAxiosRequestConfig) {
    // Add auth token to headers
    const auth = getAuth(app);

    if(auth.currentUser)
    {
    const token =auth
    ? await auth.currentUser.getIdToken()
    : null;
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
    return config;
  }

  private handleError(error: any) {
    // Handle errors
    return Promise.reject(error);
  }
 
  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get<T, R>(url, config);
  }

  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post<T, R>(url, data, config);
  }

  public put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.put<T, R>(url, data, config);
  }

  public delete<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.delete<T, R>(url, {data:data});
  }

  // You can also add other methods like delete, patch, etc. here
}

 const axiosService = new AxiosService();
 export {axiosService as axios}
