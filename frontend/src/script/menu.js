document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector("#search")
  const popularList = document.querySelector("#popular-list")
  const popularHits = document.querySelector("#popular-hits")
  const myPlayList = document.querySelector("#my-playlist")
  const myFavoriteSong = document.querySelector("#my-favorite-song")
  const Logout = document.querySelector("#logout")

  search.addEventListener("click",() => {
    window.location.href = '/search';
  })

  popularList.addEventListener("click",() => {
    window.location.href = '/popularPlayList';
  })

  popularHits.addEventListener("click",() => {
    window.location.href = '/popularHits';
  })

  myPlayList.addEventListener("click",() => {
    window.location.href = '/myPlayList';
  })

  myFavoriteSong.addEventListener("click",() => {
    window.location.href = '/favoriteSong';
  })

  Logout.addEventListener("click", async () => {
    console.log("click")
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' 
      });

      if (response.ok) {
        window.location.href = '/'; 
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('failed ;(');
    }
  });

  
})
