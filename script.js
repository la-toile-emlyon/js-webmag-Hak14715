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
      //console.log(titre);
      let date = data.journal.articlePrincipal.date;
      //console.log(date);
      let description = data.journal.articlePrincipal.description;
      //console.log(description);
      let image = data.journal.articlePrincipal.image;
      //console.log(image);
      let theme = data.journal.articlePrincipal.theme;
      //console.log(theme);

      let card = `
            <div id="article-principal">
               <img id="#hero-image" src="${image}" alt="">
               <h1 class="hero-titre">${titre}</h1>
               <p class="#hero-description">${description}</p>
               
            </div>
      `
      articlePrincipal.insertAdjacentHTML(`afterend`, card);
      }
    remplirArticlePrincipal(data)

      
      
      
     // <button class="read-article-btn"></button>
      
      

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
      <div class="container">
        <article class="article-card">
          <img class="" src="${image}" alt="${titre}">
          <span class="theme-badge">${theme}</span>
          <h3>${titre}</h3>
          <p> ${popularite} de popularité</p>
          <p class="date">Le ${date}</p>
        </article>
      </div>
    `;

    articlesGrid.insertAdjacentHTML('beforeend', card);
  });
}

remplirArticles(data);

      // TODO 5: REMPLIR LES THEMES

    function remplirThemes(data) {
  let articlesThemes = document.getElementById('themes-list');
 
  data.journal.articles.forEach(theme => {
    
    let titre = theme.nom;
    let popularite = theme.description;   

    let card = `
      <div class="themes-section">
        <article class="theme-item">
          <h1>${titre}</h3>
          <p> ${popularite} de popularité</p> 
        </article>
      </div>
    `;

    articlesThemes.insertAdjacentHTML('beforeend', card);
  });
}

remplirThemes(data);

      

      // TODO 6: REMPLIR LES AUTEURS

      // TODO 7: REMPLIR LE CALL TO ACTION

      /// FIN DU CODE

      // BONUS 1 : Alert sur le bouton CTA

      // BONUS 2 : Filtrage par thème

      // BONUS 3 : Tri par popularité
    })
    .catch((error) => console.error('Erreur lors de la lecture des données :', error));
}

getData();
