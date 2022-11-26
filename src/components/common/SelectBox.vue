<template>
  <select class="form-control"
          :value="modelValue"
          @input="onChanged($event.target.value);">
    <option v-for="obj in valueList"
          :key="obj.value"
          :value="obj.value">{{obj.text}}</option>
  </select>
</template>

<script>
export default {
    props: {
      modelValue: String,
      valueList: Array
    },
    methods: {
      onChanged: function(value) {
        this.$emit("update:modelValue", value);
      }
    },
    mounted: function() {
    },
    data: function() {
        return {
        };
    }
}
</script>

<style>

</style>