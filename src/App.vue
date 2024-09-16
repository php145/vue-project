<script setup>
import { openDB } from "./storage/IndexedDB.js";

openDB("pension", "1").then((db) => {
  db.close();
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
