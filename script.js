const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
  //after fetch data we clear previous data
  keyword.value = "";
  artistContainer.innerHTML = "";
  albumContainer.innerHTML = "";
};

const showArtists = (data) => {
  console.log(data);
  //bug solve
  const artistContainer = elementById("artists");
  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    //image bug solve
    //imformation bug solve
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Not Available"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Not Available"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  console.log(id)
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  //after fetch data we clear previous data
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  artistContainer.innerHTML = "";
  albumContainer.innerHTML = "";
};

const showAlbum = (data) => {
  console.log(data);
  const albumContainer = elementById("albums");
  //data was not declared this bug solved
  data.album.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    //item was not declared. This bug solved
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum ? item.strAlbum : "Not Available"}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};
