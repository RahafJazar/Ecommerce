export interface ApiResponse<T> {
    data: T;
}

export interface PaginationMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    results: number;
    metadata: PaginationMetadata;

}