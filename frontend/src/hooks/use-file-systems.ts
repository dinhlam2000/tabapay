import { getAllFileSystems } from "../api/file-systems-api";
import { ApiResponse } from "../models/api";
import { FileSystem } from "../models/filesystem";
import {AxiosError} from 'axios';

import {
  useQuery,
} from "@tanstack/react-query";

export function useFileSystems(): ApiResponse<FileSystem[]> {
    const {isLoading, isError, data, error} = useQuery<FileSystem[], AxiosError<string> | null>({
        queryKey: ['fileSystems'],
        queryFn: getAllFileSystems
    })
    return {isLoading, isError, data, error};
}