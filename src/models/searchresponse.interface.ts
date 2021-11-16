import type { SearchResultType } from "$models/searchresult.interface";

export interface SearchResponseType {
    page: number,
    results: SearchResultType[],
    total_pages: number,
    total_results: number
}