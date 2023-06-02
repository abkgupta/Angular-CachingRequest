import { Component, OnInit } from '@angular/core';
import { ICountryState } from '../models/country-state.model';
import { CountryStateService } from '../services/country-state.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-country-state',
  templateUrl: './country-state.component.html',
  styleUrls: ['./country-state.component.scss']
})
export class CountryStateComponent implements OnInit {

  // store state map
  stateMap = new Map<string, ICountryState[]>();

  country!: string
  countries: ICountryState[] = [];
  states: ICountryState[] = [];

  constructor(private service: CountryStateService) { }

  ngOnInit(): void {
    // load all countries
    this.service.countries().subscribe(results => {
      this.countries = results;
    });
  }

  handleOnCountryChanged() {
   
      if (this.stateMap.has(this.country)  ||  localStorage.getItem(this.country)) {
        // get teh result from the map
  
        this.states = JSON.parse(localStorage.getItem(this.country) || '')
        // this.states = this.stateMap.get(this.country) as ICountryState[];
      }
      else {
        
        // country not exist
        // call the api
        this.service.states(this.country).subscribe(results => {
          // set the map
        
  
          localStorage.setItem(this.country,JSON.stringify(results))
          // this.stateMap.set(this.country, results);
          // set the results info states
          this.states = results;
        });
      }
  }

  

}
