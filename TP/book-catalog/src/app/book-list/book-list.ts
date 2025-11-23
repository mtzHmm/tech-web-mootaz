import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  @Input() books: Book[] = [];
  
  @Output() bookDeleted = new EventEmitter<number>();
  @Output() bookEdited = new EventEmitter<Book>();
  
  onEdit(book: Book): void {
    this.bookEdited.emit(book);
  }
  
  onDelete(book: Book): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le livre "${book.title}" ?‼️`)) {
      this.bookDeleted.emit(book.id);
    }
  }
  
  getAvailabilityClass(book: Book): string {
    return book.isAvailable ? 'available' : 'unavailable';
  }
  
  getStockStatus(book: Book): string {
    if (!book.isAvailable || book.stock === 0) {
      return 'Rupture de stock';
    } else if (book.stock <= 2) {
      return 'Stock faible';
    } else {
      return 'En stock';
    }
  }
  
  getStockClass(book: Book): string {
    if (!book.isAvailable || book.stock === 0) {
      return 'out-of-stock';
    } else if (book.stock <= 2) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  trackByBookId(index: number, book: Book): number {
    return book.id;
  }
}
