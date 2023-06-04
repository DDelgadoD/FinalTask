<template>
    <div class="header">
        <button class="btn btn-primary btn-previous" @click="goToPreviousMonth">
            {{ translations.labels[this.selectedLanguage].previous }}
        </button>
        <h2>{{ currentMonth }}</h2>
        <button class="btn btn-primary btn-next" @click="goToNextMonth">
            {{ translations.labels[this.selectedLanguage].next }}
        </button>
    </div>
    <table>
        <thead>
            <tr>
                <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(week, index) in weeks" :key="index">
                <td
                    v-for="day in week"
                    :key="day.date"
                    :class="{
                        sunday:
                            new Date(day.year, day.month, day.date).getDay() ===
                            0,
                        saturday:
                            new Date(day.year, day.month, day.date).getDay() ===
                            6,
                        'current-month': isCurrentMonth(day),
                        'current-day': isCurrentDay(day),
                    }"
                >
                <RouterLink :to="{name:'day', params:{ day: `${zeroPad(day.date, 2)}${zeroPad(day.month, 2)}${day.year}` }}" class="day">{{ day.date }}</RouterLink>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script setup>
import { ref, onMounted } from "vue";
import translations from "../translations/translations.json";

const currentMonth = ref("");
const daysOfWeek = ref([]);
const weeks = ref([]);
const currentDate = ref(new Date());
const selectedLanguage = ref("es");
const selectedDays = ref([]);
const firstDayOfWeek = ref("monday");

onMounted(() => {
    setCalendar();
});

function setCalendar() {
    const currentYear = currentDate.value.getFullYear();
    const currentMonthIndex = currentDate.value.getMonth();
    currentMonth.value = getMonthName(currentMonthIndex);

    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);
    const firstDayOfWeekIndex = (firstDayOfMonth.getDay() + 6) % 7;
    const lastDayOfWeekIndex = (lastDayOfMonth.getDay() + 6) % 7;

    let prevMonthDays = [];
    let currentMonthDays = [];
    let nextMonthDays = [];

    if (firstDayOfWeekIndex > 0) {
        const prevMonthLastDay = new Date(
            currentYear,
            currentMonthIndex,
            0
        ).getDate();
        for (let i = firstDayOfWeekIndex - 1; i >= 0; i--) {
            prevMonthDays.push({
                date: prevMonthLastDay - i,
                month: currentMonthIndex - 1,
                year: currentYear,
            });
        }
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        currentMonthDays.push({
            date: i,
            month: currentMonthIndex,
            year: currentYear,
        });
    }

    if (lastDayOfWeekIndex < 6) {
        for (let i = 1; i <= 6 - lastDayOfWeekIndex; i++) {
            nextMonthDays.push({
                date: i,
                month: currentMonthIndex + 1,
                year: currentYear,
            });
        }
    }

    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    const weeksCount = Math.ceil(allDays.length / 7);
    weeks.value = []
    for (let i = 0; i < weeksCount; i++) {
        const week = allDays.slice(i * 7, i * 7 + 7);
        
        weeks.value.push(week);
    }
    setLanguage();
}

function getMonthName(month) {
    return translations.months[selectedLanguage.value][month];
}

function setLanguage() {
    daysOfWeek.value =
        translations.days[selectedLanguage.value][firstDayOfWeek.value];
}

function isCurrentDay(day) {
    const currentDateObj = new Date();
    return (
        day.date === currentDateObj.getDate() &&
        day.month === currentDateObj.getMonth() &&
        day.year === currentDateObj.getFullYear()
    );
}

function isCurrentMonth(day) {
    return day.month === currentDate.value.getMonth();
}

function toggleDaySelection(day) {
    const index = selectedDays.value.findIndex(
        (selectedDay) =>
            selectedDay.date === day.date &&
            selectedDay.month === day.month &&
            selectedDay.year === day.year
    );
    if (index !== -1) {
        selectedDays.value.splice(index, 1);
    } else {
        selectedDays.value.push({ ...day });
    }
}

function isDaySelected(day) {
    const selectedDay = selectedDays.value.find(
        (selectedDay) =>
            selectedDay.date === day.date &&
            selectedDay.month === day.month &&
            selectedDay.year === day.year
    );
    return selectedDay;
}

function goToPreviousMonth() {
    currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1,
        1
    );
    setCalendar();
}

function goToNextMonth() {
    currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1,
        1
    );
    setCalendar();
}

const zeroPad = (num, places) => String(num).padStart(places, '0')
</script>

<style scoped>

h2{
    text-transform: capitalize;
}
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

table {
    margin: 0 auto;
    background-color: white;
    color:black;
}

th {
    background-color: black;
    color: white;
}

th,
td {
    padding: 10px;
    border: 1px solid #ccc;
}

.current-month {
    font-weight: bolder;
}

.selected-day {
    background-color: #8bc34a;
}

.sunday,
.saturday {
    background-color: #f5acac;
}

.selection-info {
    margin-top: 10px;
}

.current-day {
    background: green;
}


.day{
    color:black;
    text-decoration: none;
}

.btn-previous{
    margin-right: 10%;
}

.btn-next{
    margin-left: 10%;
}
</style>
