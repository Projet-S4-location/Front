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
  <h1>hello word !!!</h1>
</div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.body{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: "Inter", sans-serif;
  background: linear-gradient(to right, black, grey);
  color: aliceblue;
}

</style>