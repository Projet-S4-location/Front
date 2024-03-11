<script setup>
    import navbar from '../components/header.vue'
    import item from '../components/item.vue'   
    import calendar from '../components/calendar_item.vue'   
    import { ref, watch } from 'vue'

    const items = ref(null)
    const displayitems = ref(null)
    const rech = ref('')
    const showCal = ref(false)

    async function fetchData() {
        items.value = null
        const res = await fetch(
            `http://51.68.91.213/info9/Back/products/get_products.php`,{
                credentials: "include"
            }
        )
        items.value = await res.json()


        await Promise.all(items.value.map(async (item) => {
            item.image = `http://51.68.91.213/info9/Back/products/get_image.php?id=${item.id_product}`
            item.tags = await fetchTags(item.id_product)
        }))

        displayitems.value = items.value;

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
            displayitems.value = items.value
            return
        }

        
        displayitems.value = items.value.filter(item => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase())
        })
    }

    fetchData()

</script>


<template>
    <navbar :loc="'louer_app'"></navbar>
    <div class = "shearch">
        <input type="text" v-model="rech">
        <button v-on:click = "showCal = !showCal" class = "calendar-button">Calendar</button>
        <calendar class = "calendar" v-if ="showCal"></calendar>
    </div>
    <main>
        <div v-for="item in displayitems" :key="item.id_product">
            <item :name="item.name" :tags="item.tags" :prix="item.price" :image="item.image" class="item"></item>
        </div>

        <div v-if = "!displayitems " class="loading">
            Chargement...
        </div>
    </main>
    <p>footer</p>
</template>

<style scoped>
    /* Container for the input and items */
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    main {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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

