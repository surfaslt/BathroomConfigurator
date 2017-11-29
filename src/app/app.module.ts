import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import { DynamicCanvasComponent } from './dynamic-canvas/dynamic-canvas.component';


@NgModule({
  declarations: [
    AppComponent,
    DynamicCanvasComponent
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
