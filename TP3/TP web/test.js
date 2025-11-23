/************************************************
 * EXERCICE 8 – PROMESSE SIMPLE
 ************************************************/

console.log("\n=== EXERCICE 8 – PROMESSE SIMPLE ===");

// Fonction qui retourne une promesse résolue après "ms" millisecondes
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log("Début du téléchargement...");

wait(2000).then(() => {
  console.log("Fin du téléchargement !");
});


/************************************************
 * EXERCICE 9 – FETCH + ASYNC/AWAIT
 ************************************************/

console.log("\n=== EXERCICE 9 – FETCH + ASYNC/AWAIT ===");

async function fetchPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Erreur réseau : " + response.status);
    
    const data = await response.json();
    console.log("Titres des 5 premiers posts :");
    data.slice(0, 5).forEach(post => console.log(`- ${post.title}`));

  } catch (error) {
    console.error("Erreur lors de la récupération des posts :", error.message);
  }
}

fetchPosts();
