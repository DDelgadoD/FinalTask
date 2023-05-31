import { defineStore } from "pinia";
import moment from "moment";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    loadedSupa: false,
    tasks: [],
  }),

  actions: {
    init(tasks) {
      this.tasks = [...tasks];
      this.loadedSupa = true;
    },

    getTasks() {
      return this.tasks;
    },

    getDays() {
      return this.days;
    },

    getTask(taskId) {
      const task = this.tasks.filter((x) => x.id == taskId);
      return task[0];
    },

    deleteTasks() {
      this.tasks = [];
      this.loadedSupa = false;
    },

    deleteTask(TaskId) {
      const index = this.tasks
        .map((x) => {
          return x.id;
        })
        .indexOf(TaskId);

      console.log(index);
      this.tasks.splice(index, 1);
      this.init(this.getTasks());
    },

    newTask(task) {
      console.log("pushing", task);
      this.tasks.push(task);
      this.init(this.getTasks());
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "tasks",
        storage: localStorage,
      },
    ],
  },
});
