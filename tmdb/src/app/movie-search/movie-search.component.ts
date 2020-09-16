import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, map, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { SearchKeywordMovieRequestService } from '../services/search-keyword-movie/search-keyword-movie-request.service';

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

  constructor(private searchKeywordMovieRequestService: SearchKeywordMovieRequestService) { }

  ngOnInit(): void {

    this.keywordSearchControl.valueChanges.pipe(
      debounceTime(200),
      map((value: string) => value.trim()),
      distinctUntilChanged(),
      filter((value: string) => value.length > 2),
      switchMap((keyword: string) =>
        this.searchKeywordMovieRequestService.searchKeyword(keyword)
      ))
      .subscribe((results: string) => {
        console.log('results:', results);
      });
  }

  onClearButtonClicked(): void {
    this.keywordSearchControl.setValue('');
  }

}
