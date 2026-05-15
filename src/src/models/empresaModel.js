var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM usuario WHERE id_usuario = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM usuario`;

  return database.executar(instrucaoSql);
}

function buscarPoremail(email) {
  var instrucaoSql = `SELECT * FROM usuario WHERE email = '${email}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(email, senha) {
  var instrucaoSql = `INSERT INTO usuario (email, senha) VALUES ('${email}', '${senha}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPoremail, buscarPorId, cadastrar, listar };
