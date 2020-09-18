import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data/movie-data.service';

import { filter } from 'rxjs/operators';

import { GenreList, Configurations, Genre, Result } from '../models/models';

export interface MovieElement {
  title: string;
  release_date: string;
  poster_path: string;
}

export interface GroupBy {
  group: string;
  isGroupBy: boolean;
}

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.scss']
})
export class MovieResultsComponent implements OnInit, AfterViewInit {

  dataSource: (MovieElement | GroupBy)[];
  displayedColumns: string[] = ['title', 'releaseDate', 'poster'];
  groupColums: string[] = ['groupHeader'];
  posterPath: string;
  private genresIds: number[];
  private genreList: GenreList;
  private configurations: Configurations;

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {

    this.genreList = this.movieDataService.getGenreList();
    this.configurations = this.movieDataService.getConfigurations();

    const posterBaseUrl = this.configurations.images.base_url;
    const posterMinSize = this.configurations.images.poster_sizes[0];
    this.posterPath = posterBaseUrl + posterMinSize + '/';


    this.movieDataService.getMovies$().pipe(filter(movies => !!movies)).subscribe(movies => {

      const resultsGrouped = this.groupByGenreIds(this.genreList.genres, movies.results);

      this.dataSource = this.mapToTableFormat(this.genreList.genres, resultsGrouped);
    });

  }

  isGroup(index: number, item: GroupBy): boolean {
    return item.isGroupBy;
  }

  ngAfterViewInit(): void { }


  mapGroupedMoviesToTable(groupedMovies): void {
    const mappedMovies = [];
    this.genresIds.forEach(genreId => {
      if (groupedMovies[genreId]) {
        mappedMovies.push(...groupedMovies[genreId]);
      }

    });

  }

  private groupByGenreIds(genres: Genre[], results: Result[]): any {
    const groupedResults: { [key: number]: Result[] } = {};

    results.forEach(result => {

      genres.forEach(genre => {
        if (result.genre_ids.some(genreId => genreId === genre.id)) {
          if (!groupedResults[genre.id]) {
            groupedResults[genre.id] = [];
          }

          groupedResults[genre.id].push({ ...result });
        }
      });

    });

    return groupedResults;
  }

  private mapToTableFormat(genres: Genre[], groupedResults: { [key: number]: Result[] }): (MovieElement | GroupBy)[] {
    const dataSource: (MovieElement | GroupBy)[] = [];

    genres.forEach(genre => {

      if (groupedResults[genre.id]) {
        const foundGenre = genres.find(gen => gen.id === genre.id);
        if (foundGenre) {
          const nameGenre = foundGenre.name;

          dataSource.push({ isGroupBy: true, group: nameGenre });
          dataSource.push(...groupedResults[genre.id]);
        }
      }
    });

    return dataSource;
  }
}
