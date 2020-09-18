import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitDialogComponent } from './init-dialog/init-dialog/init-dialog.component';
import { GenreMovieRequestService } from './services/genre-movie/genre-movie-request.service';
import { MovieDataService } from './services/movie-data/movie-data.service';
import { ConfigurationRequestService } from './services/configuration-request/configuration-request.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  initDataLoaded = false;
  constructor(
    public dialog: MatDialog,
    private genreMovieRequestService: GenreMovieRequestService,
    private configurationRequestService: ConfigurationRequestService,
    private movieDataService: MovieDataService

  ) {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(InitDialogComponent, {
      data: {
        configurations: {
          configurations$: this.configurationRequestService.getConfigurations(),
          caption: 'configurations',
          onComplete: (configurations) => {
            this.movieDataService.setConfigurations(configurations);
          }

        },
        genreList: {
          genreList$: this.genreMovieRequestService.searchGenres(),
          caption: 'movie genres',
          onComplete: (genreList) => {
            this.movieDataService.setGenreList(genreList);
            this.initDataLoaded = true;
          }
        }

      },
      disableClose: true
    });
  }
}
