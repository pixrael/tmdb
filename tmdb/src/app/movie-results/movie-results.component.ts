import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data/movie-data.service';

import { filter } from 'rxjs/operators';

import * as _ from 'lodash';

export interface ResultElement {
  title: string;
  releaseDate: string;
  poster: string;
  genre: string;
  position: number;
}

const ELEMENT_DATA: ResultElement[] = [
  { releaseDate: '1988-07-21', title: 'Bat*21', poster: '/yIeFT2RqJdXMRIhGLs05xtzBkt9.jpg', genre: '28', position: 1 },

];

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.scss']
})
export class MovieResultsComponent implements OnInit {
  displayedColumns: string[] = ['genre', 'title', 'releaseDate', 'poster'];
  dataSource = ELEMENT_DATA;

  genresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27]; // this should como its own request

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.movieDataService.getMovies$().pipe(filter(movies => !!movies)).subscribe(movies => {

      console.log('results ', movies);


      const groupedMovies = _.groupBy(movies.results, (result) => {

        let resultGenreId = 0;

        _.forEach(this.genresIds, genreId => {
          if (result.genre_ids.some((gId) => gId === genreId)) {
            console.log('return ', genreId);
            resultGenreId = genreId;
          }
        });

        return resultGenreId;

      });

      console.log('groupedMovies ', groupedMovies);
      this.mapGroupedMoviesToTable(groupedMovies);
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

}
