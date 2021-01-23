import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/search/search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from '../material-module';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { CategoryBoxComponent } from './components/category-box/category-box.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PlaylistBoxComponent } from './components/playlist-box/playlist-box.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { FormatDurationPipe } from './format-duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SearchComponent,
    SearchItemComponent,
    CategoryBoxComponent,
    NavbarComponent,
    PlaylistBoxComponent,
    PlaylistComponent,
    FormatDurationPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
