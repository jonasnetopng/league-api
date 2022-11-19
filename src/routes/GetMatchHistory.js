const routes = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv").config();

routes.get("/history/:summonerName/:region", async (req, res) => {
  let options = {
    region: "VN",
    seasonId: 17,
    matchCount: 10,
    dateCount: 300,
  };
  const { summonerName, region } = req.params;
  const summonerIdResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      { headers: { "X-Riot-Token": process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });

  const { puuid } = summonerIdResponse.data;

  const matchesByPuuid = await axios
    .get(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=5`,
      { headers: { "X-Riot-Token": process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });

  const gamesList = matchesByPuuid.data;
  const gameData = {};

  for (const game of gamesList) {
    console.log(game);
    gameData[game] = await axios(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${game}`,
      { headers: { "X-Riot-Token": process.env.API_KEY } }
    );
  }
});

module.exports = (app) => app.use("/api", routes);
