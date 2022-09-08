const { SQLDataSource } = require('datasource-sql')
const DataLoader = require('dataloader')
class TurmasAPI extends SQLDataSource {
  constructor(dbConfig) {
    super(dbConfig)
    this.Resposta = {
      mensagem: ""
    }
  }

  async getTurmas() {
    return this.db
      .select('*')
      .from('turmas')
  }

  turmasLoader = new DataLoader(this.getTurma.bind(this))
  async getTurma(ids) {
    const turmas = await this.db
      .select('*')
      .from('turmas')
      .whereIn('id', ids)
      .select()
    const arrayFinal = ids.map(id => turmas.filter(turma => turma.id === id)[0])
    return arrayFinal
  }



  async incluiTurma(novaTurma) {
    const novaTurmaId = await this.db
      .insert(novaTurma)
      .returning('id')
      .into('turmas')

    const turmaInserida = await this.getTurma(novaTurmaId[0])
    return ({ ...turmaInserida })
  }

  async atualizaTurma(novosDados) {
    await this.db
      .update({ ...novosDados.turma })
      .where({ id: Number(novosDados.id) })
      .into('turmas')

    const turmaAtualizada = await this.getTurma(novosDados.id)
    return ({
      ...turmaAtualizada
    })
  }

  async deletaTurma(id) {
    await this.db('turmas')
      .where({ id: id })
      .del()

    this.Resposta.mensagem = "registro deletado"
    return this.Resposta
  }

}

module.exports = TurmasAPI