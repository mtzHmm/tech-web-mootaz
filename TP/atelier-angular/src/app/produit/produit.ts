import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-produit',
  imports: [CurrencyPipe],
  templateUrl: './produit.html',
  styleUrl: './produit.css',
})
export class Produit {
  // Activité 2: Property Binding
  imageUrl: string = 'https://via.placeholder.com/200x150/007bff/white?text=Produit';
  
  // Activité 5: Binding des Attributs et des Styles
  enStock: boolean = true;
  
  // Activité 7: @Input pour recevoir des données
  @Input() nomProduit: string = 'Produit par défaut';
  
  // Activité 8: Pipes - prix numérique
  prix: number = 29.99;
  
  // Activité 6: @Output pour émettre des événements
  @Output() ajouterAuPanier = new EventEmitter<string>();
  
  // Activité 3: Event Binding - méthode pour l'alerte
  afficherAlerte(): void {
    alert('Produit ajouté au panier');
    // Émettre l'événement pour le composant parent
    this.ajouterAuPanier.emit(this.nomProduit);
  }
  
  // Activité 5: Méthode pour basculer le stock
  basculerStock(): void {
    this.enStock = !this.enStock;
  }
}
