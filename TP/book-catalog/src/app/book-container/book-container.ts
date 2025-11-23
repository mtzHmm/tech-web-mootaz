import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book, CATEGORIES } from '../models/book.model';
import { BookForm } from '../book-form/book-form';
import { BookList } from '../book-list/book-list';

@Component({
  selector: 'app-book-container',
  imports: [CommonModule, FormsModule, BookForm, BookList],
  templateUrl: './book-container.html',
  styleUrl: './book-container.css'
})
export class BookContainer {
  books: Book[] = [
    {
      id: 1,
      title: 'الطاهر الحداد: حياته وفكره',
      author: 'محمد الهادي الشريف',
      publisherEmail: 'contact@daraltounissia.tn',
      publisherPhone: '71234567',
      releaseDate: '1985-03-15',
      category: 'التاريخ',
      isAvailable: true,
      stock: 5
    },
    {
      id: 2,
      title: 'صراع المدينتين',
      author: 'الطيب صالح',
      publisherEmail: 'info@daralmaarf.tn',
      publisherPhone: '71987654',
      releaseDate: '1990-11-22',
      category: 'الأدب',
      isAvailable: true,
      stock: 3
    },
    {
      id: 3,
      title: 'تاريخ تونس المعاصر',
      author: 'عبد الجليل التميمي',
      publisherEmail: 'history@universitetunisie.edu.tn',
      publisherPhone: '71567890',
      releaseDate: '2003-06-10',
      category: 'التاريخ',
      isAvailable: false,
      stock: 0
    }
  ];
  
  categories = CATEGORIES;
  bookToEdit: Book | null = null;
  searchTerm = '';
  sortBy = 'title';
  
  // Génération automatique d'ID
  private generateId(): number {
    return this.books.length > 0 
      ? Math.max(...this.books.map(b => b.id)) + 1 
      : 1;
  }
  
  // CREATE - Ajouter un nouveau livre
  onAddBook(bookData: Omit<Book, 'id'>): void {
    const newBook: Book = {
      ...bookData,
      id: this.generateId()
    };
    this.books.push(newBook);
  }
  
  // UPDATE - Mettre à jour un livre existant
  onUpdateBook(updatedBook: Book): void {
    const index = this.books.findIndex(b => b.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = { ...updatedBook };
    }
    this.bookToEdit = null; // Revenir en mode ajout
  }
  
  // DELETE - Supprimer un livre
  onDeleteBook(id: number): void {
    this.books = this.books.filter(b => b.id !== id);
  }
  
  // Préparer l'édition d'un livre
  onEditBook(book: Book): void {
    this.bookToEdit = { ...book }; // Cloner pour éviter la modification directe
  }
  
  // Annuler l'édition
  onCancelEdit(): void {
    this.bookToEdit = null;
  }
  
  // Filtrer et trier les livres
  get filteredAndSortedBooks(): Book[] {
    let filtered = this.books;
    
    // Filtrage par terme de recherche
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(book => 
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.category.toLowerCase().includes(term)
      );
    }
    
    // Tri
    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'available':
          return Number(b.isAvailable) - Number(a.isAvailable);
        default:
          return 0;
      }
    });
  }
  
  // Compteur dynamique
  get totalBooks(): number {
    return this.books.length;
  }
  
  get availableBooks(): number {
    return this.books.filter(b => b.isAvailable).length;
  }
}
