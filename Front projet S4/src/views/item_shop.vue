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

        // Attendre la résolution de toutes les promesses de fetchTags
        await Promise.all(items.value.map(async (item) => {
            item.image = `http://51.68.91.213/info9/Back/products/get_image.php?id=${item.id_product}`
            item.tags = await fetchTags(item.id_product)
        }))
    }

    async function fetchTags(id){
        const res = await fetch(
            `http://51.68.91.213/info9/Back/products/get_tag_by_product.php?id=${id}`,{
                credentials: "include"
            }
        )
        return await res.json()
    }

    fetchData()


</script>


<template>
    <navbar :loc = "'louer_app'"></navbar>
    <p>barre de recherche + calendrier</p>
    <main>
        <div v-for ="item in items">
            <item :name = "item['name']" :tags = "item['tags']" :prix = "item['price']" :image = "item['image']"></item>
        </div>
        </main>
    <p>footer</p>
</template>
