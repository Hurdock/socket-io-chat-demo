<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg4>
        <v-card>
          <v-card-title class="purple darken-3 white--text">Chat Application</v-card-title>
          <v-card-text>
            <v-list style="height:300px" class="scroll-y">
              <v-list-tile two-line v-for="(msg, index) in messages" :key="index">
                <v-list-tile-content>
                  <v-list-tile-title>{{msg.author}}</v-list-tile-title>
                  <v-list-tile-sub-title>{{msg.text}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-divider></v-divider>
              </v-list-tile>
            </v-list>
            <v-text-field v-model="message" label="Chat message" hint="Press enter to send your message" @keyup.enter="sendMessage"></v-text-field>
          </v-card-text>
        </v-card>
        <v-divider class="my-4" />
        <v-card>
          <v-card-title class="purple darken-3 white--text">Your username</v-card-title>
          <v-card-text>
            <v-text-field flat v-model="username"></v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import io from 'socket.io-client';
export default {
  name: 'home',
  data: function() {
    return {
      username: 'John Doe',
      message: '',
      messages: [],
      socket: io('localhost:8081')
    }
  },
  methods: {
    sendMessage: function (){
      let self = this;
      this.socket.emit('sendMessage', {
        author: self.username,
        text: self.message
      });
      self.message = '';
    }
  },
  mounted() {
    this.socket.on('loadMessages', (data) => {
      this.messages = data.messages;
    });
    this.socket.on('receiveMessage', (data) => {
      console.log(data);
      this.messages.push(data);
    });
  }
}
</script>
