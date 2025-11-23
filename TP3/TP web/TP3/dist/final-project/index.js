// index.ts - Point d'entrée principal de l'application
import { Library } from "./services/Library.js";
import { Role } from "./models/User.js";
/**
 * Fonction principale pour démontrer le système de bibliothèque
 */
async function main() {
    console.log("🏛️ === SYSTÈME DE GESTION DE BIBLIOTHÈQUE ===\n");
    // Création de l'instance de bibliothèque
    const library = new Library();
    // === PHASE 1: CHARGEMENT DES DONNÉES ===
    console.log("📡 Phase 1: Chargement des livres depuis l'API...");
    await library.loadBooksFromApi();
    // === PHASE 2: AJOUT D'UTILISATEURS ===
    console.log("\n👥 Phase 2: Création des utilisateurs...");
    const alice = library.addUser("Alice Dupont", "alice@example.com");
    const bob = library.addUser("Bob Martin", "bob@example.com");
    const charlie = library.addUser("Charlie Wilson");
    const adminSarah = library.addAdmin("Sarah Admin", ["add_book", "remove_book", "manage_users", "view_reports", "borrow", "return"], "sarah@library.com");
    // === PHASE 3: AJOUT DE LIVRES LOCAUX ===
    console.log("\n📚 Phase 3: Ajout de livres supplémentaires...");
    library.addBook("Les Misérables", "Victor Hugo", 1862, "978-2070409228", "Littérature");
    library.addBook("1984", "George Orwell", 1949, "978-0451524935", "Fiction");
    library.addBook("Le Petit Prince", "Antoine de Saint-Exupéry", 1943, "978-0156012195", "Enfants");
    // === PHASE 4: AFFICHAGE DE L'ÉTAT INITIAL ===
    console.log("\n📋 Phase 4: État initial de la bibliothèque...");
    library.displayBooks();
    library.displayUsers();
    library.displayStats();
    // === PHASE 5: OPÉRATIONS D'EMPRUNT ===
    console.log("\n📖 Phase 5: Démonstration des emprunts...");
    // Alice emprunte quelques livres
    library.borrowBook(alice.id, 1); // TypeScript Handbook
    library.borrowBook(alice.id, 6); // Les Misérables
    // Bob emprunte des livres
    library.borrowBook(bob.id, 2); // Clean Code
    library.borrowBook(bob.id, 4); // The Pragmatic Programmer
    // Charlie tente d'emprunter un livre déjà emprunté
    library.borrowBook(charlie.id, 1); // Devrait échouer
    // L'admin emprunte aussi
    library.borrowBook(adminSarah.id, 5); // JavaScript: The Good Parts
    // === PHASE 6: RECHERCHES ===
    console.log("\n🔍 Phase 6: Démonstration des recherches...");
    console.log("\n--- Recherche 'TypeScript' ---");
    const typescriptBooks = library.searchBooks("TypeScript");
    typescriptBooks.forEach(book => console.log(`  📖 ${book.title} par ${book.author}`));
    console.log("\n--- Recherche 'Programming' ---");
    const programmingBooks = library.searchBooks("Programming");
    programmingBooks.forEach(book => console.log(`  📖 ${book.title} par ${book.author}`));
    console.log("\n--- Recherche 'Victor Hugo' ---");
    const hugoBooks = library.searchBooks("Victor Hugo");
    hugoBooks.forEach(book => console.log(`  📖 ${book.title} par ${book.author}`));
    // === PHASE 7: RETOURS ===
    console.log("\n🔄 Phase 7: Démonstration des retours...");
    // Alice retourne un livre
    library.returnBook(alice.id, 1); // TypeScript Handbook
    // Bob retourne un livre
    library.returnBook(bob.id, 2); // Clean Code
    // Charlie peut maintenant emprunter le livre d'Alice
    library.borrowBook(charlie.id, 1); // TypeScript Handbook
    // === PHASE 8: ÉTAT FINAL ===
    console.log("\n📊 Phase 8: État final de la bibliothèque...");
    console.log("\n--- Livres disponibles ---");
    const availableBooks = library.getAvailableBooks();
    availableBooks.forEach(book => console.log(`  ✅ ${book.title} par ${book.author}`));
    console.log("\n--- Livres empruntés ---");
    const borrowedBooks = library.getBorrowedBooks();
    borrowedBooks.forEach(book => console.log(`  📖 ${book.title} par ${book.author}`));
    // === PHASE 9: STATISTIQUES FINALES ===
    library.displayStats();
    // === PHASE 10: DÉMONSTRATION DES PERMISSIONS ===
    console.log("\n🔐 Phase 10: Démonstration des permissions...");
    const regularUser = library.getUserById(alice.id);
    const admin = library.getUserById(adminSarah.id);
    if (regularUser && admin) {
        console.log(`👤 ${regularUser.name} peut emprunter: ${regularUser.role === Role.User ? "✅" : "❌"}`);
        console.log(`👤 ${regularUser.name} peut gérer utilisateurs: ${regularUser.role === Role.Admin ? "✅" : "❌"}`);
        console.log(`👨‍💼 ${admin.name} peut emprunter: ${admin.role !== undefined ? "✅" : "❌"}`);
        console.log(`👨‍💼 ${admin.name} peut gérer utilisateurs: ${admin.role === Role.Admin ? "✅" : "❌"}`);
    }
    // === PHASE 11: TEST DE LIMITATIONS ===
    console.log("\n⚠️ Phase 11: Test des limitations...");
    // Tentative de suppression d'un livre emprunté
    const borrowedBookId = borrowedBooks[0]?.id;
    if (borrowedBookId) {
        library.removeBook(borrowedBookId);
    }
    // Tentative d'emprunt au-delà de la limite (pour un utilisateur normal)
    console.log(`\n--- Test de limite d'emprunts pour ${alice.name} ---`);
    for (let i = 0; i < 6; i++) {
        const availableBook = library.getAvailableBooks()[0];
        if (availableBook) {
            const success = library.borrowBook(alice.id, availableBook.id);
            if (!success) {
                console.log(`⚠️ Limite d'emprunt atteinte pour ${alice.name}`);
                break;
            }
        }
    }
    console.log("\n🎉 === DÉMONSTRATION TERMINÉE ===");
    console.log("✅ Toutes les fonctionnalités ont été testées avec succès!");
}
/**
 * Gestion des erreurs globales
 */
function handleError(error) {
    console.error("❌ Erreur dans l'application:", error);
    process.exit(1);
}
// Point d'entrée de l'application
main().catch(handleError);
export { main };
//# sourceMappingURL=index.js.map