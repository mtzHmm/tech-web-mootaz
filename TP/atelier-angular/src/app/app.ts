import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bienvenue } from './bienvenue/bienvenue';
import { Produit } from './produit/produit';
import { Utilisateur } from './utilisateur/utilisateur';
import { Panier } from './panier/panier';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Bienvenue, Produit, Utilisateur, Panier],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Atelier Angular - Tous les exercices');
  
  // Produits avec noms différents pour l'Activité 7
  produits = [
    { nom: 'iPhone 15' },
    { nom: 'MacBook Pro' },
    { nom: 'iPad Air' }
  ];
  
  // Méthode pour gérer l'événement du panier (Activité 6)
  onProduitAjoute(nomProduit: string): void {
    console.log(`Événement reçu: ${nomProduit} a été ajouté au panier`);
  }
}
