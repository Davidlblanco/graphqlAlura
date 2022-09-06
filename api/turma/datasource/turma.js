const { SQLDataSource } = require('datasource-sql');

class TurmasAPI extends SQLDataSource {
    constructor(dbConfig) {
        super(dbConfig)
    }

    async getTurmas() {
        return this.db
            .select('*')
            .from('turmas')
    }
    async getTurma(id) {
        const turma = await this.db
            .select('*')
            .from('turmas')
            .where({ id: Number(id) })
        return turma[0]
    }
}
module.exports = TurmasAPI