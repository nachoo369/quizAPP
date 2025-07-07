<template>
  <div :class="['app-wrapper', { 'dark-mode': isDarkMode }]">
    <div class="top-controls">
      <button @click="goBackToHome" class="control-button back-button" title="Volver al inicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
          <path d="M11.293 4.293a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 7.414V19a1 1 0 11-2 0V7.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6z" transform="rotate(-90 12 12)"/>
        </svg>
      </button>

      <div class="right-controls">
        <button @click="toggleDarkMode" class="control-button dark-mode-button" title="Modo Oscuro">
          <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
            <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.5 7.28 6 6 0 01-7.28-5.5A9.001 9.001 0 0012 3zm0 2a7 7 0 110 14V5z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
            <path d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM4.929 4.929a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm14.142 14.142a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM3 12a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm18 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM4.929 19.071a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM19.071 4.929a1 1 0 010-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707a1 1 0 01-1.414 0zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z"/>
          </svg>
          {{ isDarkMode ? 'Modo Claro' : 'Modo Oscuro' }}
        </button>
      </div>
    </div>

    <div class="quiz-container">
      <h1>Quiz de {{ categoria }} - {{ dificultad }}</h1>

      <div v-if="loading" class="loading-message">Cargando preguntas...</div>
      <div v-else-if="preguntas.length">
        <div v-for="(pregunta, index) in preguntas" :key="pregunta.id" class="question-card">
          <h3>Pregunta {{ index + 1 }}:</h3>
          <p class="question-text">
            {{ pregunta.question }}
          </p>
          
          <div class="answers-grid" v-if="pregunta.answers && getFilteredAnswers(pregunta).length > 0">
            <button
              v-for="([clave, respuesta]) in getFilteredAnswers(pregunta)"
              :key="clave"
              @click="seleccionarRespuesta(index, clave.replace('answer_', ''))"
              :class="{
                'answer-button': true,
                'selected-answer': respuestas[index] === clave.replace('answer_', '')
              }"
            >
              {{ respuesta }}
            </button>
          </div>
          <div v-else class="no-answers-message">
            <p>Esta pregunta no tiene opciones de respuesta válidas.</p>
          </div>
          <hr class="question-separator">
        </div>

        <button @click="verResultado" class="submit-button">Ver Resultado</button>
      </div>

      <div v-else class="no-questions-message">
        <p>No se encontraron preguntas.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const categoria = ref(route.query.categoria || 'Linux')
const dificultad = ref(route.query.dificultad || 'Easy')

const preguntas = ref([])
const respuestas = ref([])
const loading = ref(true)
const isDarkMode = ref(false); // Estado para controlar el modo oscuro

onMounted(async () => {
  try {
    const { data } = await axios.get('https://quizapi.io/api/v1/questions', {
      headers: {
        'X-Api-Key': 'bDJkOv2pCgIDiFCWTmGXrefFhIYo9iggsfbbXpJ7'
      },
      params: {
        category: categoria.value,
        difficulty: dificultad.value,
        limit: 5
      }
    })
    preguntas.value = data;
    respuestas.value = Array(data.length).fill(null);
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
  } finally {
    loading.value = false;
  }
});

// Función para obtener y filtrar las respuestas válidas de una pregunta
function getFilteredAnswers(pregunta) {
  const answersObj = pregunta.answers;
  if (!answersObj || typeof answersObj !== 'object') {
    return [];
  }
  
  return Object.entries(answersObj).filter(([clave, respuesta]) => 
    respuesta !== null && respuesta !== undefined && typeof respuesta === 'string' && respuesta.trim() !== ''
  );
}

function seleccionarRespuesta(preguntaIndex, claveRespuesta) {
  respuestas.value[preguntaIndex] = claveRespuesta;
}

function verResultado() {
  let correctas = 0;

  preguntas.value.forEach((pregunta, i) => {
    const respuestaUsuario = respuestas.value[i];
    if (!respuestaUsuario) return;

    const claveCorrecta = `answer_${respuestaUsuario}_correct`;
    const esCorrecta = pregunta.correct_answers && pregunta.correct_answers[claveCorrecta];

    if (esCorrecta === 'true') {
      correctas++;
    }
  });

  router.push({
    path: '/resultado',
    query: {
      puntaje: correctas,
      total: preguntas.value.length
    }
  });
}

// --- Funcionalidades Adicionales ---

// Botón de volver al inicio
function goBackToHome() {
  router.push('/');
}

// Botón de modo oscuro
function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  // Opcional: Si quieres que el modo oscuro persista entre sesiones, usa localStorage
  // localStorage.setItem('darkMode', isDarkMode.value);
}

// Opcional: Cargar preferencia de modo oscuro al iniciar
// onMounted(() => {
//   const savedDarkMode = localStorage.getItem('darkMode');
//   if (savedDarkMode === 'true') {
//     isDarkMode.value = true;
//   }
// });
</script>

<style scoped>
/* Estilos generales del contenedor de la aplicación y modo oscuro */
.app-wrapper {
  min-height: 100vh; /* Asegura que ocupe al menos toda la altura de la ventana */
  background-color: #f9f9f9; /* Fondo claro por defecto */
  transition: background-color 0.3s ease;
}

.app-wrapper.dark-mode {
  background-color: #1a1a1a; /* Fondo oscuro */
  color: #e0e0e0; /* Texto claro */
}

.app-wrapper.dark-mode .quiz-container {
  background-color: #2c2c2c;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

.app-wrapper.dark-mode h1,
.app-wrapper.dark-mode .question-card h3 {
  color: #f0f0f0;
}

.app-wrapper.dark-mode .question-text,
.app-wrapper.dark-mode .loading-message,
.app-wrapper.dark-mode .no-questions-message,
.app-wrapper.dark-mode .no-answers-message {
  color: #cccccc;
}

.app-wrapper.dark-mode .question-card {
  background-color: #3a3a3a;
  border-color: #555;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.app-wrapper.dark-mode .question-card h3 {
  border-bottom-color: #555;
}

.app-wrapper.dark-mode .answer-button {
  background-color: #4a4a4a;
  color: #e0e0e0;
  border-color: #666;
}

.app-wrapper.dark-mode .answer-button:hover {
  background-color: #5a5a5a;
  border-color: #888;
}

.app-wrapper.dark-mode .answer-button.selected-answer {
  background-color: #3498db; /* Mantiene el azul para la selección */
  color: white;
  border-color: #2980b9;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
}

.app-wrapper.dark-mode .question-separator {
  background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
}

/* Controles superiores */
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.right-controls {
  display: flex;
  gap: 10px; /* Espacio entre los botones de la derecha */
}

.control-button {
  background-color: #6c757d; /* Gris para botones de control */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.control-button .icon {
  width: 20px;
  height: 20px;
}

.control-button:hover {
  background-color: #5a6268;
  transform: translateY(-1px);
}

/* Estilos específicos del quiz container (ya existentes, solo ajustados) */
.quiz-container {
  max-width: 800px;
  margin: 20px auto 40px auto; /* Ajustado el margen superior para dejar espacio a los controles */
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.2em;
}

.loading-message, .no-questions-message, .no-answers-message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  padding: 20px;
}

.question-card {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.question-card h3 {
  color: #34495e;
  margin-top: 0;
  font-size: 1.5em;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.question-text {
  font-size: 1.1em;
  line-height: 1.6;
  margin-bottom: 25px;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.answer-button {
  background-color: #ecf0f1;
  color: #34495e;
  border: 1px solid #bdc3c7;
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  white-space: normal;
  height: auto;
}

.answer-button:hover {
  background-color: #dfe6e9;
  border-color: #95a5a6;
}

.answer-button.selected-answer {
  background-color: #3498db;
  color: white;
  border-color: #2980b9;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);
  transform: translateY(-2px);
}

.answer-button:active {
  transform: translateY(0);
  box-shadow: none;
}

.question-separator {
  border: 0;
  height: 1px;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
  margin: 30px 0;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 18px 25px;
  margin-top: 30px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.submit-button:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
}

.submit-button:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Responsividad básica */
@media (max-width: 768px) {
  .quiz-container {
    margin: 20px;
    padding: 20px;
  }
  h1 {
    font-size: 1.8em;
  }
  .question-card h3 {
    font-size: 1.3em;
  }
  .top-controls {
    flex-direction: column;
    gap: 10px;
    padding: 10px;
  }
  .right-controls {
    width: 100%;
    justify-content: space-around;
  }
  .control-button {
    flex: 1; /* Distribuye los botones de control uniformemente */
    padding: 10px 10px;
    font-size: 0.85em;
  }
}
</style>
