<template>
  <CalendarView />
</template>

<script>
import CalendarView from "../common/CalendarView.vue";
export default {
    name: "Calendar",
    components: {
      CalendarView
    },
    data: function() {
        return {
          menuName: "캘린더뷰"
        };
    },
    methods: {

    }
};
</script>

<style>
</style>