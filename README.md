# Public part

## Install
1. git pull origin master
2. npm ci
3. docker-compose up
4. create environments from EXAMPLE_ENV.env
5. npx sequelize db:migrate


## Routes
1. GET {HOSTNAME}/subscriptions       - list of subscriptions
2. GET {HOSTNAME}/subscriptions/:id   - get single subscription by id
3. GET {HOSTNAME}/subscriptions/find  - find single subscription by email
4. POST {HOSTNAME}/subscriptions      - create subscription
5. DEL {HOSTNAME}/subscriptions       - remove subscription

