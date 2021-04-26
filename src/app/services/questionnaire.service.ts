import { Injectable } from '@angular/core';
import * as positives from './positives.json';
import * as negatives from './negatives.json';

export interface QuestionData {
  name: string;
  readingtime: number;
  unit: string;
  bloom: string;
  lines: string;
  answeringtime: number;
  prediction: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  //ELEMENT_DATA: QuestionData[] = [{'name': 'Question 1', 'readingtime': 67, 'unit': 'Unit 5', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 20051, 'prediction': 'Accept'}, {'name': 'Question 2', 'readingtime': 65, 'unit': 'Unit 3', 'bloom': 'Remember', 'lines': '1 line', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 3', 'readingtime': 57, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '7 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 4', 'readingtime': 40, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '4 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 5', 'readingtime': 36, 'unit': 'Unit 5', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 6', 'readingtime': 55, 'unit': 'Unit 1', 'bloom': 'Remember', 'lines': '8 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 7', 'readingtime': 38, 'unit': 'Unit 7', 'bloom': 'Remember', 'lines': '2 lines', 'answeringtime': 0, 'prediction': 'Accept'}, {'name': 'Question 8', 'readingtime': 24, 'unit': 'Unit 1', 'bloom': 'Understand', 'lines': '8 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 9', 'readingtime': 30, 'unit': 'Unit 1', 'bloom': 'Understand', 'lines': '5 lines', 'answeringtime': 0, 'prediction': 'Discard'}, {'name': 'Question 10', 'readingtime': 25, 'unit': 'Unit 2', 'bloom': 'Understand', 'lines': '4 lines', 'answeringtime': 0, 'prediction': 'Discard'}]
  //products: any = (data as any).default;
  positivesQuestions:  any[] = (positives as any).default;
  negativesQuestions:  any[] = (negatives as any).default;

  constructor() { 
  }

  ngOnInit(){
  }

  getPositiveQuestions(): QuestionData[] {
    return this.positivesQuestions;
  }

  getNegativeQuestions(): QuestionData[] {
    return this.negativesQuestions;
  }
}
