const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizController');

router.post('/salvar', QuizController.salvarRespostas);
router.get('/dashboard-data', QuizController.getDashboardData);
router.get('/respostas/:id_usuario', QuizController.getRespostasPorUsuario);
router.get('/historico/:id_usuario', QuizController.getHistoricoUsuario);

module.exports = router;