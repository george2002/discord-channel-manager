# discord-channel-manager
A discord bot than manages the creation of soccer match threads. The application checks to see if there are any games being played on the current date and if there are creates a match thread in discord under the specified guild. The polling rate is set to every three hours and is currently not configurable.

run by executing the command `node ./server.js`

## configurations
The application calls the [discord](https://discord.com/developers/docs/getting-started) and [api-football](https://www.api-football.com/) APIs. A configuration file must be created for both in order to call the APIs successfully

### discord configuration

The file name must be named `config-discord.json` and must be placed at the root of the application.

`
    "api-Key" : "XXXXXXXXXXXXXX",
    "guild-id" : "XXXXXXXXXXXXXX",
    "parent-category-id" : "XXXXXXXXXXXXXX"
}`

| field | description | required |
| --- | ----------- | --- |
| api-key | discord api key | true |
| guild-id | the id of the guild where the match threads will live | true |
| parent-category-id | the id of the category under which the match threads will appear | true |


### api-football configuration

The file name must be named `config-soccer-api.json` and must be placed at the root of the application.


`{
  "api-key": "XXXXXXXXXXXXXX"
}`

| field | description | required |
| --- | ----------- | --- |
| api-key | api-football api key | true |

## logging

The application logs to `./logs/info.log`. If a `logs` directory does not exist the application will create one automatically.

## currently supported leagues
| league name | country/international |
| ----------- | ----------- |
| Premier League | England |
