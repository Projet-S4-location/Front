<script setup>
    import navbar from '../components/header.vue'
    import item from '../components/item.vue'  
    import calendar from '../components/calendar_studio.vue'  
    import pied from '../components/pied.vue' 
    import { ref, watch } from 'vue'

    const displaystudios = ref(null)
    const rech = ref('')
    const showCal = ref(false)

    const studios = ref(null)

    async function fetchData() {
        studios.value = null
        const res = await fetch(
            `http://51.68.91.213/info9/Back/products/get_studios.php`,{
                credentials: "include"
            }
        )
        studios.value = await res.json()

        // Attendre la résolution de toutes les promesses de fetchTags
        await Promise.all(studios.value.map(async (studio) => {
            studio.image = `http://51.68.91.213/info9/Back/products/get_image.php?id=${studio.id_product}`
            studio.tags = await fetchTags(studio.id_product)
        }))
        displaystudios.value = studios.value;
    }

    async function fetchTags(id){
        const res = await fetch(
            `http://51.68.91.213/info9/Back/products/get_tag_by_product.php?id=${id}`,{
                credentials: "include"
            }
        )
        return await res.json()
    }

    watch(rech, (newValue, oldValue) => {
        filterItems(rech.value)
    })

    function filterItems(searchValue) {

        if (searchValue == null) {
            displaystudios.value = studios.value
            return
        }

        
        displaystudios.value = studios.value.filter(studio => {
            return studio.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    }

    fetchData()


</script>


<template>
    <navbar :loc = "'louer_app'"></navbar>
    <div class = "shearch">
        <input type="text" v-model="rech">
        <button v-on:click = "showCal = !showCal" class = "calendar-button">Calendar</button>
        <calendar class = "calendar" v-if ="showCal"></calendar>
    </div>
    <main>
        <div v-for ="studio in displaystudios">
            <item :id="studio['id_product']" :name = "studio['name']" :tags = "studio['tags']" :prix = "studio['price']" :image = "studio['image']"></item>
        </div>
        </main>
        <pied></pied>
</template>

<style scoped>
main{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
/* Input styling */
input[type="text"] {
        width: 100%;
        padding: 10px;
        margin: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
    }

    /* Loading message styling */
    .loading {
        font-size: 18px;
        font-weight: bold;
        color: #007bff;
        margin-top: 20px;
    }

    .shearch{
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #f0f0f0;
    }

    /* Calendar button styling */
    .calendar-button {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin: 0px 10px 10px 10px;
    }

    /* Calendar component styling */
    .calendar {
        background-color: white;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }
</style>
