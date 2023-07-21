#start database
npm run start:dev:db

#create api
npm i -g @nestjs/cli
nest new shop-data

#connecting nestjs to database
npm install --save @nestjs/typeorm typeorm pg

#Configuration management
npm install --save @nestjs/config

#creating the structure of the entity
nest generate resource players 
nest g resource merchant

#validator
npm install --save class-validator class-transformer

#Creating a migration
npm run migration:generate -- db/migrations/AddMerchant
npm run typeorm -- migration:run

#documenting with OpenAPI
npm install --save @nestjs/swagger swagger-ui-express

#run
npm run start:dev


#build container
docker buildx build --platform linux/amd64,linux/arm64 -t pkhamdee/shop-api:1.0 .
docker buildx build --load -t pkhamdee/shop-api:1.0  .