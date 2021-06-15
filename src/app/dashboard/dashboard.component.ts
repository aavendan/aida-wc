import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  ApexMarkers,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexAnnotations,
  ApexGrid
} from "ng-apexcharts";

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

export type chartOptionsLines = {
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

export type ChartOptionsReadingTime = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  markers: ApexMarkers;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  annotations: ApexAnnotations;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  columnsToDisplay = ['feature', 'description'];
  columnsToDisplayComparison = ['feature','mine', 'question'];

  features: object[] = [
    { 'id':'4','feature':'Answering time (sec)', 'description':'Average seconds on answering the question', 'mean': '1119.867 secs (4.00)', 'value': '0 secs (5.00) ' , 'effect': -0.6959488002136133},
    { 'id':'2','feature':'Bloom Taxonomy', 'description':'Levels within the cognitive domain ', 'mean': 'Understand (3.19)', 'value': 'Remember (5.00)' , 'effect': 0.189},
    { 'id':'1','feature':'Unit', 'description':'Source from which was generated the question', 'mean': 'Unit 3 (3.88)', 'value': 'Unit 5 (4.00)' , 'effect': 0.046},
    { 'id':'3','feature':'Number of Lines', 'description':'Lines of text in the question', 'mean': '8 lines (0.79)', 'value': '2 lines (0.00)' , 'effect': 0.0596},
    { 'id':'0','feature':'Reading time (sec)', 'description':'Average seconds on reading the question', 'mean': '38.57 secs', 'value': '36 secs' , 'effect': 0.006},
    { 'id':'10','feature':'Difficulty', 'description':'Hardness to accomplish this question', 'mean': '40.46', 'value': '60' , 'effect': 0.084}
  ];

  featureList: object[] = [
  {'name':'Feature 1','description':'The Feature 1 value of this question is 0.15038 which is lower than average value 3.61. It pushes the prediction to the right.'},
  {'name':'Feature 2','description':'The Feature 2 value of this question is 0.0 which is lower than average value 11.36. So it pushes the prediction to the left.'},
  {'name':'Feature 3','description':'The Feature 3 value of this question is 25.65 which is higher than average value 11.14. So it pushes the prediction to the left.'},
  {'name':'Feature 4','description':'The Feature 4 value of this question is 0.0 which is lower than average value 0.07. So it pushes the prediction to the left.'},
  {'name':'Feature 5','description':'The Feature 5 value of this question is 0.581 which is higher than average value 0.55. It pushes the prediction to the right.'},
  {'name':'Feature 6','description':'The Feature 6 value of this question is 5.856 which is lower than average value 6.28. So it pushes the prediction to the left.'},
  {'name':'Feature 7','description':'The Feature 7 value of this question is 97.0 which is higher than average value 68.57. So it pushes the prediction to the left.'},
  {'name':'Feature 8','description':'The Feature 8 value of this question is 1.9444 which is lower than average value 3.80. It pushes the prediction to the right.'},
  {'name':'Feature 9','description':'The Feature 9 value of this question is 2.0 which is lower than average value 9.55. So it pushes the prediction to the left.'},
  {'name':'Feature 10','description':'The Feature 10 value of this question is 188.0 which is lower than average value 408.24. It pushes the prediction to the right.'},
  {'name':'Feature 11','description':'The Feature 11 value of this question is 19.1 which is higher than average value 18.46. It pushes the prediction to the right.'},
  {'name':'Feature 12','description':'The Feature 12 value of this question is 370.31 which is higher than average value 356.67. So it pushes the prediction to the left.'},
  {'name':'Feature 13','description':'The Feature 13 value of this question is 25.41 which is higher than average value 12.65. So it pushes the prediction to the left.'}];


  featuresSimilarities: object[] = [
    {"id":1, "feature":"Bloom Taxonomy", "mine":"Remember", "question":"Remember", "class1":  "equal", "class2":  "equal"},
    {"id":2, "feature":"Reading time", "mine": "24 to 58 of 100", "question":"36 of 100", "class1":  "equal", "class2":  "equal"},
    {"id":3, "feature":"Unit", "mine":"Unit 1", "question":"Unit 1","class1":  "equal", "class2":  "equal"},
    {"id":4, "feature":"Answering Time", "mine":"32 to 45 of 100", "question":"62 of 100", "class1":  "equal", "class2":"different"},
    {"id":5, "feature":"Number of lines", "mine":"1 line", "question":"2 lines", "class1":  "equal", "class2":"different"},
    {"id":6, "feature":"Difficulty", "mine":"12 to 33 of 100", "question":"50 of 100", "class1":  "equal", "class2":"different"}
  ]

  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsBloomTaxonomy: Partial<ChartOptionsShapImportance>;

  @ViewChild("chart") chart2: ChartComponent;
  public chartOptionsLines: Partial<chartOptionsLines>;

  @ViewChild("chart") chart3: ChartComponent;
  public chartOptionsReadingTime: Partial<ChartOptionsReadingTime>;

  selectedValue: string = "Feature 1";
  selectedDescription: string = this.featureList[0]['description'];

  constructor() { 
    this.chartOptionsBloomTaxonomy = {
      series: [
        {
          name: "count",
          data: [178,14,7,1]
        }
      ],
      title: {
        text: "Bloom Taxonomy",
        align: "center"
      },
      stroke: {
        curve: "straight", 
        colors: ['#000000'],
        width: 1
      },
      chart: {
        type: "bar",
        height: 450,
        toolbar: {
          show: false
        },
      },
      colors: ["#cffcd0", "#ffffff","#ffffff", "#ffffff"],
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
        categories: ['Remember',
        'Understand',
        'Apply',
        'Analyze']
      }
    };

    this.chartOptionsLines = {
      series: [
        {
          name: "count",
          data: [26, 52, 62, 10, 35, 1, 5, 9]
        }
      ],
      title: {
        text: "Number of lines",
        align: "center"
      },
      stroke: {
        curve: "straight", 
        colors: ['#000000'],
        width: 1
      },
      chart: {
        type: "bar",
        height: 450,
        toolbar: {
          show: false
        },
      },
      colors: ["#cffcd0", "#ffb5b5","#ffffff", "#ffffff","#ffffff","#ffffff", "#ffffff", "#ffffff"],
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
        categories: ['1 line',
        '2 lines',
        '3 lines',
        '4 lines',
        '5 lines',
        '6 lines',
        '7 lines',
        '8 lines']
      }
    };

    this.chartOptionsReadingTime = {
      series: [
        {
          name: "Reading time (sec)",
          data: [ 8, 23, 41, 31, 48, 25, 17,  4,  2,  1]
        }
      ],
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Reading time",
        align: "center"
      },
      xaxis: {
        categories: ['24.0', '29.5', '35.0', '40.5', '46.0', '51.5', '57.0', '62.5', '68.0', '73.5', '79.0'],
      },
      annotations: {
        xaxis: [
          {
            x: 0.0, 
            x2: 400.0,
            fillColor: '#B3F7CA',
            label: {
              text: 'My Settings'
            }
          },
          {
            x: 140.0, 
            x2: 145.0,
            strokeDashArray: 2,
            fillColor: '#5af48d',
            label: {
              text: "Reading time' Question"
            }
          }
        ]
      },
      markers: {
        hover: {
          sizeOffset: 4
        }
      }
    };

    /*stroke: {
        curve: "stepline"
      },*/

   

  }


  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() { }

  select(value: string) {
    this.selectedDescription = value;
  }

  old() {
    
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
            [12, 17, 7, 17, 23, 18, 38]
        ]
    };

   const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
        ]
    };

   const optionsCompletedTasksChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}
