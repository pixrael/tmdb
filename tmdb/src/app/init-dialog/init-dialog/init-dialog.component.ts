import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface DialogData {
  configurations: {
    configurations$: Observable<any>;
    caption: string;
    onComplete: any
  };
  genreList: {
    genreList$: Observable<any>;
    caption: string;
    onComplete: any
  }
}


@Component({
  selector: 'app-init-dialog',
  templateUrl: './init-dialog.component.html',
  styleUrls: ['./init-dialog.component.scss']
})
export class InitDialogComponent implements OnInit {
  loading = false;
  caption = '';

  constructor(public dialogRef: MatDialogRef<InitDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.loading = true;
    this.caption = 'Loading ' + this.data.configurations.caption + ' and ' + this.data.genreList.caption;

    forkJoin({
      configurations: this.data.configurations.configurations$.pipe(filter(c => !!c)),
      genreList: this.data.genreList.genreList$.pipe(filter(g => !!g))
    }).subscribe(({ configurations, genreList }) => {

      this.data.configurations.onComplete(configurations);
      this.data.genreList.onComplete(genreList);

      this.caption = 'Loaded ' + this.data.configurations.caption + ' and ' + this.data.genreList.caption;

      setTimeout(() => {
        this.dialogRef.close();
      }, 2000);
    });

  }

}
