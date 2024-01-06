<template>
  <div class="mx-3">
    <div class="d-flex justify-end">
      <nav-drop-down />
      <div class="white--text mt-2 ml-2">
        <div>{{ $auth.user.firstName }}, {{ $auth.user.lastName }}</div>
        <div class="text-caption">{{ $auth.user.userRole }}</div>
        
      </div>
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
