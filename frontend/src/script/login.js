
// form
	document.addEventListener('DOMContentLoaded', () => {
		const signupBtn = document.querySelector(".signup-btn")
    const loginBtn = document.querySelector(".login-btn")
    const home = document.querySelector(".right-side")
    const login = document.querySelector(".login")
    const signup = document.querySelector(".sign-up")
    const backIcon = document.querySelectorAll(".back-icon")
    
    
    signupBtn.addEventListener('click', () => {
      home.style.display = 'none'
      login.style.display = 'none'; 
      signup.style.display='block'
    })

    loginBtn.addEventListener('click',() => {
      home.style.display = 'none'
      login.style.display = 'block'; 
      signup.style.display='none'
    })
    backIcon.forEach((btn) => {
      btn.addEventListener('click',() => {
        home.style.display = 'block'
        login.style.display = 'none'; 
        signup.style.display='none'
      })
    })

    //login

    const loginForm = document.querySelector('.login-form') 

			loginForm.addEventListener('submit', async (e) => {
				e.preventDefault()
				const loginFormData = new FormData(loginForm)
				const username = loginFormData.get('username')
				const password = loginFormData.get('password')

				console.log(JSON.stringify({ username, password })) 

        try {
          const response = await fetch(`http://localhost:3500/login`, {
              method: 'POST',
              headers: {
                  "Content-Type": 'application/json',
              },
              body: JSON.stringify({
                  "username": username,
                  "password": password
              }),
              credentials: 'include'
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log(data);
  
              window.location.href = '/home';
          } else {
              const errorData = await response.json();
              console.error('Login failed:', errorData);
              alert('Login failed: ' + errorData.message);
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Something went wrong. Please try again later.');
      }
        
		})

  //signup

  const signupForm = document.querySelector('.signup-form') 

  signupForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const signupFormData = new FormData(signupForm);
		const username = signupFormData.get('username');
		const name = signupFormData.get('name');
		const email = signupFormData.get('email');
		const password = signupFormData.get('password');

		console.log(JSON.stringify({ username, name, email, password }));

    try{
      const response = await fetch(`http://localhost:3500`, {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json',
			},
			body: JSON.stringify({
				"username": username,
				"name": name,
				"email": email,
				"password": password
			}),
			credentials: 'include'
		});
		const data = await response.json();
		console.log(data);
    alert('Created your account!');
    home.style.display = 'block'
    login.style.display = 'none'; 
    signup.style.display='none'

  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again later.');
  }	
	});
})

  


	