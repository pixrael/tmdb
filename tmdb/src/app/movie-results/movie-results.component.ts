import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MovieDataService } from '../services/movie-data/movie-data.service';

import { filter } from 'rxjs/operators';

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

const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [
  { isGroupBy: true, group: 'Group 1' },
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { isGroupBy: true, group: 'Group 2' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { isGroupBy: true, group: 'Group 3' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.scss']
})
export class MovieResultsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement | GroupBy>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;



  // displayedColumns: string[] = ['genreId', 'title', 'releaseDate', 'poster'];


  genresIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27]; // this should como its own request 

  constructor(private movieDataService: MovieDataService) { }

  ngOnInit(): void {
    /* this.movieDataService.getMovies$().pipe(filter(movies => !!movies)).subscribe(movies => {

      const movs = movies.results.map(movie => {
        return {
          releaseDate: movie.release_date,
          title: movie.title,
          poster: movie.poster_path,
          genreIds: movie.genre_ids,
        };
      });

      this.dataSource = this.groupByGenreIds(this.genresIds, movs);

    }); */

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

    // this.dataSource = mappedMovies;
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
