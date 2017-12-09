import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router'
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SelectionsMadeService } from "./selections-made.service";
import { DynamicCanvasComponent } from './dynamic-canvas/dynamic-canvas.component';
import { FirstQuestionPageComponent } from './question/first-question-page/first-question-page.component';
import { SecondQuestionPageComponent } from './question/second-question-page/second-question-page.component';
import { ThirdQuestionPageComponent } from './question/third-question-page/third-question-page.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { QuestionComponent } from './question/question.component';
import { ParametersPageComponent } from './parameters-page/parameters-page.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashPageComponent,
    DynamicCanvasComponent,
    QuestionComponent,
    ParametersPageComponent,
    FirstQuestionPageComponent,
    SecondQuestionPageComponent,
    ThirdQuestionPageComponent,
    SummaryPageComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: SplashPageComponent
      },
      {
        path: 'splashPage',
        component: SplashPageComponent
      },
      {
        path: 'parametersPage',
        component: ParametersPageComponent
      },
      {
        path: 'questionPage',
        component: QuestionComponent
      },
      {
        path: 'summaryPage',
        component: SummaryPageComponent
      }
    ])
  ],
  providers: [SelectionsMadeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
