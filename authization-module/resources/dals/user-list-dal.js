const UserList = require('../sequelize-model').UserList,
    List = require('../sequelize-model').List,
    User = require('../sequelize-model').User,
    tryCatch = require('../../common/util/functions-utils')

module.exports = {
    getByUserId: (id) => tryCatch(() => UserList.findByPk(id)),
    isUserBlackListed: (user_id) =>  tryCatch(() => User.findAll({ where: { id: user_id }, include: [List], raw: true })),
    create: (listId, userId, updater, active) => tryCatch(() => UserList.create({ ListId: listId, UserId: userId, active: active, updater: updater }))
}
