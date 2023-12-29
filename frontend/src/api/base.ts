import axios from 'axios';

const FILE_SYSTEM_API: string = 'https://n4ae4vqh0g.execute-api.us-west-2.amazonaws.com/v0';

export const apiClient = axios.create({
    baseURL: FILE_SYSTEM_API,
    headers: {
        'Content-Type': 'application/json',
    }
})