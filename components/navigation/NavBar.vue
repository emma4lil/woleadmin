<template>
  <div class="mx-3" style="width: 100%;">
    <div class="d-flex justify-end">
      <nav-drop-down />
    </div>
  </div>
</template>

<script>
import NavDropDown from "../authentication/NavDropDown.vue";
export default {
  components: { NavDropDown },
  name: "NavDropdown",
};
</script>
