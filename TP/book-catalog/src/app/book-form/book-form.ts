import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnChanges {
  @Input() categories: string[] = [];
  @Input() bookToEdit: Book | null = null;
  
  @Output() bookAdded = new EventEmitter<Omit<Book, 'id'>>();
  @Output() bookUpdated = new EventEmitter<Book>();
  @Output() editCancelled = new EventEmitter<void>();
  
  // Modèle de formulaire
  formData = {
    title: '',
    author: '',
    publisherEmail: '',
    publisherPhone: '',
    releaseDate: '',
    category: '',
    isAvailable: true,
    stock: 0
  };
  
  // Variables de validation
  showErrors = false;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookToEdit']) {
      if (this.bookToEdit) {
        // Mode édition - remplir le formulaire
        this.formData = {
          title: this.bookToEdit.title,
          author: this.bookToEdit.author,
          publisherEmail: this.bookToEdit.publisherEmail,
          publisherPhone: this.bookToEdit.publisherPhone,
          releaseDate: this.bookToEdit.releaseDate,
          category: this.bookToEdit.category,
          isAvailable: this.bookToEdit.isAvailable,
          stock: this.bookToEdit.stock
        };
      } else {
        // Mode ajout - réinitialiser le formulaire
        this.resetForm();
      }
    }
  }
  
  onSubmit(form: any): void {
    this.showErrors = true;
    
    if (form.valid && this.isFormValid()) {
      if (this.bookToEdit) {
        // Mode édition
        const updatedBook: Book = {
          id: this.bookToEdit.id,
          ...this.formData
        };
        this.bookUpdated.emit(updatedBook);
      } else {
        // Mode ajout
        this.bookAdded.emit({ ...this.formData });
      }
      
      this.resetForm();
      this.showErrors = false;
      form.resetForm();
    }
  }
  
  onCancel(): void {
    this.resetForm();
    this.showErrors = false;
    this.editCancelled.emit();
  }
  
  private resetForm(): void {
    this.formData = {
      title: '',
      author: '',
      publisherEmail: '',
      publisherPhone: '',
      releaseDate: '',
      category: this.categories.length > 0 ? this.categories[0] : '',
      isAvailable: true,
      stock: 0
    };
  }
  
  private isFormValid(): boolean {
    return !!
      (this.formData.title.trim() &&
      this.formData.author.trim() &&
      this.formData.publisherEmail.trim() &&
      this.formData.publisherPhone.trim() &&
      this.formData.releaseDate &&
      this.formData.category &&
      this.formData.stock >= 0);
  }
  
  // Validation pour l'email
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.formData.publisherEmail);
  }
  
  // Validation pour le téléphone
  isPhoneValid(): boolean {
    const phoneRegex = /^\d{8}$/; // 8 chiffres exact
    return phoneRegex.test(this.formData.publisherPhone);
  }
  
  // Validation pour la date (ne peut pas être dans le futur)
  isDateValid(): boolean {
    if (!this.formData.releaseDate) return false;
    const selectedDate = new Date(this.formData.releaseDate);
    const today = new Date();
    return selectedDate <= today;
  }
  
  get isEditing(): boolean {
    return !!this.bookToEdit;
  }
  
  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
