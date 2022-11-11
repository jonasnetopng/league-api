### TODO LIST

- [x] Search Summoner
- [x] Get Summoner Mastery
- [ ] Get Summoner History

## Demo

`https://jonas-lol-api.herokuapp.com/`

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
  GET https://jonas-lol-api.herokuapp.com/api/summoner/Jax/BR1
```

| Parameter      | Type     | Description                                   |
| :------------- | :------- | :-------------------------------------------- |
| `summonerName` | `string` | **Required**. summoner name                   |
| `region`       | `string` | **Required**. summoner region (BR1, EUW, ...) |

#### Get summoner maestry

```http
  GET /api/maestry
  GET https://jonas-lol-api.herokuapp.com/api/maestry/Jax/BR1
```

| Parameter      | Type     | Description                                   |
| :------------- | :------- | :-------------------------------------------- |
| `summonerName` | `string` | **Required**. summoner name                   |
| `region`       | `string` | **Required**. summoner region (BR1, EUW, ...) |

#### Get summoner maestry maestrySummary

```http
  GET /api/maestrySummarys
  GET https://jonas-lol-api.herokuapp.com/api/maestrySummarys/Jax/BR1
```

| Parameter      | Type     | Description                                   |
| :------------- | :------- | :-------------------------------------------- |
| `summonerName` | `string` | **Required**. summoner name                   |
| `region`       | `string` | **Required**. summoner region (BR1, EUW, ...) |

## Authors

- [@jonasneto404](https://www.github.com/jonasnetopng)
