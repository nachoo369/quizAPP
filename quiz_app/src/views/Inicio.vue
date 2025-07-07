<template>
  <div class="inicio-container">
    <h1>Bienvenido al Quiz</h1>
    <p class="subtitle">Selecciona una categoría y dificultad para comenzar.</p>

    <form @submit.prevent="empezarQuiz" class="quiz-form">
      <div class="form-group">
        <label for="categoria">Categoría:</label>
        <select v-model="categoria" id="categoria" class="custom-select">
          <option disabled value="">Selecciona una categoría</option>
          <option value="Linux">Linux</option>
          <option value="DevOps">DevOps</option>
          <option value="Docker">Docker</option>
          <option value="HTML">HTML</option>
          <option value="JavaScript">JavaScript</option>
        </select>
      </div>

      <div class="form-group">
        <label for="dificultad">Dificultad:</label>
        <select v-model="dificultad" id="dificultad" class="custom-select">
          <option disabled value="">Selecciona dificultad</option>
          <option value="Easy">Fácil</option>
          <option value="Medium">Media</option>
          <option value="Hard">Difícil</option>
        </select>
      </div>

      <button type="submit" class="start-button">Comenzar Quiz</button>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const categoria = ref('')
const dificultad = ref('')
const errorMessage = ref(null) // Estado para el mensaje de error
const router = useRouter()

function empezarQuiz() {
  errorMessage.value = null; // Limpiar mensaje de error previo

  if (categoria.value && dificultad.value) {
    router.push({
      path: '/quiz',
      query: {
        categoria: categoria.value,
        dificultad: dificultad.value
      }
    })
  } else {
    errorMessage.value = 'Por favor selecciona una categoría y una dificultad.';
  }
}
</script>

<style scoped>
.inicio-container {
  max-width: 600px;
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
  margin-bottom: 15px;
  font-size: 2.5em;
  font-weight: 700;
}

.subtitle {
  color: #555;
  font-size: 1.2em;
  margin-bottom: 30px;
}

.quiz-form {
  display: flex;
  flex-direction: column;
  gap: 25px; /* Espacio entre grupos de formulario */
}

.form-group {
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #34495e;
  font-size: 1.1em;
}

.custom-select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  background-color: #ecf0f1;
  font-size: 1em;
  color: #34495e;
  appearance: none; /* Elimina el estilo nativo del select */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2334495e%22%20d%3D%22M287%2C197.3L159.2%2C69.5c-3.1-3.1-8.2-3.1-11.3%2C0L1.7%2C197.3c-3.1%2C3.1-3.1%2C8.2%2C0%2C11.3l19.6%2C19.6c3.1%2C3.1%2C8.2%2C3.1%2C11.3%2C0l116.5-116.5l116.5%2C116.5c3.1%2C3.1%2C8.2%2C3.1%2C11.3%2C0l19.6-19.6C290.1%2C205.5%2C290.1%2C200.4%2C287%2C197.3z%22%2F%3E%3C%2Fsvg%3E'); /* Icono de flecha */
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 0.6em auto;
  cursor: pointer;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.custom-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
  outline: none;
}

.start-button {
  display: block;
  width: 100%;
  padding: 15px 25px;
  margin-top: 20px;
  background-color: #2ecc71; /* Verde brillante */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.3em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}

.start-button:hover {
  background-color: #27ae60; /* Verde más oscuro al pasar el ratón */
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(46, 204, 113, 0.4);
}

.start-button:active {
  transform: translateY(0);
  box-shadow: none;
}

.error-message {
  background-color: #ffe6e6;
  color: #dc3545;
  border: 1px solid #dc3545;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 20px;
  font-size: 0.95em;
  text-align: center;
}

/* Responsividad */
@media (max-width: 600px) {
  .inicio-container {
    margin: 20px;
    padding: 25px;
  }
  h1 {
    font-size: 2em;
  }
  .subtitle {
    font-size: 1em;
  }
}
</style>
