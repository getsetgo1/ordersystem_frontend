<template>
  <h2>store test component3</h2>
  <p>count: {{ getCount }}</p>
  <v-btn color="red" @click="incrementCount">incrementCount</v-btn>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    ...mapGetters(["getCount"]),
  },
  methods: {
    incrementCount() {
      this.$store.dispatch("incrementCount");
    },
  },
};
</script>
