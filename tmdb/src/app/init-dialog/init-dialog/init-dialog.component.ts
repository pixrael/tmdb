import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface DialogData {
  genreList: {
    genreList$: Observable<any>,
    caption: string,
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
    this.caption = 'Loading ' + this.data.genreList.caption;
    setTimeout(() => {
      this.data.genreList.genreList$.pipe(filter(g => !!g)).subscribe(g => {
        this.loading = false;
        this.caption = 'Loaded ' + this.data.genreList.caption;
        this.data.genreList.onComplete(g);

        setTimeout(() => {
          this.dialogRef.close();
        }, 2000);
      });

    }, 2000);


  }

}
