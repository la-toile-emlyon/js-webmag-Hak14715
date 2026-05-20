
function getData() {
  fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      /// EXAM: COMPLÉTEZ LE CODE ICI !
      console.log(data);
      

      // TODO 1: REMPLIR LE HEADER

      let h1 = document.getElementById(`nom-journal`);
      let p = document.getElementById(`phrase-accroche`)

      h1.textContent = data.journal.nomJournal;
      p.textContent = data.journal.phraseAccroche;

      
      // TODO 2: REMPLIR LA NAVIGATION

      let navBar = document.getElementById(`themes-nav`)

      let carte = `
            <button class="nav-theme-btn">Tous</button>
            <button class="nav-theme-btn">Articles</button>
            <button class="nav-theme-btn">Thèmes</button>
            <button class="nav-theme-btn">Auteurs</button>
      
      `
       navBar.insertAdjacentHTML(`beforeend`, carte);
          
      

      // TODO 3: REMPLIR L'ARTICLE PRINCIPAL

      function remplirArticlePrincipal(data) {

      let articlePrincipal = document.getElementById(`article-principal`);

      let titre = data.journal.articlePrincipal.titre;
      let date = data.journal.articlePrincipal.date;   
      let description = data.journal.articlePrincipal.description;   
      let image = data.journal.articlePrincipal.image; 
      let theme = data.journal.articlePrincipal.theme;
     

      let card = `
            <img id="hero-image" src="${image}" alt="${titre}">
    <div class="hero-info">
      <span class="theme-badge">${theme}</span>
      <h2 id="hero-titre">${titre}</h2>
      <p id="hero-description">${description}</p>
      <p id="hero-auteur">Publié le <span class="date">${date}</span></p>
    </div>
      `
      articlePrincipal.insertAdjacentHTML(`afterend`, card);
      }
    remplirArticlePrincipal(data)


    
  
      
// intégration de l'api Fait avec Gemini 
async function injecterPersonnageDansLeSite(id) {
    const url = `https://dragonball-api.com/api/characters/${id}`;

    try {
        // 1. Récupération des données de l'API
        const reponse = await fetch(url);
        if (!reponse.ok) throw new Error("Personnage introuvable");
        const personnage = await reponse.json();

        // 2. Création de l'élément conteneur (la carte du personnage)
        const carte = document.createElement('div');
        
        // Ajout de styles CSS directement en JS pour que ce soit joli
        carte.style.border = "2px solid #ff851b"; // Orange Dragon Ball
        carte.style.borderRadius = "12px";
        carte.style.padding = "20px";
        carte.style.maxWidth = "400px";
        carte.style.margin = "20px auto";
        carte.style.fontFamily = "Arial, sans-serif";
        carte.style.backgroundColor = "#fff";
        carte.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        carte.style.textAlign = "center";

        // 3. Construction du contenu HTML à l'intérieur de cette carte
        // On génère la liste des transformations si le personnage en a
        let transformationsHTML = "";
        if (personnage.transformations && personnage.transformations.length > 0) {
            transformationsHTML = `
                <h3 style="color: #ff851b; margin-top: 15px;">Transformations :</h3>
                <ul style="list-style-type: none; padding: 0;">
                    ${personnage.transformations.map(t => `<li style="margin: 5px 0;"><strong>${t.name}</strong> (Ki: ${t.ki})</li>`).join('')}
                </ul>
            `;
        }

        // On remplit la carte avec le nom, la race, l'image, la description et les transformations
        carte.innerHTML = `
            <h1 style="color: #333; margin-bottom: 5px;">${personnage.name}</h1>
            <p style="color: #777; font-style: italic; margin-top: 0;">Race: ${personnage.race} - Genre: ${personnage.gender}</p>
            <img src="${personnage.image}" alt="${personnage.name}" style="max-height: 250px; object-fit: contain; margin: 15px 0;">
            <p style="text-align: justify; color: #555; line-height: 1.4;">${personnage.description}</p>
            ${transformationsHTML}
        `;

        // 4. Injection de la carte dans la page web
        // document.body cible automatiquement la page entière, pas besoin d'ID spécifique dans le HTML !
        document.body.appendChild(carte);

    } catch (erreur) {
        console.error("Erreur lors de l'injection :", erreur);
        
        // Optionnel : Afficher un message d'erreur visuel sur le site
        const messageErreur = document.createElement('p');
        messageErreur.textContent = "Impossible de charger le personnage.";
        messageErreur.style.color = "red";
        messageErreur.style.textAlign = "center";
        document.body.appendChild(messageErreur);
    }
}

// Lancement automatique dès que la page a fini de charger
window.addEventListener('DOMContentLoaded', () => {
    injecterPersonnageDansLeSite(1); // Charge Goku par exemple
});
      
      // ── MODULE INTERACTIF DRAGON BALL AZ ──
async function initialiserSectionDragonBall() {
    const personnages = [
        { id: 1, nom: "Goku" }, { id: 2, nom: "Vegeta" }, { id: 3, nom: "Piccolo" },
        { id: 4, nom: "Bulma" }, { id: 5, nom: "Freezer" }, { id: 6, nom: "Zarbon" },
        { id: 7, nom: "Dodoria" }, { id: 8, nom: "Ginyu" }, { id: 9, nom: "Cell" },
        { id: 10, nom: "Gohan" }
    ];

    try {
        // Création de la section aux couleurs de votre CSS
        const sectionDBZ = document.createElement('section');
        sectionDBZ.className = "themes-section"; 
        sectionDBZ.style.borderTop = "1px solid var(--border)";
        sectionDBZ.style.padding = "4rem 0";

        const container = document.createElement('div');
        container.className = "container";
        container.style.textAlign = "center";

        const titre = document.createElement('h2');
        titre.className = "section-title";
        titre.textContent = "Univers Dragon Ball Z";
        container.appendChild(titre);

        // Menu déroulant
        const blockSelect = document.createElement('div');
        blockSelect.style.marginBottom = "2rem";
        blockSelect.innerHTML = `
            <label style="font-weight:500; margin-right:10px;">Choisir un guerrier : </label>
            <select id="select-dbz" style="padding:10px 20px; border-radius:var(--radius-sm); border:1px solid var(--border); background:#fff; font-family:inherit; cursor:pointer; font-weight:500;"></select>
        `;
        container.appendChild(blockSelect);

        // Zone d'affichage
        const zoneAffichage = document.createElement('div');
        zoneAffichage.id = "zone-carte-dbz";
        container.appendChild(zoneAffichage);

        sectionDBZ.appendChild(container);

        // On l'injecte juste avant le footer
        const sectionArticlesGrid = document.querySelector('.articles-section');
        if (sectionArticlesGrid) {
            document.body.insertBefore(sectionDBZ, sectionArticlesGrid);
        } else {
            document.body.appendChild(sectionDBZ);
        }

        // Remplir le select
        const selectElement = container.querySelector('#select-dbz');
        personnages.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.nom;
            selectElement.appendChild(opt);
        });

        // Fonction pour aller chercher un perso et l'afficher
        async function chargerPerso(id) {
            zoneAffichage.innerHTML = `<p style="color:var(--text-muted)">Chargement du guerrier...</p>`;
            try {
                const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
                const data = await res.json();

                let transfos = "";
                if (data.transformations && data.transformations.length > 0) {
                    transfos = `
                        <h4 style="margin-top:15px; color:var(--accent)">Transformations</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted)">${data.transformations.map(t => t.name).join(', ')}</p>
                    `;
                }

                zoneAffichage.innerHTML = `
                    <div class="author-card" style="max-width:400px; margin: 0 auto; background:var(--bg-card); padding:2rem; border-radius:var(--radius-md); box-shadow:var(--shadow-md);">
                        <img src="${data.image}" alt="${data.name}" style="height:200px; object-fit:contain; margin-bottom:1rem;">
                        <h3 style="margin-bottom:0.25rem;">${data.name}</h3>
                        <div class="author-role" style="margin-bottom:1rem;">${data.race}</div>
                        <p style="font-size:0.9rem; text-align:justify; line-height:1.5; color:var(--text);">${data.description || "Pas de description."}</p>
                        ${transfos}
                    </div>
                `;
            } catch (e) {
                zoneAffichage.innerHTML = `<p style="color:red">Erreur lors du chargement.</p>`;
            }
        }

        selectElement.addEventListener('change', (e) => chargerPerso(e.target.value));
        chargerPerso(1); // Charge Goku par défaut

    } catch (err) {
        console.error("Erreur module DBZ :", err);
    }
}
initialiserSectionDragonBall();

      
      

      // TODO 4: REMPLIR LA GRILLE D'ARTICLES

    
      function remplirArticles(data) {
  let articlesGrid = document.getElementById('articles-grid');
 
  data.journal.articles.forEach(article => {
    
    let titre = article.titre;
    let date = article.date;  
    let theme = article.theme;
    let image = article.image;
    let popularite = article.popularite;   

    let card = `
      <article class="article-card">
        <img src="${image}" alt="${titre}">
        <div class="article-content" class="boite" data-aos="fade-up" data-aos-duration="1000">
          <span class="theme-badge">${theme}</span>
          <h3>${titre}</h3>
          <p> ${popularite} de popularité</p>
          <p class="date"> ${date}</p>
          <button class="read-btn">Lire l'article</button>
        </div>
      </article>
    `;

    articlesGrid.insertAdjacentHTML('beforeend', card);
  });
}

remplirArticles(data);

      // TODO 5: REMPLIR LES THEMES

    function remplirThemes(data) {
  let articlesThemes = document.getElementById('themes-list');
 
  data.journal.themes.forEach(theme => {
    
    let nom = theme.nom;
    let description = theme.description;   

    let card2 = `
      <div class="theme-item" class="boite" data-aos="fade-up" data-aos-duration="1000">
        <h3>${nom}</h3>
        <p>${description}</p>
      </div>
    `;

    articlesThemes.insertAdjacentHTML('beforeend', card2);
  });
}

remplirThemes(data);

      

      // TODO 6: REMPLIR LES AUTEURS

      function remplirAuteurs(data) {
  let articlesAuteurs = document.getElementById('authors-list');
 
  data.journal.auteurs.forEach(auteur => {
    
    let prenom = auteur.prenom;
    let experience = auteur.typeExperience;
    let presentation = auteur.presentation;
    let image = auteur.photo;   

    let card2 = `
      <div class="author-card" class="boite" data-aos="fade-up" data-aos-duration="1000">
        <img class="author-image" src="${image}" alt="Portrait de ${prenom}">
        <h3>${prenom}</h3>
        <div class="author-role">${experience}</div>
        <p class="author-bio">"${presentation}"</p>
      </div>
    `;

    articlesAuteurs.insertAdjacentHTML('beforeend', card2);
  });
}

remplirAuteurs(data);

      // TODO 7: REMPLIR LE CALL TO ACTION

       let callToAction = document.getElementById(`call-to-action`);

       let texteAppelAction = data.journal.texteAppelAction;
       

       let card = `
              <p>${texteAppelAction}</p>
              <button class="read-article-btn">S'abonner</button>

       `
       
       callToAction.insertAdjacentHTML('beforeend', card);
      
     

      
      


      /// FIN DU CODE

      // BONUS 1 : Alert sur le bouton CTA

      let cta = document.getElementById("call-to-action");
 
      cta.innerHTML = `
        <p>${data.journal.texteAppelAction}</p>
        <button class="cta-button">S'abonner</button>
      `;
 
      document.querySelector(".cta-button").addEventListener("click", () => {
        alert("Merci pour votre abonnement !");
      });
      
      // BONUS 2 : Filtrage par thème

      // BONUS 3 : Tri par popularité
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}



getData();

