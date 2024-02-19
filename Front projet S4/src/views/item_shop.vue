<script setup>
    import navbar from '../components/header.vue'
    import item from '../components/item.vue'   
    import { ref, watch } from 'vue'

    const items = ref(null)

    async function fetchData() {
    items.value = null
    const res = await fetch(
        `http://51.68.91.213/info9/Back/products/get_products.php`,{
            credentials: "include"
        }
    )
    items.value = await res.json()
    }

    fetchData(); 
    

</script>


<template>
    <navbar :loc = "'louer_app'"></navbar>
    <p>barre de recherche + calendrier</p>
    <main>
        <div v-for ="item in items">
            <item :name = "item['name']" :tags = "['test', 'test2']" :prix = "item['price']" :image = "'a'"></item>
        </div>
        </main>
    <p>footer</p>
</template>