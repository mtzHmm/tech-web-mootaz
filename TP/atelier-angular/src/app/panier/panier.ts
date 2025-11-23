import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier {
  articles: string[] = [];
  
  ajouterArticle(nomProduit: string): void {
    this.articles.push(nomProduit);
    console.log(`Article ajouté au panier: ${nomProduit}`);
  }
  
  viderPanier(): void {
    this.articles = [];
  }
}
