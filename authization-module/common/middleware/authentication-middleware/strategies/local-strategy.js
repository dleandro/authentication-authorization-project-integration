
const
    LocalStrategy = require('passport-local').Strategy,
    passportUtils = require('../../../util/passport-utils'),
    { User } = require('../../../../resources/sequelize-model');
    module.exports = () => {

        return new LocalStrategy(
    async function (username, password, done) {
        const user = await passportUtils.findCorrespondingUser(username);
        if (!user){
            done(null, false, {message: 'User isnt in database'});
        }

        if (await passportUtils.isBlackListed(user.id)) {
            passportUtils.addNotification(user.id);
            done(null, false, {message: 'User is BlackListed'});
            return;
        }

        if (await User.correctPassword(password, user)) {
            done(null, user);
        }
    }
);
    

}