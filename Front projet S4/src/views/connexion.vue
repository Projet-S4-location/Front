<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from "./../stores/user";


const router = useRouter();
const userStore = useUserStore();

const username = ref('')
const password = ref('')
async function envoi() {
  console.log(username.value, password.value)
  await fetch("http://51.68.91.213/info9/Back/users/connexion.php", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: 'include',
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
        }).then((Response)=>{
          return Response.json()}).then((data)=>{
            console.log(data)
            router.push("item_shop")

          })

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
        <h1>Bienvenue !</h1>
        <div class="form">
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
          <input type="submit" value="Login" @click="envoi"/>
         </div>
      </div>
      <section class="slide_container">
        <div class="slide_wrapper">
          <div class="slider">
            <img
              id="slide_1"
              src="/images/camera0.jpeg"
              alt="Image représentant 2 appareils photo"
            />
            <img
              id="slide_2"
              src="/images/camera1.jpeg"
              alt="Représentation d'une caméra professionnelle utilisée lors de concerts"
            />
            <img
              id="slide_3"
              src="/images/camera2.jpeg"
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

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
.body {
  background-image: url(/images/topography.svg);
  background-size: 550px;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fb946c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  display: flex;
  background-color: aliceblue;
  height: 450px;
  width: 700px;
  border-radius: 8%;
}

.login-container {
  padding-top: 20px;
  flex: 1;
  height: 450px;
  border-radius: 8%;
  top: 50%;
  left: 50%;
  width: 400px;
}

.login-container h1 {
  text-align: center;
  text-shadow: 1px 1px 2px pink;
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
  font: 1rem "Fira Sans", Playfair Display;
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
}

input[type="submit"]:hover {
  border-color: #1a1a1a;
  transition: 0.5s;
}

.slide_container {
  padding: 2rem;
  width: 200px;
  height: 350px;
  flex: 1;
  border-radius: 8%;
  background-color: #fae4d6;
  margin: 20px 20px 20px 0;
}

.slider_wrapper {
  position: relative;
  max-width: 48rem;
  margin: 0 auto;
}

.slider {
  display: flex;
  aspect-ratio: 16/9;
  overflow: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  box-shadow: 0 1.5rem 3rem -0.75rem hsl(0, 0%, 0%, 0.25);
}

.slider img {
  flex: 1 0 100%;
  scroll-snap-align: start;
  object-fit: cover;
}

.slider_nav {
  display: flex;
  column-gap: 1rem;
  position: absolute;
  bottom: 10.25rem;
  left: 60%;
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