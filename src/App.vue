<template>
  <main>
    <!--heading-->
    <header>
      <img src="./assets/logo.svg" alt="logo">
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>


    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favs'">Favorite tasks</button>
    </nav>

    <div class="loading" v-if="taskStore.loading">Loading tasks....</div>


    <!-- task list-->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <div v-for="task in taskStore.tasks">
        <TaskDetail :task="task" />
      </div>
    </div>


    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <div v-for="task in taskStore.favs">
        <TaskDetail :task="task" />
      </div>
    </div>



  </main>
</template>

<script>
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore.js'


export default {
  components: { TaskDetail, TaskForm },
  setup() {
    const taskStore = useTaskStore()

    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore, filter }
  }

}
</script>


