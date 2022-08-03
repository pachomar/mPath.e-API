# Sequelize - Run these commands in the sequelize folder
- Run migrations: npx sequelize-cli db:migrate
- Undo migrations: npx sequelize-cli db:migrate:undo:all
- Run seeders: npx sequelize-cli db:seed:all

# Web-API - Run these commands in the root folder
- Start API: npm run start:dev

# AWS Lambda - Run these commands in the root folder
- Change AWS credentials: aws configure
- Create handler: claudia create --handler lambda.handler --deploy-proxy-api --region us-east-2
- Deploy changes: claudia update
- Config changes (timeout): aws lambda update-function-configuration --function-name cvmf-api --timeout 10 