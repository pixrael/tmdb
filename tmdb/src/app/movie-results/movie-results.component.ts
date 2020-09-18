import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data/movie-data.service';

import { filter, flatMap } from 'rxjs/operators';

import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface GroupBy {
  group: string;
  isGroupBy: boolean;
}

const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [];

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.scss']
})
export class MovieResultsComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<PeriodicElement | GroupBy>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  displayedColumns: string[] = ['title', 'releaseDate', 'poster'];

  posterPath = 'https://image.tmdb.org/t/p/w500/';

  private genresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27]; // this should como its own request
  private genreList;
  private configurations;

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {

    this.genreList = this.movieDataService.getGenreList();
    this.configurations = this.movieDataService.getConfigurations();

    const posterBaseUrl = this.configurations.images.base_url;
    const posterMinSize = this.configurations.images.poster_sizes[0];
    this.posterPath = posterBaseUrl + posterMinSize + '/';


    this.movieDataService.getMovies$().pipe(filter(movies => !!movies)).subscribe(movies => {

      const movs = movies.results.map(movie => {
        return {
          releaseDate: movie.release_date,
          title: movie.title,
          poster: movie.poster_path,
          genreIds: movie.genre_ids,
        };
      });

      const groupedData = this.groupByGenreIds(this.genresIds, movs);

      this.dataSource = groupedData;

    });

  }

  isGroup(index, item): boolean {
    return item.isGroupBy;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  mapGroupedMoviesToTable(groupedMovies): void {
    const mappedMovies = [];
    this.genresIds.forEach(genreId => {
      if (groupedMovies[genreId]) {
        mappedMovies.push(...groupedMovies[genreId]);
      }

    });

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
        const nameGenre = this.genreList.genres.find(gen => gen.id === genre).name;

        dataSource.push({ isGroupBy: true, group: nameGenre });
        dataSource.push(...result[genre]);
      }
    });


    return dataSource;

  }
}
