const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Music",
    tableName: "music",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
            unique: true,
        },
        description: {
            type: "varchar",
        },
        url: {
            type: "varchar",
        },
        authorId: {
            type: 'int'
        }
    },
    relations: {
        author: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "authorId",
                referencedColumnName: "id",
            },
            onDelete: "CASCADE",
        },
    },
});
