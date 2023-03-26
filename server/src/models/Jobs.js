import Sequelize, { Model } from "sequelize";

class Jobs extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                username: Sequelize.STRING,
                password: Sequelize.STRING
            },
            {
                sequelize,
                timestamps: true
            }
        );
        return this;
    }
}

export default Jobs;
