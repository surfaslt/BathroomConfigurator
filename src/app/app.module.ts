import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import {AppComponent} from './app.component';
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
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
