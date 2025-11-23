import { Component } from '@angular/core';
import { BookContainer } from './book-container/book-container';

@Component({
  selector: 'app-root',
  imports: [BookContainer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Book Catalog - Angular 20';
}
