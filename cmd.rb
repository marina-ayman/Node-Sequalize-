# //when create project : npx sequelize-cli init
# npm install express sequelize mysql2 dotenv bcrypt jsonwebtoken cors



# // *** table
# //  npx sequelize-cli migration:generate --name create-resources-table
# // npx sequelize-cli db:migrate


# // *** seeder
# // npx sequelize-cli seed:generate --name seed-roles
# //  npx sequelize-cli db:seed --seed xxxx-seed-permissions.js
# // npx sequelize-cli db:seed:all


# // *** model
# // npx sequelize-cli model:generate --name Role


# // npx sequelize-cli db:migrate:undo
# // npx sequelize-cli db:migrate:undo:all
# npx sequelize-cli db:seed:undo --seed seed-roles.js


# npx sequelize-cli db:drop
# npx sequelize-cli db:create
# npx sequelize-cli db:migrate
# npx sequelize-cli db:seed:all 



# npx sequelize migration:generate --name add-parent-id-to-acl-resources
