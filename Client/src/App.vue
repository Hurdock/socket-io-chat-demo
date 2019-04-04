<template>
  <v-app id="app">
    <v-toolbar>
      <v-toolbar-title>Socket.io Chat - Example</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat target="_blank" href="https://socket.io/">Socket.io</v-btn>
        <v-btn flat target="_blank" href="https://vuetifyjs.com/">Vuetify</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

