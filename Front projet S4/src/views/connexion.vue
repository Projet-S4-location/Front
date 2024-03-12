<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from "./../stores/user";


const router = useRouter();
const userStore = useUserStore();

const username = ref('')
const password = ref('')
function checkCookiesEnabled() {
    var cookieEnabled = navigator.cookieEnabled;
    if (cookieEnabled === undefined) {
        var cookieEnabled = true;
        var testCookie = document.createElement("cookie");
        testCookie.setAttribute("name", "testcookie");
        document.body.appendChild(testCookie);
        cookieEnabled = testCookie.value !== "";
        document.body.removeChild(testCookie);
    }
    return cookieEnabled;
}
console.log(checkCookiesEnabled());
async function envoi() {
  console.log(username.value, password.value)
  await fetch("http://51.68.91.213/info9/Back/users/connexion.php", {
    credentials: 'include',
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify({
	  "username": username.value,
    "password": password.value
  })
  }).then((Response)=>{
    
    if (Response.status == "200"){

      return Response.json().then((data)=>{

        userStore.setUser(data)
        // userStore.init()
        //userStore.user = data.id_user
        username.value = ''
        password.value = ''
        fetch("http://51.68.91.213/info9/Back/get_session.php", {
          credentials: 'include'
        })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        router.push("item_shop")
      })
      .catch(error => {
        console.error('Error:', error);
      });

    })

    }
    else{
      username.value = ''
      password.value = ''
    }
    })
}
</script>

<template>
  <div class="body">
      <div class="content">
      <div class="login-container">
        <div class="wave-container">
          <h1 class="wave">
            Bienvenue!
          </h1>
        </div>
        <form class="form" @submit.prevent="envoi">
          <div class="txt_field">
            <input v-model="username" type="text" required />
            <span></span>
            <label >Username</label>
          </div>
          <div class="txt_field">
            <input v-model="password" type="password" required />
            <span></span>
            <label>Password</label>
          </div>
          <p>Connectez-vous pour accéder à notre catalogue d'équipements</p>
          <input type="submit" value="Login"/>
        </form>
      </div>
      <section class="slide_container">
        <div class="slide_wrapper">
          <div class="slider">
            <img
              id="slide_1"
              src="/images/camera10.jpeg"
              alt="Image représentant 2 appareils photo"
            />
            <img
              id="slide_2"
              src="/images/camera11.jpeg"
              alt="Représentation d'une caméra professionnelle utilisée lors de concerts"
            />
             <img
              id="slide_3"
              src="/images/camera12.jpeg"
              alt="Image contentant un drone permetant de faire de la vidéo"
            /> 
            <div class="slider_nav">
              <a href="#slide_1"></a>
              <a href="#slide_2"></a>
              <a href="#slide_3"></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
	--u: 10px;
	--c1: #fbf9fe;
	--c2: #02b6e7;
	--c3: #00699b;
	--gp: 50%/ calc(var(--u) * 16.9) calc(var(--u) * 12.8);
	background: 
		conic-gradient(from 122deg at 50% 85.15%, var(--c2) 0 58deg, var(--c3) 0 116deg, #fff0 0 100%) var(--gp),
		conic-gradient(from 122deg at 50% 72.5%, var(--c1) 0 116deg, #fff0 0 100%) var(--gp),
		conic-gradient(from 58deg at 82.85% 50%, var(--c3) 0 64deg, #fff0 0 100%) var(--gp),
		conic-gradient(from 58deg at 66.87% 50%, var(--c1) 0 64deg, var(--c2) 0 130deg, #fff0 0 100%) var(--gp),
		conic-gradient(from 238deg at 17.15% 50%, var(--c2) 0 64deg, #fff0 0 100%) var(--gp),
		conic-gradient(from 172deg at 33.13% 50%, var(--c3) 0 66deg, var(--c1) 0 130deg, #fff0 0 100%) var(--gp),
		linear-gradient(98deg, var(--c3) 0 15%, #fff0 calc(15% + 1px) 100%) var(--gp),
		linear-gradient(-98deg, var(--c2) 0 15%, #fff0 calc(15% + 1px) 100%) var(--gp),
		conic-gradient(from -58deg at 50.25% 14.85%, var(--c3) 0 58deg, var(--c2) 0 116deg, #fff0 0 100%) var(--gp),
		conic-gradient(from -58deg at 50% 28.125%, var(--c1) 0 116deg, #fff0 0 100%) var(--gp),
		linear-gradient(90deg, var(--c2) 0 50%, var(--c3) 0 100%) var(--gp);
}


.wave-container {
  position: relative;
  margin-bottom: 100px;

}

.wave {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.6em;
  color: #000000;
  animation: animate 4s ease-in-out infinite;
}

@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}
.content {
  display: flex;
  background-color: aliceblue;
  height: 450px;
  width: 700px;
  border-radius: 8%;
}

.login-container {
  flex: 1;
  height: 450px;
  border-radius: 8%;
  top: 50%;
  left: 50%;
  width: 400px;
}


.login-container .form {
  padding: 0 40px;
}

.form .txt_field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}

.txt_field input {
  margin-top: 10px;
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}

.txt_field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}

.txt_field span::before {
  margin-top: 10px;
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #1a1a1a;
  transition: 0.5s;
}

.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  margin-top: 10px;
  top: -5px;
  color: #1a1a1a;
}

.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}

p{
  padding-top: 3%;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500; 
   letter-spacing: 0.05rem;
}

input[type="submit"] {
  margin-top: 10%;
  width: 100%;
  height: 50px;
  border: 1px solid;
  background: #1a1a1a;
  border-radius: 15px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: ease-in-out 0.5s;
}

input[type="submit"]:hover {
  transform: translate(0px, -2px);
  border-color: #1a1a1a;
}

.slide_container {
  padding: 2rem;
  width: 200px;
  height: 350px;
  flex: 1;
  border-radius: 8%;
  background-color: #78e0fd;
  margin: 20px 20px 20px 0;
}

.slider_wrapper {
  position: relative;
  max-width: 48rem;
  margin: 0 auto;
}

.slider {
  width: 310px;
  height: 350px;
  display: flex;
  overflow: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  box-shadow: 0 1.5rem 3rem -0.75rem hsl(0, 0%, 0%, 0.25);
  border-radius: 10%;
}


.slider img {
  flex: 1 0 100%;
  scroll-snap-align: start;
  object-fit: cover;
  width: 250px;
  height: 350px;
}

.slider_nav {
  display: flex;
  column-gap: 1rem;
  position: absolute;
  bottom: 10.3rem;
  left: 60.5%;
  transform: translateX(-50%);
  z-index: 1;

}

.slider_nav a {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #fff;
  opacity: 0.75;
  transition: opacity ease 250ms;
}

.slider_nav a:hover {
  opacity: 1;
}
</style>