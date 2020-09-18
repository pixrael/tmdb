import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultData, GenreList, Configurations } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  private moviesSource = new BehaviorSubject<ResultData>(null);
  private movies$ = this.moviesSource.asObservable();

  private genreList: GenreList;
  private configurations: Configurations;


  constructor() { }

  setMovies(movies: ResultData): void {
    this.moviesSource.next(movies);
  }

  getMovies$(): Observable<ResultData> {
    return this.movies$;
  }

  setGenreList(genreList: GenreList): void {
    this.genreList = genreList;
  }

  getGenreList(): GenreList {
    return this.genreList;
  }

  setConfigurations(configurations: Configurations): void {
    this.configurations = configurations;
  }

  getConfigurations(): Configurations {
    return this.configurations;
  }

}
