//search

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchResultsContainer = document.querySelector('#search-results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // フォーム送信のデフォルト動作を防ぐ
  
  const query = searchInput.value.trim(); // ユーザーが入力した検索ワードを取得
  if (query) {
    console.log('検索キーワード:',query)
    await searchDeezer(query);
  }
});

async function searchDeezer(query) {
  const url = `http://localhost:3500/deezer-proxy/search?q=${query}`;

  try {
    console.log(url)
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      displaySearchResults(data);
    } else {
      console.error('Error fetching search results:', response.statusText);
      searchResultsContainer.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error('Error:', error);
    searchResultsContainer.innerHTML = '<p>Unexpected error occurred. Please try again later.</p>';
  }
}

function displaySearchResults(data) {
  searchResultsContainer.innerHTML = ''; // 検索結果をクリア
  console.log('Search results data:', data);

  if (data && data.data && data.data.length > 0) {
    data.data.forEach((albumData,index) => {
      const artistName = albumData?.artist?.name;
      const artistID = albumData?.artist?.id;
      const albumCover = albumData?.album?.cover_xl;
      const trackTitle = albumData?.title;
      console.log(artistID)

      const popularHits = document.querySelector('.popular-hits');
      popularHits.style.display ="none"


      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result-item');
      resultDiv.style.width= '20%'
      resultDiv.style.margin = '20px';
      resultDiv.style.textAlign = 'center';

      const imgElement = document.createElement('img');
      imgElement.src = albumCover;
      imgElement.alt = trackTitle;
      imgElement.style.width = '100%';
      // imgElement.style.height = '100%';

      imgElement.addEventListener('click', async () => {
        try {
          const response = await fetch('http://localhost:3500/playlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              albumCover,
              trackTitle,
              artistName,
            }),
          });

          if (response.ok) {
            const result = await response.json();
            console.log('Playlist updated:', result.playlist);
            alert('Added to playlist!');
          } else {
            console.error('Failed to add to playlist:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding to playlist:', error);
        }
      });

      const titleElement = document.createElement('p');
      titleElement.textContent = trackTitle;
      titleElement.style.margin = '10px 0';

      const artistElement = document.createElement('a');
      artistElement.href = `http://localhost:3500/deezer-proxy/artist/${artistID}`;
      artistElement.textContent = artistName;
      artistElement.style.color = 'white';
      artistElement.style.textDecoration = 'underline';
      artistElement.addEventListener('click', async (e) => {
        console.log('click')
        e.preventDefault();
        await fetchArtistTracks(artistID, artistName);

      });

      resultDiv.appendChild(imgElement);
      resultDiv.appendChild(titleElement);
      resultDiv.appendChild(artistElement);
      searchResultsContainer.appendChild(resultDiv);
    });
  } else {
    searchResultsContainer.innerHTML = '<p>No results found for your search.</p>';
  }
}

// singlChart

const musicChart = 'http://localhost:3500/deezer-proxy/chart';

async function fetchMusicChart() {
  try {
    const response = await fetch(musicChart);
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const result = document.querySelector('#result');
      result.textContent = '';

      const albums = data?.tracks?.data;

      if (albums && albums.length > 0) {
        albums.forEach((albumData, index) => {
          const albumCover = albumData?.album?.cover_xl;
          const trackTitle = albumData?.title;
          const artistName = albumData?.artist?.name;
          const artistID = albumData?.artist?.id; 
          console.log(artistID)

          const albumContainer = document.createElement('div');
          albumContainer.classList.add('.album-container');
          albumContainer.style.width="20%";
          albumContainer.textAlign = 'center';
          albumContainer.style.margin = '20px';
          albumContainer.style.display = 'inline-block';

          const imgElement = document.createElement('img');
          imgElement.classList.add('img-element');
          imgElement.src = albumCover;
          imgElement.alt = `${trackTitle} Album Cover`;
          imgElement.style.width = '100%';
          // imgElement.style.height = '';
          imgElement.style.display = 'block';

          imgElement.addEventListener('click', async () => {
            try {
              const response = await fetch('http://localhost:3500/playlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  albumCover,
                  trackTitle,
                  artistName,
                }),
              });
    
              if (response.ok) {
                const result = await response.json();
                console.log('Playlist updated:', result.playlist);
                alert('Added to playlist!');
              } else {
                console.error('Failed to add to playlist:', response.statusText);
              }
            } catch (error) {
              console.error('Error adding to playlist:', error);
            }
          });

          const titleElement = document.createElement('p');
          titleElement.textContent = trackTitle;
          titleElement.style.margin = '10px 0 5px';

          const artistElement = document.createElement('a');
          artistElement.textContent = artistName;
          artistElement.href = `http://localhost:3500/deezer-proxy/artist/${artistID}`; 
          artistElement.style.color = 'white';
          artistElement.style.textDecoration = 'underline';
          artistElement.addEventListener('click', async (e) => {
            e.preventDefault();
            await fetchArtistTracks(artistID, artistName);
          });

          albumContainer.appendChild(imgElement);
          albumContainer.appendChild(titleElement);
          albumContainer.appendChild(artistElement);

          result.appendChild(albumContainer);
        });
      } else {
        console.error('No album data available.');
      }
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//artist album
async function fetchArtistTracks(artistID, artistName) {
  const url = `http://localhost:3500/deezer-proxy/artist/${artistID}/albums`;

  console.log(url);
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(`Albums for ${artistName}:`, data);
     
      const result = document.querySelector('#result');
      const searchtResult = document.querySelector('#search-result');
      const titles = document.querySelectorAll('.title');
     
      titles.forEach(title => {
        title.textContent = `${artistName}`;
      });
      // searchtResult.innerHTML = '';
      // searchtResult.style.flexWrap = 'wrap';
      result.innerHTML += '<p>Back</p>'

      result.innerHTML = '';
      result.style.flexWrap = 'wrap';

      if (data.data && data.data.length > 0) {
        data.data.forEach((albumData) => {
          const albumCover = albumData?.cover_xl;
          const albumTitle = albumData?.title;

          // アルバム情報を表示するためのコンテナを作成
          const albumContainer = document.createElement('div');
          albumContainer.style.width="20%";
          albumContainer.style.textAlign = 'center';
          albumContainer.style.margin = '20px';
          albumContainer.style.display = 'inline-block';

          // アルバムカバー画像
          const imgElement = document.createElement('img');
          imgElement.classList.add('img-element');
          imgElement.src = albumCover;
          imgElement.alt = `${albumTitle} Album Cover`;
          imgElement.style.width = '100%';
          imgElement.style.display = 'block';

          imgElement.addEventListener('click', async () => {
            try {
              const response = await fetch('http://localhost:3500/playlist', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  albumCover,
                  trackTitle,
                  artistName,
                }),
              });
    
              if (response.ok) {
                const result = await response.json();
                console.log('Playlist updated:', result.playlist);
                alert('Added to playlist!');
              } else {
                console.error('Failed to add to playlist:', response.statusText);
              }
            } catch (error) {
              console.error('Error adding to playlist:', error);
            }
          });

          // アルバムタイトル
          const titleElement = document.createElement('p');
          titleElement.textContent = albumTitle;
          titleElement.style.margin = '10px 0 5px';

    
          // アルバムコンテナに要素を追加
          albumContainer.appendChild(imgElement);
          albumContainer.appendChild(titleElement);

          result.appendChild(albumContainer);
          // searchtResult.appendChild(albumContainer);
        });
      } else {
        result.innerHTML += '<p>No albums available.</p>';
      }
    } else {
      console.error('Failed to fetch artist albums:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching artist albums:', error);
  }
}

//playlist

async function fetchPlayListChart() {
  try {
    const response = await fetch('http://localhost:3500/deezer-proxy/playlist');
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const result = document.querySelector('#playlist-result');
      result.textContent = '';

      const albums = data?.tracks?.data;

      if (albums && albums.length > 0) {
        albums.forEach((albumData, index) => {
          const albumCover = albumData?.album?.cover_xl;
          const trackTitle = albumData?.title;
          const artistName = albumData?.artist?.name;
          const artistID = albumData?.artist?.id; 
          console.log(artistID)

          const albumContainer = document.createElement('div');
          albumContainer.style.width="20%";
          albumContainer.style.textAlign = 'center';
          albumContainer.style.margin = '20px';
          albumContainer.style.display = 'inline-block';

          const imgElement = document.createElement('img');
          imgElement.classList.add('img-element');
          imgElement.src = albumCover;
          imgElement.alt = `${trackTitle} Album Cover`;
          imgElement.style.width = '100%';
          imgElement.style.height = '100%';
          imgElement.style.display = 'block';

          const titleElement = document.createElement('p');
          titleElement.textContent = trackTitle;
          titleElement.style.margin = '10px 0 5px';


          albumContainer.appendChild(imgElement);
          albumContainer.appendChild(titleElement);

          result.appendChild(albumContainer);
        });
      } else {
        console.error('No album data available.');
      }
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchMusicChart();




