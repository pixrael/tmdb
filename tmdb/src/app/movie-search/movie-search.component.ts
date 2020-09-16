import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

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

    this.keywordSearchControl.valueChanges.pipe(
      debounceTime(200),
      map((value: string) => value.trim()), distinctUntilChanged(), filter((value: string) => value.length > 2))
      .subscribe(change => {
        // Process input to search the keyboard
        console.log('sending change ', change);
      });
  }

  onClearButtonClicked(): void {
    this.keywordSearchControl.setValue('');
  }

}
