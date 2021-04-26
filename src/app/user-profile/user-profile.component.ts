import { Component, OnInit, ViewChild } from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  favoriteSeason: string;
  seasons: string[] = ['Remember', 'Understand', 'Apply', 'Analyze'];

  selectedUnit = 'Unit 3';
  selectedTax = 'Remember';
  selectedSubject = 'Physics';
  selectedClass = '345';
  selectedLines = 'Lines 1';

  difficulty: FormControl = new FormControl();
  minValueDifficulty: number = 12;
  maxValueDifficulty: number = 33;
  optionsDifficulty: Options = {
    floor: 0,
    ceil: 100
  };
  
  readingTime: FormControl = new FormControl();
  minValueRT: number = 24;
  maxValueRT: number = 58;
  optionsRT: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + " secs."; //"<b>Min price:</b> $" +
        case LabelType.High:
          return value + " secs.";
        default:
          return value + " secs.";
      }
    }
  };

  answeringTime: FormControl = new FormControl();
  minValueAT: number = 32;
  maxValueAT: number = 62;
  optionsAT: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + " secs."; //"<b>Min price:</b> $" +
        case LabelType.High:
          return value + " secs.";
        default:
          return value + " secs.";
      }
    }
  };
  
  constructor() { }

  ngOnInit() {
  }

  formatLabel(value: number) {
    return value;
  }

  onValueChange() {
    console.log(this.minValueRT)
  }

  onHighValueChange() {
    console.log(this.maxValueRT)
  }

}
