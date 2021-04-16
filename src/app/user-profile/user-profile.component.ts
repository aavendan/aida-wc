import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  favoriteSeason: string;
  seasons: string[] = ['Remember', 'Understand', 'Apply', 'Analyze'];

  selectedUnit = 'unit1';
  selectedTax = 'bt1'
  
  constructor() { }

  ngOnInit() {
  }

  formatLabel(value: number) {
    return value;
  }

}
