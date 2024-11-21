document.addEventListener('DOMContentLoaded', () => {
  const search = document.querySelector("#search")
  const profile= document.querySelector("#profile")
  const popularHits = document.querySelector("#popular-hits")
  const myPlayList = document.querySelector("#my-playlist")
  const myFavoriteSong = document.querySelector("#my-favorite-song")
  const Logout = document.querySelector("#logout")

  // const loginFormData = new FormData(loginForm)
  // const username = loginFormData.get('username')
  // const usernameTitle = document.querySelector('.username')

  // usernameTitle.textContent = `${ username }`

  search.addEventListener("click",() => {
    window.location.href = '/search';
  })

  profile.addEventListener("click",() => {
    window.location.href = '/profile';
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
