import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDataService {

  private moviesSource = new BehaviorSubject<any>(null);
  private movies$ = this.moviesSource.asObservable();

  private genreListSource = new BehaviorSubject<any>(null);
  private genreList$ = this.genreListSource.asObservable();


  constructor() { }

  setMovies(movies): void {
    this.moviesSource.next(movies);
  }

  getMovies$(): Observable<any> {
    return this.movies$;
  }

  setGenreList(genreList): void {
    this.genreListSource.next(genreList);
  }

  getGenreList$(): Observable<any> {
    return this.genreList$;
  }

}
