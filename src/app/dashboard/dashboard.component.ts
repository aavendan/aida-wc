import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  features: object[] = [
    { 'id':'0','feature':'Reading time (sec)', 'description':'Average seconds on reading the question\' text', 'mean': '38.57 secs', 'value': '36 secs' , 'effect': 0.006},
    { 'id':'1','feature':'Unit', 'description':'Source from which was generated the question', 'mean': 'Unit 3 (3.88)', 'value': 'Unit 5 (4.00)' , 'effect': 0.046},
    { 'id':'2','feature':'Bloom Taxonomy', 'description':'Levels within the cognitive domain ', 'mean': 'Understand (3.19)', 'value': 'Remember (5.00)' , 'effect': 0.189},
    { 'id':'3','feature':'Number of Lines', 'description':'Lines of text in the question', 'mean': '8 lines (0.79)', 'value': '2 lines (0.00)' , 'effect': 0.0596},
    { 'id':'4','feature':'Answering time (sec)', 'description':'Average seconds on answering the question\' text', 'mean': '1119.867 secs (4.00)', 'value': '0 secs (5.00) ' , 'effect': -0.6959488002136133}
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

  selectedValue: string = "Feature 1";
  selectedDescription: string = this.featureList[0]['description'];

  constructor() { }
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
