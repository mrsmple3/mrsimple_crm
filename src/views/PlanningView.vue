<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ $filters.currency(info.bill, "RUB") }}</h4>
    </div>
    <loader-component v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ $filters.currency(cat.spend, "RUB") }} из
          {{ $filters.currency(cat.limit, "RUB") }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currency from "@/filters/currency.filter";
export default {
  name: "planning",
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  computed: {
    ...mapGetters(["info"]),
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "Привышение на" : "Осталось"
      } ${currency(Math.abs(tooltipValue))}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });
    this.loading = false;
  },
};
</script>

<style></style>
