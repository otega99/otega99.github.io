const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const btn = document.querySelector(".btn");

const apiUrl = "https://api.lyrics.ovh";

window.addEventListener(
  "scroll",
  function () {
    btn.classList.remove("show");
  },
  window.scrollY > 0
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = search.value.trim();

  if (!searchValue) {
    alert("There is nothing to search");
  } else {
    searchSong(searchValue);
  }
});

async function searchSong(value) {
  const searchResult = await fetch(`${apiUrl}/suggest/${searchValue}`);
  const data = await searchResult.json();
  showData(data);

  function showData(data) {
    btn.classList.add("show");
    result.innerHTML = `
      <ul class="song-list">
      ${data.data
        .map(
          (song) => `<li>
                     <div>
                       <strong>
                          ${song.artist.name}
                       </strong> - ${song.title}
                         </div>
                          <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                          get lyrics
                          </span>
                          </li>`
        )
        .join("")}
        </ul>`;
  }
}

result.addEventListener("click", (e) => {
  const clickedElement = e.target;

  if (clickedElement.tagName === "SPAN") {
    const artist = clickedElement.getAttribute("data-artist");

    const songTitle = clickedElement.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `
    <h2>
      <strong>${artist}</strong> - ${songTitle}
    </h2>
    <p>${lyrics}</p>
  `;
}
