<script setup>
let db;
openDB("pension", "1").then((db) => {
  db = db;
});
</script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
