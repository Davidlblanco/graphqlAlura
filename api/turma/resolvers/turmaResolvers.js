
const turmaResolvers = {
    Query: {
        turmas: (_, __, { dataSources }) => dataSources.TurmasAPI.getTurmas(),
        turma: (_, { id }, { dataSources }) => dataSources.TurmasAPI.getTurma(id)
    }
}
module.exports = turmaResolvers