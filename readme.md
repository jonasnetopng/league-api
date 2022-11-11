### TODO LIST
- [x] Search Summoner
- [X] Get Summoner Mastery
- [ ] Get Summoner History

## Installation

Install league-api with npm

```bash
  cd league-api
  npm install
  npm run dev || npm run start
```

```
OPEN: localhost:3333
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, or edit .env_dev.

`API_KEY`

## API Reference

#### Get summoner
```http
  GET /api/summoner
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `summonerName` | `string` | **Required**. summoner name  |
| `region` | `string` | **Required**. summoner region (BR1, EUW, ...)  |

#### Get summoner maestry
```http
  GET /api/maestry
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `summonerName` | `string` | **Required**. summoner name  |
| `region` | `string` | **Required**. summoner region (BR1, EUW, ...)  |

#### Get summoner maestry maestrySummary
```http
  GET /api/maestrySummarys
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `summonerName` | `string` | **Required**. summoner name  |
| `region` | `string` | **Required**. summoner region (BR1, EUW, ...)  |


## Authors

- [@jonasneto404](https://www.github.com/jonasnetopng)

