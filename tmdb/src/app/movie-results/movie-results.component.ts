import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data/movie-data.service';

import { filter } from 'rxjs/operators';

import * as _ from 'lodash';

export interface ResultElement {
  title: string;
  releaseDate: string;
  poster: string;
  genreId: number;
  genreIds: number[];
}

const ELEMENT_DATA: ResultElement[] = [
  {
    releaseDate: '1988-07-21',
    title: 'Bat*21', poster: '/yIeFT2RqJdXMRIhGLs05xtzBkt9.jpg', genreId: 8, genreIds: [1, 2]
  },

];

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.scss']
})
export class MovieResultsComponent implements OnInit {
  displayedColumns: string[] = ['genreId', 'title', 'releaseDate', 'poster'];
  dataSource = ELEMENT_DATA;

  genresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27]; // this should como its own request

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.movieDataService.getMovies$().pipe(filter(movies => !!movies)).subscribe(movies => {

      const movs = movies.results.map(movie => {
        return {
          releaseDate: movie.release_date,
          title: movie.title,
          poster: movie.poster_path,
          genreIds: movie.genre_ids,
        };
      });



      this.dataSource = this.groupByGenreIds(this.genresIds, movs);

    });

  }

  mapGroupedMoviesToTable(groupedMovies): void {
    const mappedMovies = [];
    this.genresIds.forEach(genreId => {
      if (groupedMovies[genreId]) {
        mappedMovies.push(...groupedMovies[genreId]);
      }

    });

    this.dataSource = mappedMovies;
  }

  private groupByGenreIds(genres, entries): any {

    const result = {};
    entries.forEach(entry => {

      genres.forEach(genre => {

        if (entry.genreIds.some(genreId => genreId === genre)) {
          if (!result[genre]) {
            result[genre] = [];
          }

          result[genre].push({ genreId: genre, ...entry });
        }
      });

    });


    const dataSource = [];

    genres.forEach(genre => {

      if (result[genre]) {
        dataSource.push(...result[genre]);
      }
    });


    return dataSource;

  }
}
