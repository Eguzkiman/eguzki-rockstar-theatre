export interface MovieDiscoverResults {
    page: number;
    results: MovieData[];
    total_pages: number;
    total_results: number;
}

export interface MovieData {
    adult: boolean
    backdrop_path: string
    genre_ids: number[] // TODO: Add genre enum if needed
    id: number
    original_language: string; // TODO: Add language enum if needed
    original_title: string
    overview: string
    popularity: number
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}