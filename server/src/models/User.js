import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                username: Sequelize.STRING,
                password: Sequelize.STRING //When it is VIRTUAL it does not exist in the database
            },
            {
                sequelize,
                timestamps: true //If it's false do not add the attributes (updatedAt, createdAt).
                //paranoid: true, //If it's true, it does not allow deleting from the bank, but inserts column deletedAt. Timestamps need be true.
                //underscored: true, //If it's true, does not add camelcase for automatically generated attributes, so if we define updatedAt it will be created as updated_at.
                //freezeTableName: false, //If it's false, it will use the table name in the plural. Ex: Users
                //tableName: 'Users' //Define table name
            }
        );

        this.addHook("beforeSave", async user => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

export default User;