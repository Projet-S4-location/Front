<script setup>
    import calendar from './calendar_item.vue'  
    import { ref, watch } from 'vue'

    const props = defineProps(["id", "name", "tags", "prix", "image"])
    const showCal = ref(false)
</script>

<template>
    <div class="container">
        <div class="item-image">
            <img :src="props.image" alt="Item Image">
        </div>
        <div class="item-details">
            <h2 class="item-name">{{props.name}}</h2>
            <div class="item-tags">
                <a v-for="tag in props.tags" :key="tag" class="tag">{{ tag }}</a>
            </div>
            <p class="item-price">{{props.prix}}€/jour</p>
        </div>
        <button v-on:click = "showCal = !showCal" class = "calendar-button">Calendar</button>
        <calendar :id="props.id" class = "calendar" v-if ="showCal"></calendar>    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

/* Item Card Styling */
.container {
    border: 1px solid #ddd;
    border-radius: 6px;
    overflow: hidden;
    margin: 10px;
    width: 250px;
}

/* Item Image Styling */
.item-image img {
    width: 100%;
    display: block;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

/* Item Details Styling */
.item-details {
    padding: 12px;
}

/* Item Name Styling */
.item-name {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
}

/* Item Tags Styling */
.item-tags {
    margin-top: 6px;
}

.tag {
    background-color: #007bff;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 4px;
    text-decoration: none;
    font-size: 0.8rem;
}

/* Item Price Styling */
.item-price {
    color: #007bff;
    font-size: 0.9rem;
    margin-top: 8px;
}
</style>
