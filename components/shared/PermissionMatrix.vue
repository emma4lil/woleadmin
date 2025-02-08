<template>
  <v-container>
    <v-card>
      <v-card-title>Permission Matrix</v-card-title>
      <v-card-subtitle>Manage permissions for user roles</v-card-subtitle>
      <v-card-text>
        <!-- Header Row -->
        <v-row class="header-row">
          <v-col cols="3"><strong>Feature</strong></v-col>
          <v-col
            v-for="role in roles"
            :key="role"
            class="text-center"
            cols="3"
          >
            <strong>{{ role }}</strong>
          </v-col>
        </v-row>

        <!-- Feature Rows -->
        <v-data-iterator
          :items="features"
          :items-per-page="5"
          v-slot="{ items }"
        >
          <v-row
            v-for="(feature, rowIndex) in items"
            :key="feature.name"
            class="feature-row"
          >
            <v-col cols="3">
              <strong>{{ feature.name }}</strong>
              <div class="description">{{ feature.description }}</div>
            </v-col>

            <!-- Render Toggles Dynamically Based on Feature Permissions -->
            <v-col
              v-for="(role, colIndex) in roles"
              :key="role"
              class="text-center"
              cols="3"
            >
              <template v-if="feature.permissions.includes(role)">
                <v-switch
                  v-model="permissions[feature.name][role]"
                  color="primary"
                  hide-details
                ></v-switch>
              </template>
              <template v-else>
                <div class="no-permission">N/A</div>
              </template>
            </v-col>
          </v-row>
        </v-data-iterator>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions>
        <v-btn @click="savePermissions" color="success" elevation="2">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PermissionMatrix",
  data() {
    return {
      roles: ["Admin", "Editor", "Viewer"], // User roles
      features: [
        {
          name: "Create Post",
          description: "Allows creating new posts.",
          permissions: ["Admin", "Editor"], // Only Admin and Editor can modify
        },
        {
          name: "Read Post",
          description: "Allows viewing posts.",
          permissions: ["Admin", "Editor", "Viewer"], // All roles can modify
        },
        {
          name: "Delete Post",
          description: "Allows deleting posts.",
          permissions: ["Admin"], // Only Admin can modify
        },
        {
          name: "Update Profile",
          description: "Allows updating user profiles.",
          permissions: ["Admin", "Editor"], // Admin and Editor can modify
        },
      ],
      permissions: {}, // Permissions state
    };
  },
  created() {
    this.initializePermissions();
  },
  methods: {
    // Initialize permissions dynamically based on features and roles
    initializePermissions() {
      this.permissions = this.features.reduce((acc, feature) => {
        acc[feature.name] = feature.permissions.reduce((permAcc, role) => {
          permAcc[role] = false; // Default all permissions to false
          return permAcc;
        }, {});
        return acc;
      }, {});
    },
    // Save permissions
    savePermissions() {
      console.log("Saved Permissions:", this.permissions);
      alert("Permissions saved!");
    },
  },
};
</script>
