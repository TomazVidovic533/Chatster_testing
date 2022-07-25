import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, debounceTime, Observable, of, startWith, Subject, switchMap} from "rxjs";
import {SearchService} from "../../services/search.service";
import {DataObjectItem} from "../../models/data-object-item";
import {Condition} from "../../../core/models/condition";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {

  searchForm!: FormGroup;
  queryResults$!: Observable<DataObjectItem[]>;

  @Input() collectionName!: string;
  @Input() condition!: Condition;
  searchInputLabel!: string;

  constructor(private formBuilder: FormBuilder,
              private searchService: SearchService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      queryString: new FormControl('', [Validators.required]),
    });

    this.translateService.get(['search_' + this.collectionName])
      .subscribe(translations => {
        this.searchInputLabel=translations['search_' + this.collectionName];
      });

    // @ts-ignore
    this.queryResults$ = this.searchForm.get('queryString').valueChanges.pipe(
      startWith(''),
      debounceTime(350),
      switchMap(queryString => {
        if (!this.condition) {
          return this.searchService.search(this.collectionName, 'name', queryString)
        }
        return this.searchService.searchWhere(this.collectionName, 'name', queryString, this.condition);
      }));
  }

  ngOnDestroy(){

  }

}


// with button
/*    this.queryResults$ = this.querySubmit$
      .pipe(
        switchMap((event) => {
          const {queryString} = this.searchForm.value;
          if(!this.condition){
            return this.searchService.search(this.collectionName,'name', queryString)
          }
          return this.searchService.searchWhere(this.collectionName,'name', queryString, this.condition);
        }),
      );*/

// with button
/*search(event: Event) {
  // this.querySubmit$..next(event);
}*/
