class Anime {
  constructor(id, title, description, isWatched) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isWatched = isWatched || false;
  }
}
