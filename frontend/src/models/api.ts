import { AxiosError } from 'axios';

export interface ApiResponse<T> {
    data: T | undefined
    isLoading: boolean
    isError: boolean
    error: AxiosError<string> | null;
};