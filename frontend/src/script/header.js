document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.querySelector('#logout-btn')
  logoutBtn.addEventListener("click", async () => {
    console.log("click")
    try {
      const response = await fetch('http://localhost:3500/logout', {
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
  