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

    <div class="loading" v-if="loading">Loading tasks....</div>


    <!-- task list-->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks">
        <TaskDetail :task="task" />
      </div>
    </div>


    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <div v-for="task in favs">
        <TaskDetail :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset state</button>

  </main>
</template>

<script>
import { ref } from 'vue'
import TaskForm from './components/TaskForm.vue'
import TaskDetail from './components/TaskDetails.vue'
import { useTaskStore } from './stores/TaskStore.js'
import { storeToRefs } from 'pinia'


export default {
  components: { TaskDetail, TaskForm },
  setup() {
    const taskStore = useTaskStore()

    const { tasks, loading, favs, totalCount, favCount } = storeToRefs(taskStore)

    taskStore.getTasks()

    const filter = ref('all')

    return { taskStore, filter, tasks, loading, favs, totalCount, favCount }
  }

}
</script>


