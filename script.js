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
        <div class="article-content">
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
      <div class="theme-item">
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
      <div class="author-card">
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
       console.log(texteAppelAction);

       let card = `
              <p>${texteAppelAction}</p>
              <button class="read-article-btn">S'abonner</button>

       `
       
       callToAction.insertAdjacentHTML('beforeend', card);
      
     

      
      // <button class="read-article-btn"></button>


      /// FIN DU CODE

      // BONUS 1 : Alert sur le bouton CTA

      // BONUS 2 : Filtrage par thème

      // BONUS 3 : Tri par popularité
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}

getData();
