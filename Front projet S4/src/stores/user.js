import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
export const useUserStore = defineStore("user", {
  state: () => ({
    route: useRouter(),
    user: null, 
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    isAdmin: (state) => state.user !== null && state.user.permission == 1,
    id_user: (state) => state.user ? state.user.id_user : null,
    username: (state) => state.user ? state.user.username : null,
  },
  actions: {
    init() { 
      let u = localStorage.getItem("user")
      // check if we had it for more than 20 min
      if (u)
      {
        const elapsedTime = Date.now() - JSON.parse(u)["time"];
        const remainingTime = Math.max(60 * 60 * 1000 - elapsedTime, 0);
        
        if (remainingTime > 0)
        {
          const logoutTimer = setTimeout(() => {
              this.route.push("/connexion");
              this.removeUser()
              this.removeTimer()
          }, remainingTime);
  
          localStorage.setItem("logoutTimer", JSON.stringify({ timerId: logoutTimer }));
        } 
        else 
        {
          this.route.push("/connexion");
          this.removeUser()
        }

        this.user = JSON.parse(u)
      }
      else
      {
        this.user = null
      }
    },
    setUser(data){
      this.user = data
      this.user["time"] = Date.now()
      localStorage.setItem("user", JSON.stringify(this.user))
    },
    async logout(){
      this.route.push("/");
      this.removeTimer()
      console.log(await this.removeUser())
      
    },
    removeTimer(){
      const storedTimer = JSON.parse(localStorage.getItem("logoutTimer"));
      if (storedTimer) {
        clearTimeout(storedTimer.timerId);
        console.log("cleared")
        localStorage.removeItem("logoutTimer");
      }
    },
    async removeUser(){
      const user = JSON.parse(localStorage.getItem("user"));
      if (user){
        localStorage.removeItem("user");
      }
      this.user = null

      let rep = await fetch("http://51.68.91.213/info9/Back/users/logout", {credentials:"include"})
      return rep.status==204
    }
  },
});
