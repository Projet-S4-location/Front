<script setup>

import { ref, onMounted } from 'vue';

const currentDateVar = ref(new Date());
const calendar = ref([[]]);
const startDate = ref(null);
const selectedDate = ref(null);
const endDate = ref(null);
const currentYear = ref(currentDateVar.value.getFullYear());
const currentMonth = ref(currentDateVar.value.getMonth());
const currentDate = ref(currentDateVar.value);
const nextDate = ref(-1);
const unavailableDates = ref([]);
const validDate = ref(true);
const items = ref([]);
const user = ref(NaN);
const chambre_actuelle = ref(NaN);
const chambre_click = ref(false);
const resa_chambres = ref([]);
const nb_p = ref(1);
const com = ref("");
const petit_d = ref(0);
const clicked = ref(false);
const dureeMax = ref(7);


function insert_resa() {
  if (endDate.value && validDate.value && petit_d.value !== 2 && parseInt(nb_p.value) <= chambre_actuelle.value["capacite"]) {
    const new_id = new_id(resa_chambres.value, "id_resa_hotel");
    fetch('ressources/resa_hotel/resa_hotel_insert.php?id=' + new_id + "&id_client=" + user.value["mail"] + "&id_ch_hotel=" + chambre_actuelle.value["id_ch_hotel"] + "&date_debut=" + startDate.value.getFullYear() + "-" + (parseInt(startDate.value.getMonth()) + 1) + "-" + startDate.value.getDate() + "&nb_j=" + (parseInt(daysBetween(startDate.value, endDate.value)) + 1) + "&commentaire=" + com.value + "&ptit_dej=" + petit_d.value + "&nb_pers=" + nb_p.value, {})
    const day = new Date(startDate.value.getFullYear(), startDate.value.getMonth(), startDate.value.getDate());
    var date = [];
    date.push(day);
    date.push(daysBetween(startDate.value, endDate.value) + 1);
    unavailableDates.value.push(date);
    resa_chambres.value.push({"id": new_id, "id_client": user.value["mail"], "id_ch_hotel": chambre_actuelle.value["id_ch_hotel"], "date_debut": startDate.value.getDate() + "-" + startDate.value.getMonth() + "-" + startDate.value.getFullYear(), "nb_j": daysBetween(startDate.value, endDate.value) + 1, "commentaire": com.value, "ptit_dej": petit_d.value, "nb_pers": nb_p.value})

    alert("Votre réservation a bien été prise en compte du " + startDate.value.getDate() + "/" + startDate.value.getMonth() + "/" + startDate.value.getFullYear() + " au " + endDate.value.getDate() + "/" + endDate.value.getMonth() + "/" + endDate.value.getFullYear() + ".");

    startDate.value = null;
    selectedDate.value = null;
    endDate.value = null;
    nextDate.value = -1;
    nb_p.value = 1;
    com.value = "";
    clicked.value = false;
    generateCalendar();
  }
}

function new_id(tab, type) {
  let res = 1;
  let find = false;
  while (!find) {
    let all = true;
    for (let i in tab.value) {
      if (res === tab.value[i][type]) {
        res += 1;
        all = false;
      }
    }
    find = all;
  }
  return res;
}

function prix() {
  if (endDate.value) {
    return daysBetween(startDate.value, endDate.value) * chambre_actuelle.value["prix"] + petit_d.value * nb_p.value * daysBetween(startDate.value, endDate.value) * 5 + "€";
  }
  return "";
}

function generateCalendar() {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  const totalDays = lastDayOfMonth.getDate();

  calendar.value = [];

  startDate.value = null;
  selectedDate.value = null;
  endDate.value = null;
  nextDate.value = -1;

  const months = {
    'Janvier': 31, 'Février': bissextile(currentYear.value) ? 29 : 28, 'Mars': 31, 'Avril': 30, 'Mai': 31, 'Juin': 30,
    'Juillet': 31, 'Aout': 31, 'Septembre': 30, 'Octobre': 31, 'Novembre': 30, 'Decembre': 31,
  };

  // La boucle qui crée les mois, chaque mois a une id: le nom du mois, un type 'month', value l'index du mois (de 0 à 11) selected un booléan pour savoir si un
  // jour dans le mois est selectionné et days la liste des jours contenus dans le mois

  const monthKeys = Object.keys(months);

  for (let i = 0; i < monthKeys.length; i++) {
    const monthKey = monthKeys[i];
    const monthObject = {
      id: monthKey,
      type: 'month',
      value: i,
      selected: false,
      days: [],
    };

    // Créations des jours dans une liste, chaque jour contient une id le numéro du jour (qui commence à 1) un type 'day' une value pareil que l'id et un attribut selected
    // pour savoir si le jour est selectionné

    const daysInMonth = months[monthKey];
    for (let i = 1; i <= daysInMonth; i++) {
      monthObject.days.push({
        id: i,
        type: 'day',
        value: i,
        selected: false,
        available: true,
      });
    }

    // On remets les bons jours en "selected" quand on change de mois---------
    if (startDate.value && startDate.value.getFullYear() == currentYear.value && startDate.value.getMonth() == monthObject.value) {
      monthObject.selected = true;
      monthObject.days[startDate.value.getDate() - 1].selected = true;
    }

    if (endDate.value && endDate.value.getFullYear() == currentYear.value && endDate.value.getMonth() == monthObject.value) {
      monthObject.selected = true;
      monthObject.days[endDate.value.getDate() - 1].selected = true;
    }

    //--------------------------------------------------------------------

    calendar.value.push(monthObject);

  }

  console.log(calendar.value);
  console.log(`Current Year: ${currentYear.value}`);
  console.log(`Current Month: ${currentMonth.value}`);
  console.log(`Calendar for Current Month:`, calendar.value[currentMonth.value]);
  // Add months

  /*       for (let month = 0; month < 12; month++) {
          calendar.push({
            id: month,
            type: 'month',
            value: monthNames[month],
            selected: false,
          });
        } */
}

function dayIsAvailable(day) {
  for (const dateRange of unavailableDates.value) {
    let unavailableStart = dateRange[0];
    let unavailableEnd = new Date(unavailableStart);
    unavailableEnd.setDate(unavailableStart.getDate() + parseInt(dateRange[1], 10));

    if (isInRange(day, unavailableStart, unavailableEnd, true)) {
      console.log("Ayayaya nya~");
      return false;
    }
  }
  return true;
}

function selectDate(day) {
  console.log('yes');

  if (day.available) {
    return false;
  }

  day.selected = true;
  calendar.value[currentMonth.value].selected = true;

  let tempDate = new Date(currentYear.value, currentMonth.value, day.value);

  console.log("We're here");

  console.log(`tempDate: ${tempDate}`);
  console.log(`endDate: ${endDate.value}`);
  console.log(`selectedDate: ${selectedDate.value}`);
  console.log(tempDate < endDate.value);

  if (!selectedDate.value) {
    console.log("oui");
    selectedDate.value = tempDate;

  } else if (tempDate < selectedDate.value && !startDate.value) {
    startDate.value = tempDate;
    endDate.value = selectedDate.value;
  } else if (tempDate > selectedDate.value && !endDate.value) {
    endDate.value = tempDate;
    startDate.value = selectedDate.value;

  } else if (equalDates(tempDate, selectedDate.value) && !startDate.value && !endDate.value) {
    return false;

  } else if (startDate.value !== null && equalDates(tempDate, startDate.value)) {
    nextDate.value = 0;
  } else if (endDate.value !== null && equalDates(tempDate, endDate.value)) {
    nextDate.value = 1;

  } else if (nextDate.value == 0) {
    calendar.value[startDate.value.getMonth()].days[startDate.value.getDate() - 1].selected = false;
    if (tempDate < endDate.value) {
      startDate.value = tempDate;
    } else {
      startDate.value = endDate.value;
      endDate.value = tempDate;
    }
    nextDate.value = -1;

    if (startDate.value.getMonth() != endDate.value.getMonth()) {
      console.log("Aligato");
      validDate.value = isValidMonth(endDate.value, "end");
    }

    if (startDate.value.getMonth() == endDate.value.getMonth()) {
      console.log("Ohayo");
      validDate.value = true;
    }
  } else if (nextDate.value == 1) {
    calendar.value[endDate.value.getMonth()].days[endDate.value.getDate() - 1].selected = false;
    if (tempDate > startDate.value) {
      endDate.value = tempDate;
    } else {
      endDate.value = startDate.value;
      startDate.value = tempDate;
    }
    nextDate.value = -1;

    if (endDate.value.getMonth() != startDate.value.getMonth()) {
      console.log("Aligato");
      validDate.value = isValidMonth(startDate.value, "start");
    } else {
      console.log("Ohayo");
      validDate.value = true;
    }
  } else {
    let distanceL = daysBetween(startDate.value, tempDate);
    let distanceR = daysBetween(tempDate, endDate.value);

    if (distanceL < distanceR) {
      calendar.value[startDate.value.getMonth()].days[startDate.value.getDate() - 1].selected = false;
      startDate.value = tempDate;
      if (startDate.value.getMonth() != endDate.value.getMonth()) {
        console.log("Aligato");
        validDate.value = isValidMonth(endDate.value, "end");
      }
    } else {
      calendar.value[endDate.value.getMonth()].days[endDate.value.getDate() - 1].selected = false;
      endDate.value = tempDate;
      if (endDate.value.getMonth() != startDate.value.getMonth()) {
        console.log("Aligato");
        validDate.value = isValidMonth(startDate.value, "start");
      }
    }

    if (startDate.value.getMonth() == endDate.value.getMonth()) {
      console.log("Ohayo");
      validDate.value = true;
    }

    nextDate.value = -1;
  }

  if (!estInferieurA()) {
    validDate.value = false;
  }

  console.log(`tempDate: ${tempDate}`);
  console.log(`selectedDate: ${selectedDate.value}`);
  console.log(`startDate: ${startDate.value}`);
  console.log(`endDate: ${endDate.value}`);
  console.log(tempDate < startDate.value);
  console.log(`UwU ${nextDate.value}`);
  console.log('Checking: ', startDate.value.getMonth(), endDate.value.getMonth(), validDate.value);
}

// Fonction qui retourne vraie si la durée sélectionnée est plus courte que dureeMax et false sinon
function estInferieurA() {

if (startDate.value !== null && endDate.value !== null) {
  let distance = daysBetween(startDate.value, endDate.value);
  console.log(distance);
  if (distance >= dureeMax.value) {
    return false;              // Cas où durée > DureeMax
  }
}
return true;
}

function daysBetween(startDate, endDate) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  const timeDifference = endTimestamp - startTimestamp;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

function isValidMonth(date, direction) {
  console.log("hehehehehe", direction, calendar.value[date.value.getMonth()]);
  for (const day of calendar.value[date.value.getMonth()].days) {
    if (direction === "start") {
      console.log("start");
      if (day.value >= date.value.getDate()) {
        console.log("Yeah I'm grooving", day);
        if (day.available) {
          console.log("Oh this is false alright");
          console.log(day);
          return false;
        }
      }
    } else if (direction === "end") {
      console.log("end");
      if (day.value <= date.value.getDate()) {
        if (day.available) {
          return false;
        }
      }
    }
  }
  return true;
}

function resetSelection() {
  for (const month of calendar.value) {
    for (const day of month.days) {
      day.selected = false;
    }
  }
}

function incrementMonth() {
  currentMonth.value = (currentMonth.value + 1);
  if (currentMonth.value == 12) {
    currentYear.value += 1;
    currentMonth.value = 0;
  }
}

function equalDates(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function decrementMonth() {
  currentMonth.value = (currentMonth.value - 1);
  if (currentMonth.value == -1) {
    currentYear.value -= 1;
    currentMonth.value = 11;
  }
}

function bissextile(annee) {
  return (annee.value % 4 === 0 && annee.value % 100 !== 0) || (annee.value % 400 === 0);
}

function applyClassToRange(startDate, endDate, cssClass, unavailable) {
  console.log("UwU");
  const startTimestamp = startDate.value.getTime();
  const endTimestamp = endDate.value.getTime();

  console.log(calendar.value[currentMonth.value]);

  for (const day of calendar.value[currentMonth.value].days) {
    const currentTimestamp = new Date(currentYear.value, currentMonth.value, day.value).getTime();
    console.log(startTimestamp, currentTimestamp, endTimestamp);

    if (currentTimestamp > startTimestamp && currentTimestamp < endTimestamp) {
      day.customClass = cssClass;
      console.log("OwO rawr~");
      if (unavailable) {
        console.log("ayayayayayayay");
        day.available = true;
      }
    } else {
      day.customClass = null;
    }
  }
}

function highlightDateRange() {
  const startDate = new Date(2023, 10, 5);
  const endDate = new Date(2023, 10, 15);
  applyClassToRange(startDate, endDate, 'highlighted', false);
}

function dayIsAfter(day, date) {
  let dayDate = new Date(currentYear.value, currentMonth.value, day.value);
  let dateDate = new Date(date.value);

  dayDate.setHours(0, 0, 0, 0);
  dateDate.setHours(0, 0, 0, 0);

  return dayDate >= dateDate;
}

function isInRange(day, startDate, endDate, includeStartDay = false) {
  const copyStartDate = new Date(startDate);

  if (includeStartDay) {
    copyStartDate.setDate(copyStartDate.getDate() - 1);
  }

  const startDay = copyStartDate.getDate();
  const startMonth = copyStartDate.getMonth();
  const startYear = copyStartDate.getFullYear();
  const endDay = endDate.getDate();
  const endMonth = endDate.getMonth();
  const endYear = endDate.getFullYear();

  return (
    ((day.value > startDay && currentMonth.value === startMonth && currentYear.value === startYear) ||
      (currentMonth.value > startMonth && currentYear.value === startYear) ||
      (currentYear.value > startYear)) &&
    ((day.value < endDay && currentMonth.value === endMonth && currentYear.value === endYear) ||
      (currentMonth.value < endMonth && currentYear.value === endYear) ||
      (currentYear.value < endYear))
  );
}

function highlightRange(day) {
  if (!endDate.value) {
    return false;
  }

  let res = false;

  if (isInRange(day, startDate.value, endDate.value)) {
    if (dayIsAvailable(day)) {
      res = true;
    } else {
      console.log("Aligato");
      validDate.value = false;
    }
  }
  return res;
}

function disponible(day) {
  if (!dayIsAfter(day, currentDate) || !dayIsAvailable(day)) {
    day.available = true;
    return false;
  }
  day.available = false;
  return true;
}

function get_reservation(id) {
  console.log(id);
  axios.get("ressources/resa_hotel/resa_hotel_load.php").then((response) => {
    resa_chambres.value = response.data;
    get_dates(resa_chambres.value);
    generateCalendar();
  });
}

function get_dates(resa_chambres) {
  unavailableDates.value = [];
  for (const element of resa_chambres) {
    if (element["id_ch_hotel"] == chambre_actuelle.value["id_ch_hotel"]) {
      let date = [];
      date.push(stringToDate(element["date_debut"]));
      date.push(element["nb_j"]);
      unavailableDates.value.push(date);
    }
  }
  console.log("UwU");
  console.log(unavailableDates.value);
}

function stringToDate(dateString) {
  const dateArray = dateString.split('-');
  const convertedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  return convertedDate;
}

generateCalendar();
</script>


<template>
<div class=resa>
    <div class="year-name">{{ currentYear }}</div><br>
    <!-- Contrôles pour changer de mois et nom du mois-->
    <div class="controls">
        <button class="green" @click="decrementMonth">&lt;</button>
        <div v-if="calendar[currentMonth]" class="month-name">{{ calendar[currentMonth].id }}</div>
        <button class="green" @click="incrementMonth">&gt;</button>
    </div>
    <!-- Jours numérotés du calendrier-->
    <div class="calendar">
        <div v-if="calendar[currentMonth]" v-for="day in calendar[currentMonth].days" :key="day.id" @click="selectDate(day)" :class="{ selected: day.selected, highlighted: highlightRange(day) && validDate, invalid: highlightRange(day) && !validDate, available: disponible(day), unavailable: day.available }">
            <div class="day">{{ day.value }}</div>
        </div>
        <div v-else>
            Calendrier n'est pas défini ou vide
        </div>
    </div>
    <p v-if="!estInferieurA()" class="errorCalendar"> Veuillez choisir une durée de moins de 7 jours</p>
</div>
</template>

<style>

.year-name {
  font-size: 18px;
  color: #555;
  margin-bottom: 10px;
  text-align: center;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 100%;
}

.green {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
}

.green:hover{
  background-color: #327534;
  color: rgb(172, 254, 207);
}

.red{
  background-color: #e84040;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
}

.red:hover{
  background-color: #753632;
  color: rgb(254, 172, 172);
}

.month-name {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.unavailable {
  background-color: gray;
}

.available {
  cursor: pointer;
  transition: background-color 0.10s ease;
}

.available:hover {
  background-color: #4CAF50;
}

.selected {
  background-color: #66b268;
  color: white;
  scale: 1.1;
}

.highlighted {
  background-color: rgb(161, 194, 165);
  color: white;
}

.invalid {
  background-color: rgb(255, 0, 0);
  color: white;
}

.errorCalendar {
  color:#e84040;
}
</style>