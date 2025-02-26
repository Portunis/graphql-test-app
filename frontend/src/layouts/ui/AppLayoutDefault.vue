<script setup lang="ts">


</script>

<template>
  <div>
  <div class="main">
    <div class="main__header">Шапка</div>
    <div class="main__content">
      <router-view></router-view>
    </div>
    <div class="main__footer">подвал</div>
  </div>
  </div>
</template>

<style scoped lang="scss">
$admin-header-height: 70px;
$admin-footer-height: 70px;
$admin-nav-width: 250px;

.main {
  --spacing: 20px;
  display: grid;
  height: calc(var(--vh, 1vh) * 100 - env(safe-area-inset-top) - env(safe-area-inset-bottom));

  grid-template-rows:     $admin-header-height 1fr $admin-footer-height;
  grid-template-columns:  $admin-nav-width 1fr;
  grid-template-areas:    "header header"
                          "main main"
                          "footer footer";

  &__header {
    display: flex;
    flex-basis: 100%;
    grid-area: header;
    position: relative;
  }
  &__nav {
    flex: 0 0;
    grid-area: nav;
  }
  &__content {
    flex: 1;
    grid-area: main;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

  }
  &__footer {
    display: flex;
    grid-area: footer;
    flex-basis: 100%;
    justify-content: space-between;
    align-items: center;
  }

  @media screen and (min-width: 48rem) {
    --spacing: 2rem;
  }
}
</style>
