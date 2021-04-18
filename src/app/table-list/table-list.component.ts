import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  displayedColumns: string[] =  ['name','readingtime','unit','bloom','lines','answeringtime','prediction']
  //['Question', 'Reading time (sec)', 'Unit', 'Bloom taxonomy', 'Number of lines', 'Answering time (sec)', 'Prediction']
  importanceColumns: string[] =  ['name', 'bloom','answeringtime','lines','readingtime','unit','prediction']
  //['Question', 'Bloom taxonomy','Answering time (sec)', 'Number of lines','Reading time (sec)','Unit', 'Prediction']
  columnsToDisplay: string[] = this.displayedColumns.slice();
  status: number = 0;

  text: string;
  description = {
    'default': 'Non-specific order for columns',
    'importance': 'Overall columns are reorganized according to the importance to get a suggested question.' // From left to right: '
  }

  //data: Object[] = [{'Question': 'Question 1', 'Reading time (sec)': 67, 'Unit': 'Unit 5', 'Bloom taxonomy': 'Remember', 'Number of lines': '2 lines', 'Answering time (sec)': 20051, 'Prediction': 'Accept'}, {'Question': 'Question 2', 'Reading time (sec)': 65, 'Unit': 'Unit 3', 'Bloom taxonomy': 'Remember', 'Number of lines': '1 line', 'Answering time (sec)': 0, 'Prediction': 'Discard'}, {'Question': 'Question 3', 'Reading time (sec)': 57, 'Unit': 'Unit 1', 'Bloom taxonomy': 'Remember', 'Number of lines': '7 lines', 'Answering time (sec)': 0, 'Prediction': 'Discard'}, {'Question': 'Question 4', 'Reading time (sec)': 40, 'Unit': 'Unit 1', 'Bloom taxonomy': 'Remember', 'Number of lines': '4 lines', 'Answering time (sec)': 0, 'Prediction': 'Accept'}, {'Question': 'Question 5', 'Reading time (sec)': 36, 'Unit': 'Unit 5', 'Bloom taxonomy': 'Remember', 'Number of lines': '2 lines', 'Answering time (sec)': 0, 'Prediction': 'Accept'}, {'Question': 'Question 6', 'Reading time (sec)': 55, 'Unit': 'Unit 1', 'Bloom taxonomy': 'Remember', 'Number of lines': '8 lines', 'Answering time (sec)': 0, 'Prediction': 'Accept'}, {'Question': 'Question 7', 'Reading time (sec)': 38, 'Unit': 'Unit 7', 'Bloom taxonomy': 'Remember', 'Number of lines': '2 lines', 'Answering time (sec)': 0, 'Prediction': 'Accept'}, {'Question': 'Question 8', 'Reading time (sec)': 24, 'Unit': 'Unit 1', 'Bloom taxonomy': 'Understand', 'Number of lines': '8 lines', 'Answering time (sec)': 0, 'Prediction': 'Discard'}, {'Question': 'Question 9', 'Reading time (sec)': 30, 'Unit': 'Unit 1', 'Bloom taxonomy': 'Understand', 'Number of lines': '5 lines', 'Answering time (sec)': 0, 'Prediction': 'Discard'}, {'Question': 'Question 10', 'Reading time (sec)': 25, 'Unit': 'Unit 2', 'Bloom taxonomy': 'Understand', 'Number of lines': '4 lines', 'Answering time (sec)': 0, 'Prediction': 'Discard'}]
  data: QuestionData[] = [{'name': 'Question 1', 'readingtime': 67, 'unit': 'Unit 5', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 20051, 'prediction': 'Accept'}, {'name': 'Question 2', 'readingtime': 65, 'unit': 'Unit 3', 'bloom': 'Remember', 'lines': '1 line', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 3', 'readingtime': 57, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '7 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 4', 'readingtime': 40, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '4 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 5', 'readingtime': 36, 'unit': 'Unit 5', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 6', 'readingtime': 55, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '8 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 7', 'readingtime': 38, 'unit': 'Unit 7', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 8', 'readingtime': 24, 'unit': 'Unit 1', 'bloom': 'Understand', 'lines': '8 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 9', 'readingtime': 30, 'unit': 'Unit 1', 'bloom': 'Understand', 'lines': '5 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 10', 'readingtime': 25, 'unit': 'Unit 2', 'bloom': 'Understand', 'lines': '4 lines', 'answeringtime': 0, 'prediction': 'Discard'}]


  constructor() { 
  }

  ngOnInit() {
    this.text = this.description['default']
  }

  /*objectKeys(obj) {
      return Object.keys(obj);
  }*/

  importance() {
    this.columnsToDisplay = this.importanceColumns.slice();
    this.text = this.description['importance'] + ' High importance: Bloom Taxonomy to low importance: Unit.';
    this.status = 1;
  }

  default() {
    this.columnsToDisplay = this.displayedColumns.slice();
    this.text = this.description['default']
    this.status = 0;
  }

}
