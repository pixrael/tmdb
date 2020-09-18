export interface GenreList {
   genres: Genre[];
}

export interface Genre {
   id: number; name: string;
}

export interface Configurations {
   images: {
      base_url: string;
      secure_base_url: string;
      backdrop_sizes: string[];
      logo_sizes: string[];
      poster_sizes: string[];
      profile_sizes: string[];
      still_sizes: string[];
   };
   change_keys: string[];
}

export interface ResultData {
   page: number;
   total_results: number;
   total_pages: number;
   results: Result[];
}

export interface Result {
   popularity: number;
   vote_count: number;
   video: boolean;
   poster_path: string;
   id: number;
   adult: boolean;
   backdrop_path: string;
   original_languagestring: string;
   original_title: string;
   genre_ids: number[];
   title: string;
   vote_average: number;
   overview: string;
   release_date: string
}