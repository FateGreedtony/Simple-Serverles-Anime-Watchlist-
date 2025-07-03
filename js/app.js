let animeList = [];

$(document).ready(() => {
  $.getJSON('database.json', (data) => {
    animeList = data.map(a => new Anime(a.id, a.title, a.description, a.isWatched));
    renderAnime();
  });

  $('#animeForm').submit(e => {
    e.preventDefault();
    try {
      const title = $('#animeTitle').val();
      const desc = $('#animeDesc').val();
      const newId = Date.now();

      const newAnime = new Anime(newId, title, desc, false);
      animeList.push(newAnime);

      renderAnime();
      $('#animeModal').modal('hide');
      $('#animeForm').trigger('reset');

      showSuccesToast(); 
    } catch (error) {
      console.error("Gagal menambahkan anime:", error);
      showFailToast();
    }
  });
});

function renderAnime() {
  $('#anime-list').empty();
  animeList.forEach(anime => {
    $('#anime-list').append(`
      <div class="card mb-2">
        <div class="card-body ${anime.isWatched ? 'bg-light text-muted' : ''}">
          <h5 class="card-title">${anime.title}</h5>
          <p class="card-text">${anime.description}</p>
          <button class="btn btn-sm btn-success" onclick="toggleAnime(${anime.id})">
            ${anime.isWatched ? 'Unwatch' : 'Watched'}
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteAnime(${anime.id})">Delete</button>
        </div>
      </div>
    `);
  });
}

function toggleAnime(id) {
  animeList = animeList.map(a => {
    if (a.id === id) a.isWatched = !a.isWatched;
    return a;
  });
  renderAnime();
}

function deleteAnime(id) {
  animeList = animeList.filter(a => a.id !== id);
  renderAnime();
}

function showSuccesToast() {
  const toast = new bootstrap.Toast(document.getElementById('successToast'));
  toast.show();
}

function showFailToast() {
  const toast = new bootstrap.Toast(document.getElementById('failToast'));
  toast.show();
}