// frontend/src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Certifique-se que o NestJS está nessa porta
});