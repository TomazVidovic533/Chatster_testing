import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchService} from "../../services/search.service";
import {Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent implements OnInit {

  searchForm!: FormGroup;
  querySubmit$ = new Subject<Event>;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      queryString: new FormControl(null, [Validators.required]),
    });

  /*  this.querySubmit$
      .pipe(
        switchMap((event) => {
          const {queryString} = this.searchForm.value;
          return this.searchService.search('name', queryString)
        }),
      ).subscribe(response => {
      console.log("search results", response);
    });*/

  }

  search(event: Event) {
    console.log("searching", this.searchForm.value);
    this.querySubmit$.next(event);
  }

}
