import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SelectionsMadeService } from "./selections-made.service";
import { HelperService } from "./helper.service";
import { NavigationComponent } from './navigation/navigation.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { QuestionComponent } from './question/question.component';
import { DynamicCanvasComponent } from './question/dynamic-canvas/dynamic-canvas.component';
import { ParametersPageComponent } from './question/parameters-page/parameters-page.component';
import { DoorPositionPageComponent } from './question/door-position-page/door-position-page.component';
import { TubParametersPageComponent } from './question/tub-parameters-page/tub-parameters-page.component';
import { PlaceholdersPageComponent } from './question/placeholders-page/placeholders-page.component';
import { SummaryPageComponent } from './summary-page/summary-page.component';


@NgModule({
  declarations: [
    AppComponent,
    SplashPageComponent,
    DynamicCanvasComponent,
    QuestionComponent,
    ParametersPageComponent,
    PlaceholdersPageComponent,
    SummaryPageComponent,
    NavigationComponent,
    DoorPositionPageComponent,
    TubParametersPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
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
        path: 'doorPositionPage',
        component: DoorPositionPageComponent
      },
      {
        path: 'tubParametersPage',
        component: TubParametersPageComponent
      },
      {
        path: 'placeholdersPage',
        component: PlaceholdersPageComponent
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
  providers: [SelectionsMadeService, HelperService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
