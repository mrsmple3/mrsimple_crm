<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p
          v-if="rates && rates['RUB']"
          v-for="cur in currency"
          :key="cur"
          class="currency-line"
        >
          <span>{{ $filters.currency(getCurrency(cur), cur) }}</span>
        </p>
        <p v-else class="currency-line">
          <span>{{ $filters.currency(base, "RUB") }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-bill",
  props: {
    rates: Object,
  },
  data() {
    return {
      currency: ["RUB", "USD", "EUR"],
    };
  },
  computed: {
    base() {
      if (this.rates && this.rates["EUR"] && this.rates["RUB"]) {
        return (
          this.$store.getters.info.bill /
          (this.rates["RUB"] / this.rates["EUR"])
        );
      }
      return this.$store.getters.info.bill;
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
