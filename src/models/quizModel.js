var database = require('../database/config');

var QuizModel = {

    salvarResposta: (pergunta, resposta_usuario, resposta_correta, pontuacao) => {
        var instrucao = `
            INSERT INTO resposta_quiz (pergunta, resposta_usuario, resposta_correta, pontuacao)
            VALUES ('${pergunta}', '${resposta_usuario}', '${resposta_correta}', ${pontuacao})
        `;
        return database.executar(instrucao);
    },

    vincularUsuario: (id_usuario, id_resposta) => {
        var instrucao = `
            INSERT INTO usuario_resposta (id_usuario, id_resposta)
            VALUES (${id_usuario}, ${id_resposta})
        `;
        return database.executar(instrucao);
    },

    buscarResultadosPorUsuario: () => {
        var instrucao = `
            SELECT 
                u.id_usuario,
                u.nome,
                u.email,
                COUNT(rq.id_resposta)        AS total_respostas,
                SUM(rq.pontuacao)            AS pontuacao_total,
                ROUND(AVG(rq.pontuacao), 1)  AS media_pontuacao,
                MAX(ur.dt_resposta)          AS ultima_participacao
            FROM usuario u
            JOIN usuario_resposta ur ON ur.id_usuario = u.id_usuario
            JOIN resposta_quiz rq    ON rq.id_resposta = ur.id_resposta
            GROUP BY u.id_usuario
            ORDER BY pontuacao_total DESC
        `;
        return database.executar(instrucao);
    },

    buscarEstatisticasGerais: () => {
        var instrucao = `
            SELECT
                COUNT(DISTINCT ur.id_usuario) AS total_participantes,
                COUNT(rq.id_resposta)         AS total_respostas,
                ROUND(AVG(rq.pontuacao), 1)   AS media_geral,
                SUM(CASE WHEN rq.pontuacao > 0 THEN 1 ELSE 0 END) AS total_acertos
            FROM resposta_quiz rq
            JOIN usuario_resposta ur ON ur.id_resposta = rq.id_resposta
        `;
        return database.executar(instrucao);
    },

    buscarRespostasPorUsuario: (id_usuario) => {
        var instrucao = `
            SELECT rq.pergunta, rq.resposta_usuario, rq.resposta_correta, rq.pontuacao
            FROM resposta_quiz rq
            JOIN usuario_resposta ur ON ur.id_resposta = rq.id_resposta
            WHERE ur.id_usuario = ${id_usuario}
            ORDER BY ur.dt_resposta ASC
        `;
        return database.executar(instrucao);
    },

    buscarHistoricoUsuario: (id_usuario) => {
    var instrucao = `
        SELECT 
            rq.pergunta,
            rq.resposta_usuario,
            rq.resposta_correta,
            rq.pontuacao,
            ur.dt_resposta
        FROM resposta_quiz rq
        JOIN usuario_resposta ur ON ur.id_resposta = rq.id_resposta
        WHERE ur.id_usuario = ${id_usuario}
        ORDER BY ur.dt_resposta DESC
    `;
    return database.executar(instrucao);
}

};

module.exports = QuizModel;