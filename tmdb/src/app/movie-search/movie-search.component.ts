import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  keywordSearchControl = new FormControl('');

  reactiveForm = new FormGroup({
    keywordSearch: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
    this.keywordSearchControl.valueChanges.subscribe(change => {
      // Process input to search the keyboard
    });
  }

  onClearButtonClicked(): void {
    this.keywordSearchControl.setValue('');
  }

}
