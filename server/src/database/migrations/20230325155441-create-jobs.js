"use strict";

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable("Jobs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            company: {
                allowNull: false,
                type: Sequelize.STRING
            },
            jobType: {
                allowNull: false,
                type: Sequelize.STRING
            },
            place: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        }),

    down: queryInterface => queryInterface.dropTable("Jobs")
};
