import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import { Dynamic3DComponentComponent } from './dynamic3-d-component/dynamic3-d-component.component';


@NgModule({
  declarations: [
    AppComponent,
    Dynamic3DComponentComponent
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
