import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router'
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { SelectionsMadeService } from "./selections-made.service";
import { DynamicCanvasComponent } from './dynamic-canvas/dynamic-canvas.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicCanvasComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'firstPage',
        component: FirstPageComponent
      },
      {
        path: 'secondPage',
        component: SecondPageComponent
      },
      {
        path: 'thirdPage',
        component: ThirdPageComponent
      }
    ])
  ],
  providers: [SelectionsMadeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
