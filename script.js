// ==============================
// GESTION DE TÂCHES - JAVASCRIPT
// TP Web - FST Dép Info
// ==============================

// Étape 2 : Variables globales
let taches = []; // Tableau pour stocker les tâches (utilisé dans Étape 7 - boucles)
let compteurId = 0; // Compteur pour les IDs uniques

// Message de bienvenue dans la console (Étape 2)
console.log("🎉 Bienvenue dans le Gestionnaire de Tâches !");
console.log("Application initialisée avec succès.");

// ==============================
// ÉTAPE 8 : CLASSE TACHE (Objets)
// ==============================
class Tache {
    constructor(texte) {
        this.id = ++compteurId;
        this.texte = texte;
        this.terminee = false;
        this.dateCreation = new Date();
    }

    // Méthode pour basculer l'état terminé/non terminé
    marquerTerminee() {
        this.terminee = !this.terminee;
    }

    // Méthode pour obtenir l'affichage formaté
    obtenirAffichage() {
        const statut = this.terminee ? '✅' : '⏳';
        return `${statut} ${this.texte}`;
    }
}

// ==============================
// ÉTAPE 3 : FONCTIONS DE MANIPULATION DOM
// ==============================

// Fonction pour afficher une notification à l'utilisateur
function afficherNotification(message, type = 'success') {
    // Supprimer les notifications existantes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Créer et afficher la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Fonction pour mettre à jour les statistiques
function mettreAJourStatistiques() {
    const total = taches.length;
    const terminees = taches.filter(tache => tache.terminee).length;
    const enCours = total - terminees;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = terminees;
    document.getElementById('pendingTasks').textContent = enCours;
}

// Fonction pour afficher/masquer l'état vide
function gererEtatVide() {
    const emptyState = document.getElementById('emptyState');
    const taskList = document.getElementById('taskList');
    
    if (taches.length === 0) {
        emptyState.classList.remove('hidden');
        taskList.style.display = 'none';
    } else {
        emptyState.classList.add('hidden');
        taskList.style.display = 'block';
    }
}

// Étape 7 : Fonction pour réafficher la liste (avec boucle)
function afficherTaches(tachesAfficher = taches) {
    const listeTaches = document.getElementById('taskList');
    listeTaches.innerHTML = ''; // Vider la liste existante

    // Boucle pour parcourir les tâches
    tachesAfficher.forEach(tache => {
        const elementTache = creerElementTache(tache);
        listeTaches.appendChild(elementTache);
    });

    mettreAJourStatistiques();
    gererEtatVide();
}

// Fonction pour créer un élément HTML de tâche
function creerElementTache(tache) {
    const li = document.createElement('li');
    li.className = `task-item ${tache.terminee ? 'completed' : ''}`;
    li.dataset.id = tache.id;

    li.innerHTML = `
        <span class="task-text">${tache.texte}</span>
        <div class="task-actions">
            <button class="task-btn complete" onclick="basculerTache(${tache.id})">
                ${tache.terminee ? '↩️ Reprendre' : '✅ Terminer'}
            </button>
            <button class="task-btn delete" onclick="supprimerTache(${tache.id})">
                🗑️ Supprimer
            </button>
        </div>
    `;

    return li;
}

// ==============================
// ÉTAPE 6 : FONCTIONS DÉDIÉES
// ==============================

// Fonction pour ajouter une tâche
function ajouterTache() {
    const champSaisie = document.getElementById('taskInput');
    const texteTache = champSaisie.value.trim();

    // Validation de la saisie
    if (texteTache === '') {
        afficherNotification('Veuillez entrer une tâche !', 'error');
        return;
    }

    if (texteTache.length > 100) {
        afficherNotification('La tâche ne peut pas dépasser 100 caractères !', 'error');
        return;
    }

    // Créer et ajouter la nouvelle tâche
    const nouvelleTache = new Tache(texteTache);
    taches.push(nouvelleTache);

    // Vider le champ de saisie
    champSaisie.value = '';

    // Réafficher la liste
    afficherTaches();

    // Sauvegarder dans localStorage (Étape 9)
    sauvegarderTaches();

    // Notification de succès
    afficherNotification('Tâche ajoutée avec succès ! 🎉');

    console.log(`✅ Tâche ajoutée: "${texteTache}"`);
}

// Fonction pour supprimer une tâche
function supprimerTache(id) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
    
    if (confirmation) {
        const index = taches.findIndex(tache => tache.id === id);
        if (index !== -1) {
            const tacheSupprimee = taches[index];
            taches.splice(index, 1);
            afficherTaches();
            sauvegarderTaches();
            afficherNotification('Tâche supprimée ! 🗑️');
            console.log(`🗑️ Tâche supprimée: "${tacheSupprimee.texte}"`);
        }
    }
}

// Fonction pour marquer une tâche comme terminée
function basculerTache(id) {
    const tache = taches.find(t => t.id === id);
    if (tache) {
        tache.marquerTerminee();
        afficherTaches();
        sauvegarderTaches();
        
        const message = tache.terminee ? 
            'Tâche marquée comme terminée ! ✅' : 
            'Tâche remise en cours ! ⏳';
        afficherNotification(message);
        
        console.log(`🔄 Tâche modifiée: "${tache.texte}" - Terminée: ${tache.terminee}`);
    }
}



// ==============================
// ÉTAPE 9 : PERSISTANCE AVEC LOCALSTORAGE
// ==============================

// Fonction pour sauvegarder les tâches
function sauvegarderTaches() {
    try {
        localStorage.setItem('gestionTaches', JSON.stringify(taches));
        localStorage.setItem('compteurId', compteurId.toString());
        console.log('💾 Tâches sauvegardées dans localStorage');
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        afficherNotification('Erreur lors de la sauvegarde !', 'error');
    }
}

// Fonction pour charger les tâches sauvegardées
function chargerTaches() {
    try {
        const tachesSauvegardees = localStorage.getItem('gestionTaches');
        const compteurSauvegarde = localStorage.getItem('compteurId');
        
        if (tachesSauvegardees) {
            const donnees = JSON.parse(tachesSauvegardees);
            // Recréer les objets Tache avec leurs méthodes
            taches = donnees.map(data => {
                const tache = new Tache(data.texte);
                tache.id = data.id;
                tache.terminee = data.terminee;
                tache.dateCreation = new Date(data.dateCreation);
                return tache;
            });
            
            console.log(`📂 ${taches.length} tâche(s) chargée(s) depuis localStorage`);
        }
        
        if (compteurSauvegarde) {
            compteurId = parseInt(compteurSauvegarde);
        }
        
        afficherTaches();
    } catch (error) {
        console.error('Erreur lors du chargement:', error);
        afficherNotification('Erreur lors du chargement des tâches !', 'error');
    }
}

// ==============================
// ÉTAPE 10 : AMÉLIORATIONS LIBRES
// ==============================

// Fonction pour rechercher des tâches
function rechercherTaches() {
    const termeRecherche = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (termeRecherche === '') {
        afficherTaches(); // Afficher toutes les tâches
        return;
    }
    
    const tachesFiltrees = taches.filter(tache => 
        tache.texte.toLowerCase().includes(termeRecherche)
    );
    
    afficherTaches(tachesFiltrees);
    
    const message = tachesFiltrees.length > 0 ? 
        `${tachesFiltrees.length} tâche(s) trouvée(s)` : 
        'Aucune tâche trouvée';
    afficherNotification(message, 'info');
}

// Fonction pour supprimer toutes les tâches
function supprimerToutesTolesTaches() {
    if (taches.length === 0) {
        afficherNotification('Aucune tâche à supprimer !', 'info');
        return;
    }
    
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer toutes les ${taches.length} tâches ?`);
    
    if (confirmation) {
        taches = [];
        compteurId = 0;
        afficherTaches();
        sauvegarderTaches();
        afficherNotification('Toutes les tâches ont été supprimées ! 🧹');
        console.log('🧹 Toutes les tâches supprimées');
    }
}

// Fonction pour supprimer les tâches terminées
function supprimerTachesTerminees() {
    const tachesTerminees = taches.filter(tache => tache.terminee);
    
    if (tachesTerminees.length === 0) {
        afficherNotification('Aucune tâche terminée à supprimer !', 'info');
        return;
    }
    
    const confirmation = confirm(`Supprimer ${tachesTerminees.length} tâche(s) terminée(s) ?`);
    
    if (confirmation) {
        taches = taches.filter(tache => !tache.terminee);
        afficherTaches();
        sauvegarderTaches();
        afficherNotification(`${tachesTerminees.length} tâche(s) terminée(s) supprimée(s) ! ✅`);
        console.log(`✅ ${tachesTerminees.length} tâches terminées supprimées`);
    }
}

// ==============================
// ÉTAPE 4 : GESTION DES ÉVÉNEMENTS
// ==============================

// Fonction d'initialisation au chargement de la page
function initialiser() {
    console.log('🚀 Initialisation de l\'application...');
    
    // Charger les tâches sauvegardées (Étape 9)
    chargerTaches();
    
    // Écouteurs d'événements pour les boutons
    document.getElementById('addBtn').addEventListener('click', ajouterTache);
    document.getElementById('clearAllBtn').addEventListener('click', supprimerToutesTolesTaches);
    document.getElementById('clearCompletedBtn').addEventListener('click', supprimerTachesTerminees);
    
    // Écouteur pour la touche Entrée dans le champ de saisie
    document.getElementById('taskInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            ajouterTache();
        }
    });
    
    // Écouteur pour la recherche en temps réel
    document.getElementById('searchInput').addEventListener('input', rechercherTaches);
    
    // Écouteur pour vider la recherche avec Escape
    document.getElementById('searchInput').addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            this.value = '';
            afficherTaches();
        }
    });
    
    console.log('✅ Application initialisée et prête à l\'utilisation !');
    
    // Message de bienvenue si aucune tâche
    if (taches.length === 0) {
        setTimeout(() => {
            afficherNotification('Bienvenue ! Ajoutez votre première tâche 😊', 'info');
        }, 1000);
    }
}

// ==============================
// FONCTIONS UTILITAIRES BONUS
// ==============================

// Fonction pour exporter les tâches en JSON
function exporterTaches() {
    if (taches.length === 0) {
        afficherNotification('Aucune tâche à exporter !', 'info');
        return;
    }
    
    const donnees = {
        exportDate: new Date().toISOString(),
        totalTasks: taches.length,
        tasks: taches
    };
    
    const contenu = JSON.stringify(donnees, null, 2);
    const blob = new Blob([contenu], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const lien = document.createElement('a');
    lien.href = url;
    lien.download = `taches_${new Date().toISOString().split('T')[0]}.json`;
    lien.click();
    
    URL.revokeObjectURL(url);
    afficherNotification('Tâches exportées ! 📁');
}

// Fonction pour obtenir des statistiques détaillées
function obtenirStatistiques() {
    const stats = {
        total: taches.length,
        terminees: taches.filter(t => t.terminee).length,
        enCours: taches.filter(t => !t.terminee).length,
        ancienneTache: taches.length > 0 ? taches.reduce((a, b) => 
            a.dateCreation < b.dateCreation ? a : b) : null,
        nouvelleTache: taches.length > 0 ? taches.reduce((a, b) => 
            a.dateCreation > b.dateCreation ? a : b) : null
    };
    
    console.table(stats);
    return stats;
}

// ==============================
// INITIALISATION AU CHARGEMENT DE LA PAGE
// ==============================

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', initialiser);

// Sauvegarder avant de quitter la page
window.addEventListener('beforeunload', sauvegarderTaches);

// Gestion des raccourcis clavier
document.addEventListener('keydown', function(event) {
    // Ctrl+N pour nouvelle tâche
    if (event.ctrlKey && event.key === 'n') {
        event.preventDefault();
        document.getElementById('taskInput').focus();
    }
    
    // Ctrl+/ pour recherche
    if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// ==============================
// FONCTIONS DE DEBUG (pour le développement)
// ==============================

// Fonctions disponibles dans la console pour le debug
window.debug = {
    afficherTaches: () => console.table(taches),
    ajouterTacheTest: () => {
        const tache = new Tache(`Tâche test ${Date.now()}`);
        taches.push(tache);
        afficherTaches();
        sauvegarderTaches();
    },
    viderLocalStorage: () => {
        localStorage.removeItem('gestionTaches');
        localStorage.removeItem('compteurId');
        console.log('localStorage vidé');
    },
    statistiques: obtenirStatistiques,
    exporterTaches: exporterTaches
};

console.log('🛠️ Fonctions de debug disponibles dans window.debug');
console.log('📋 Tapez "debug.afficherTaches()" pour voir toutes les tâches');