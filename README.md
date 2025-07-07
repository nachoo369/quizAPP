
# 📚 Quiz App - Vue.js

Una aplicación de preguntas y respuestas desarrollada como proyecto final del curso de desarrollo frontend. Permite seleccionar la categoría y dificultad de un quiz técnico y responde preguntas traídas desde una API externa.

---

## 🚀 Funcionalidades

- Selección de **categoría** y **nivel de dificultad**.
- Consumo dinámico de **[QuizAPI.io](https://quizapi.io/)**.
- Visualización de preguntas de opción múltiple.
- Cálculo automático de respuestas correctas.
- Navegación entre vistas utilizando **Vue Router**.
- Diseño simple y funcional.
- Resultado final con puntaje.

---

## 🛠️ Tecnologías utilizadas

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [QuizAPI](https://quizapi.io/)

---

## 📂 Estructura del proyecto

```
quiz_app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   │   ├── Inicio.vue
│   │   ├── Quiz.vue
│   │   └── Resultado.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

---

## ⚙️ Instalación y ejecución

1. Clona el repositorio o descomprime la carpeta:
   ```bash
   git clone https://github.com/nachoo369/Integracion_API.git
   cd quiz_app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Abre el navegador en:
   ```
   http://localhost:5173/
   ```

---

## 🔐 Configuración del token API

Para que el proyecto funcione correctamente, necesitas obtener una API Key desde:

👉 https://quizapi.io/

Luego, en el archivo `Quiz.vue`, reemplaza esta línea:

```js
headers: {
  'X-Api-Key': 'TU_API_KEY_AQUI'
}
```

> ⚠️ **Importante:** No compartas públicamente tu API key en GitHub.

---

## 📸 Capturas (opcional)

Puedes agregar imágenes del sistema funcionando si haces una demo o entrega visual.

---

## 🧠 Autor

Ignacio [Tu Apellido]  
Proyecto Final - Curso Frontend  
Julio 2025

---

## 📝 Licencia

Este proyecto es de uso educativo. No está destinado para fines comerciales.
