import { apiClient } from "./base";
import { FileSystem } from "../models/filesystem";

export async function getAllFileSystems(): Promise<FileSystem[]> {
    const response = await apiClient.get<FileSystem[]>('/file_system');

    return response.data;

}