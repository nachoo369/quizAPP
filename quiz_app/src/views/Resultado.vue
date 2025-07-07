<template>
  <div class="resultado-container">
    <h1>Resultados del Quiz</h1>

    <div v-if="puntaje !== null && total !== null">
      <p class="score-text">
        Has respondido correctamente {{ puntaje }} de {{ total }} preguntas.
      </p>
      <p class="percentage-text">Tu puntaje es del {{ porcentaje.toFixed(0) }}%</p>

      <div class="progress-bar-container">
        <div class="progress-bar-fill" :style="{ width: porcentaje + '%' }">
          <span class="progress-text">{{ porcentaje.toFixed(0) }}%</span>
        </div>
      </div>

      <div class="feedback-message">
        <p v-if="porcentaje >= 80" class="excellent">
          🎉 ¡Excelente trabajo! Demuestras un gran conocimiento en esta área.
        </p>
        <p v-else-if="porcentaje >= 50" class="good">
          👍 ¡Buen esfuerzo! Tienes una base sólida, sigue practicando para mejorar.
        </p>
        <p v-else class="needs-improvement">
          💡 Puedes mejorar. ¡No te desanimes! Repasa los temas y vuelve a intentarlo.
        </p>
      </div>

      <button @click="irAInicio" class="retry-button">Elegir otro quiz.</button>
      <button @click="irAQuiz" class="back-to-quiz-button">Volver a intentarlo</button>
    </div>
    <div v-else class="no-results-message">
      <p>No se encontraron resultados para mostrar. Por favor, realiza un quiz primero.</p>
      <button @click="irAInicio" class="retry-button">Ir al Inicio</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const puntaje = ref(null);
const total = ref(null);

const porcentaje = computed(() => {
  if (total.value > 0) {
    return (puntaje.value / total.value) * 100;
  }
  return 0;
});

onMounted(() => {
  puntaje.value = Number(route.query.puntaje);
  total.value = Number(route.query.total);
});

function irAInicio() {
  router.push('/');
}

function irAQuiz() {
  router.push('/quiz'); 
}
</script>

<style scoped>
.resultado-container {
  max-width: 700px;
  margin: 40px auto;
  padding: 35px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 2.5em;
  font-weight: 700;
}

.score-text {
  font-size: 1.4em;
  color: #555;
  margin-bottom: 10px;
}

.percentage-text {
  font-size: 2.8em;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 30px;
}

.progress-bar-container {
  width: 90%;
  height: 35px;
  background-color: #e0e0e0;
  border-radius: 20px;
  margin: 25px auto;
  overflow: hidden;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(to right, #3498db, #2ecc71);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.1em;
  transition: width 1s ease-in-out;
  min-width: 0%;
}

.progress-text {
  mix-blend-mode: difference;
  padding: 0 10px;
}

.feedback-message {
  margin-top: 30px;
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 1.1em;
  font-weight: 500;
}

.feedback-message p {
  margin: 0;
}

.excellent {
  background-color: #e6ffe6;
  color: #28a745;
  border: 1px solid #28a745;
}

.good {
  background-color: #fff8e6;
  color: #ffc107;
  border: 1px solid #ffc107;
}

.needs-improvement {
  background-color: #ffe6e6;
  color: #dc3545;
  border: 1px solid #dc3545;
}

.retry-button, .back-to-quiz-button {
  padding: 15px 30px;
  margin: 20px 10px 0;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.retry-button {
  background-color: #3498db;
  color: white;
}

.retry-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.back-to-quiz-button {
  background-color: #95a5a6;
  color: white;
}

.back-to-quiz-button:hover {
  background-color: #7f8c8d;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.no-results-message {
  font-size: 1.2em;
  color: #777;
  padding: 20px;
}

@media (max-width: 600px) {
  .resultado-container {
    margin: 20px;
    padding: 25px;
  }
  h1 {
    font-size: 2em;
  }
  .percentage-text {
    font-size: 2.2em;
  }
  .retry-button, .back-to-quiz-button {
    width: calc(100% - 20px);
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
