import { Component, OnInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data/movie-data.service';

import { filter } from 'rxjs/operators';

import _ from 'lodash';

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
  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    this.movieDataService.getMovies$().pipe(filter(movies => !!movies)).subscribe(movies => {

      console.log('results ', movies);

      const genresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27];

      const groupedMovies = _.groupBy(movies.results, (result) => {

        let resultGenreId = 0;

        _.forEach(genresIds, genreId => {
          if (result.genre_ids.some((gId) => gId === genreId)) {
            console.log('return ', genreId);
            resultGenreId = genreId;
          }
        });

        return resultGenreId;

      });

    });

  }

}
