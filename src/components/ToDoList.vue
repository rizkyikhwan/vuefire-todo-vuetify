<template>
  <v-container style="max-width: 500px" class="card">
    <v-text-field
      v-model="newTask"
      label="What are you working on?"
      filled
      hint="Example: Playing Basketball"
      color="teal"
      @keydown.enter="addItem"
    >
      <template v-slot:append>
        <v-fade-transition>
          <v-icon v-if="newTask" @click="addItem" color="blue">
            mdi-plus
          </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h4 class="text-h4 success--text pl-4">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h4>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        Remaining: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        Completed: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :value="progress"
        color="teal"
        class="mr-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-slide-y-transition mode="out-in" appear>
      <v-card v-if="tasks.length > 0">
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${task.text}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="(task.done && 'success') || 'primary'"
              >
                <template v-slot:label>
                  <div :class="task.done && 'success--text'" class="ml-4">
                    {{ task.text }}
                  </div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-reverse-transition>
              <v-icon v-if="task.done" color="success"> mdi-check </v-icon>
            </v-scroll-x-reverse-transition>

            <v-fade-transition>
              <v-btn
                v-if="task.done"
                icon
                color="red"
                @click="deleteTodo(task.id)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-fade-transition>
          </v-list-item>
        </template>
      </v-card>
      <v-card v-else>
        <v-card-text>
          <div style="text-align: center">Woohoo, nothing left todo!</div>
        </v-card-text>
      </v-card>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { db } from "../firebase/db.js";

export default {
  data() {
    return {
      tasks: [],
      newTask: null,
    };
  },
  methods: {
    async addItem() {
      if (this.newTask) {
        document.querySelector("input").disabled = true
        document.querySelector("button").disabled = true
        setTimeout(() => {
          document.querySelector("input").disabled = false
          document.querySelector("button").disabled = false
        }, 1000)
        const timestamp = await Date.now();
        await db
          .collection("tasks")
          .doc()
          .set({ text: this.newTask, date: timestamp })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        this.newTask = null;
      } else {
        this.$emit("badValue");
      }
    },
    deleteTodo(id) {
      db.collection("tasks").doc(id).delete();
    },
  },
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },
  firestore: {
    tasks: db.collection("tasks").orderBy("date"),
  },
};
</script>

<style>
.card {
  margin-top: 100px;
  background-color: rgba(253, 253, 253, 0.5);
  border-radius: 20px 0 20px 0;
  box-shadow: 3px 3px 3px #555;
}
</style>