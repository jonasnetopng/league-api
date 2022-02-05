const routes = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

routes.get('/history/:summonerName/:region', async (req, res) => {
  let options = {
    region: 'VN',
    seasonId: 17,
    matchCount: 10,
    dateCount: 300,
  };
  const { summonerName, region } = req.params;
  const summonerIdResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`,
      { headers: { 'X-Riot-Token': process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });
  const { id, puuid } = summonerIdResponse.data;

  const payload = {
    puuid,
  };

  res.json(payload);
});

module.exports = (app) => app.use('/api', routes);
