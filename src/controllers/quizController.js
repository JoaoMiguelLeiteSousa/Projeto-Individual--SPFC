var QuizModel = require('../models/quizModel');

var QuizController = {

    salvarRespostas: async (req, res) => {
        console.log('=== BODY RECEBIDO ===', req.body)

        try {
            const { id_usuario, respostas } = req.body;

            if (!id_usuario) {
                return res.status(400).json({ erro: 'id_usuario não informado.' })
            }

            if (!respostas || respostas.length === 0) {
                return res.status(400).json({ erro: 'Nenhuma resposta recebida.' })
            }

            for (const r of respostas) {
                const result = await QuizModel.salvarResposta(
                    r.pergunta,
                    r.resposta_usuario,
                    r.resposta_correta,
                    r.pontuacao
                );
                await QuizModel.vincularUsuario(id_usuario, result.insertId);
            }

            console.log('Quiz salvo com sucesso!')
            res.json({ sucesso: true, mensagem: 'Quiz salvo com sucesso!' });

        } catch (err) {
            console.error('Erro ao salvar quiz:', err);
            res.status(500).json({ erro: 'Erro ao salvar respostas', detalhe: err.message });
        }
    },

    getDashboardData: async (req, res) => {
        try {
            const resultados    = await QuizModel.buscarResultadosPorUsuario();
            const estatisticas  = await QuizModel.buscarEstatisticasGerais();

            res.json({
                resultados,
                estatisticas: estatisticas[0]
            });
        } catch (err) {
            console.error('Erro ao buscar dashboard:', err);
            res.status(500).json({ erro: 'Erro ao carregar dashboard', detalhe: err.message });
        }
    },
    
    getRespostasPorUsuario: async (req, res) => {
    try {
        const resultado = await QuizModel.buscarRespostasPorUsuario(req.params.id_usuario);
        res.json(resultado);
    } catch (err) {
        console.error('Erro ao buscar respostas:', err);
        res.status(500).json({ erro: 'Erro ao buscar respostas', detalhe: err.message });
    }
},

getHistoricoUsuario: async (req, res) => {
    try {
        const resultado = await QuizModel.buscarHistoricoUsuario(req.params.id_usuario);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar histórico', detalhe: err.message });
    }
}
};

module.exports = QuizController;