import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SentimentalAnalysisPage } from './sentimental-analysis';

@NgModule({
  declarations: [
    SentimentalAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(SentimentalAnalysisPage),
  ],
  exports: [
    SentimentalAnalysisPage
  ]
})
export class SentimentalAnalysisPageModule {}
