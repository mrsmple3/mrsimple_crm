<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a @click.prevent="menu" href="#">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ currentDate }}</span>
      </div>
      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name ? name : "User Name" }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content" style="min-width: 10em">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import getCurrentDate from "@/functions/CurrentDate";

export default {
  name: "nav-bar",
  data() {
    return {
      currentDate: getCurrentDate(),
      interval: null,
      dropdown: null,
    };
  },
  computed: {
    name() {
      if (this.$store.getters.info) {
        return this.$store.getters.info.name;
      }
    },
  },
  methods: {
    menu() {
      this.$emit("menu");
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login?message=logout");
    },
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  created() {
    this.interval = setInterval(() => {
      this.currentDate = getCurrentDate("datetime");
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
};
</script>

<style lang="scss"></style>
