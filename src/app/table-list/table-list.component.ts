import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import { QuestionnaireService } from '../services/questionnaire.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexPlotOptions,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptionsUnits = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
};

export type ChartOptionsReadingTime = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

export type ChartOptionsShapImportance = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  colors: string[];
  legend: ApexLegend;
};

export interface QuestionData {
  name: string;
  readingtime: number;
  unit: string;
  bloom: string;
  lines: string;
  answeringtime: number;
  prediction: string;
}

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableListComponent implements OnInit {

  @ViewChild(MatPaginator) paginatorPositive: MatPaginator;
  @ViewChild(MatPaginator) paginatorNegative: MatPaginator;
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  @ViewChild("chart") chart1: ChartComponent;
  public chartOptionsUnits: Partial<ChartOptionsUnits>;
  checkedPlotUnit: boolean = false;

  @ViewChild("chart") chart2: ChartComponent;
  public chartOptionsReadingTime: Partial<ChartOptionsReadingTime>;
  checkedPlotRT: boolean = false;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsShapImportance: Partial<ChartOptionsShapImportance>;

  displayedColumns: string[] =  ['select', 'name','readingtime','unit','bloom','lines','answeringtime']
  negativeColumns: string[] =  ['name','readingtime','unit','bloom','lines','answeringtime']
  importanceColumns: string[] =  ['select', 'name', 'bloom','readingtime','answeringtime','lines','unit']
  columnsToDisplay: string[] = this.displayedColumns.slice();
  status: number = 0;

  order: string = 'default';
  text: string;
  description = {
    'default': 'Non-specific order for columns',
    'feature': 'Overall columns are reorganized according to the importance to get a suggested question.' // From left to right: '
  }

  originPositive: QuestionData[]; //= [{'name': 'Question 1', 'readingtime': 67, 'unit': 'Unit 5', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 20051, 'prediction': 'Accept'}, {'name': 'Question 2', 'readingtime': 65, 'unit': 'Unit 3', 'bloom': 'Remember', 'lines': '1 line', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 3', 'readingtime': 57, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '7 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 4', 'readingtime': 40, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '4 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 5', 'readingtime': 36, 'unit': 'Unit 5', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 6', 'readingtime': 55, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '8 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 7', 'readingtime': 38, 'unit': 'Unit 7', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 8', 'readingtime': 24, 'unit': 'Unit 1', 'bloom': 'Understand', 'lines': '8 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 9', 'readingtime': 30, 'unit': 'Unit 1', 'bloom': 'Understand', 'lines': '5 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 10', 'readingtime': 25, 'unit': 'Unit 2', 'bloom': 'Understand', 'lines': '4 lines', 'answeringtime': 0, 'prediction': 'Discard'}]
  originNegative: QuestionData[]; 
  dataSourcePositive: MatTableDataSource<QuestionData>; //= new MatTableDataSource(this.ELEMENT_DATA);
  dataSourceNegative: MatTableDataSource<QuestionData>;

  minValue: number = 0;
  maxValue: number = 100;
  options: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + " secs";
        case LabelType.High:
          return value + " secs";
        default:
          return value + " secs";
      }
    }
  };

  selectedUnit = "All";
  selectedTax = "All";

  selection = new SelectionModel<QuestionData>(true, []);


  constructor(private questionnaireService: QuestionnaireService,public dialog: MatDialog, private router: Router) { 
    this.originPositive = this.questionnaireService.getPositiveQuestions()
    this.dataSourcePositive = new MatTableDataSource(this.originPositive);

    this.originNegative = this.questionnaireService.getNegativeQuestions()
    this.dataSourceNegative = new MatTableDataSource(this.originNegative);

    this.chartOptionsUnits = {
      series: [
        {
          name: "Questions",
          data: [57,77,1,17,24,12,12]
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false
        }
      },
      title: {
        text: "Questions per unit"
      },
      xaxis: {
        categories: ["Unit 1", "Unit 2",  "Unit 3",  "Unit 4",  "Unit 5",  "Unit 6",  "Unit 7"]
      }
    };

    this.chartOptionsReadingTime = {
      series: [
        {
          name: "Questions",
          data: [33, 37, 28, 25, 24, 13, 11,  8,  7,  2]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Questions per Reading time",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['20.0', '25.5', '31.0', '36.5', '42.0', '47.5', '53.0', '58.5',
        '64.0', '69.5', '75.0']
      }
    };

    this.chartOptionsShapImportance = {
      series: [
        {
          name: "importance",
          data: [1.15, 1.02, 0.53, 0.48, 0.45, 0.4, 0.25, 0.2, 0.18]//, 0.11, 0.1, 0.06]
        }
      ],
      title: {
        text: "Feature importance for suggested questions",
        align: "left"
      },
      stroke: {
        curve: "straight", 
        colors: ['#000000'],
        width: 1
      },
      chart: {
        type: "bar",
        height: 450
      },
      colors: ["#662506", "#993404","#cc4c02", "#ec7014","#fe9929", "#fec44f","#fee391", "#fff7bc","#ffffe5"],//, "#FF4560","#008FFB", "#FF4560"],
      plotOptions: {
        bar: {
          distributed: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      legend: {
        show: false
      },  
      dataLabels: {
        enabled: true,
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#000"]
        }
      },
      xaxis: {
        categories: ['Bloom taxonomy',
        'Reading time (sec)',
        'Answering time (sec)',
        'Number of lines',
        'Difficulty',
        'Unit',
        'Sentiment',
        'Times used',
        'Source']
        /*,
        'Type',
        'Components',
        'Language']*/
      }
    };

  }

  ngAfterViewInit() {
    this.dataSourcePositive.paginator = this.paginatorPositive;
    this.dataSourceNegative.paginator = this.paginatorNegative;
  }

  ngOnInit() {
    //this.text = this.description['default']
  }

  /*objectKeys(obj) {
      return Object.keys(obj);
  }*/

  onChange(event) {
    if(event.value == 'feature') {
      this.columnsToDisplay = this.importanceColumns.slice();
      this.text = this.description['feature'];
      this.status = 1;
    } else if(event.value == 'default') {
      this.columnsToDisplay = this.displayedColumns.slice();
      this.text = "";
      this.status = 0;
    }

    if (this.dataSourcePositive.paginator) {
      this.dataSourcePositive.paginator.firstPage();
    }
  }

  /*importance() {
    this.columnsToDisplay = this.importanceColumns.slice();
    this.text = this.description['importance'] + ' High importance: Bloom Taxonomy to low importance: Unit.';
    this.status = 1;
  }

  default() {
    this.columnsToDisplay = this.displayedColumns.slice();
    this.text = this.description['default']
    this.status = 0;
  }*/

  onChangeValues() {
    this.dataSourcePositive.data = this.originPositive.slice();
    
    this.dataSourcePositive.data = this.dataSourcePositive.data.filter(e => this.minValue < e.readingtime && e.readingtime < this.maxValue)
    
    if(this.selectedUnit != "All") {
      this.dataSourcePositive.data = this.dataSourcePositive.data.filter(e => this.selectedUnit == e.unit);
    }

    if(this.selectedTax != "All") {
      this.dataSourcePositive.data = this.dataSourcePositive.data.filter(e => this.selectedTax == e.bloom);
    }
    
  }

  close() {
    this.sidenav.close();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcePositive.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSourcePositive.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: QuestionData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  dashboard() {
    this.router.navigateByUrl('/one-question');
  };

  clearFilters() {
    this.dataSourcePositive.data = this.originPositive.slice();
    this.selectedUnit = "All";
    this.selectedTax = "All";
    this.minValue = 0;
    this.maxValue = 90;
  }

  saveThisQuestion(event, row){
    event.stopPropagation();

    //this.dataSourcePositive.data = this.dataSourcePositive.data.filter(e => row.name != e.name);
    //this.dialog.open(DialogElementsExampleDialog);
  }

  showPlot(event) {
    console.log(this.checkedPlotUnit)
  }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
