const routes = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

const championData = require('../championData');

routes.get('/maestry/:summonerName/:region', async (req, res) => {
  const { summonerName, region } = req.params;
  const summonerIdResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`,
      { headers: { 'X-Riot-Token': process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });
  const { id } = summonerIdResponse.data;

  const maestryResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process.env.API_KEY}`,
      {
        headers: { 'X-Riot-Token': process.env.API_KEY },
      }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });

  const getLeagueVersion = async () => {
    let version = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );
    const res = version.data[0];
    return res;
  };

  function getChampionName(championId) {
    for (let i = 0; i < championData.length; i++) {
      if (championData[i].id === championId) {
        return championData[i].name;
      }
    }
  }

  // Get champion image
  function getChampionImage(championId) {
    return `https://blitz-cdn.blitz.gg/blitz/lol/champion/${getChampionName(
      championId
    )}.webp`;
  }

  const maestryData = maestryResponse.data.map((champion) => {
    return {
      ChampionImage: getChampionImage(champion.championId),
      championName: getChampionName(champion.championId),
      championLevel: champion.championLevel,
      championPoints: champion.championPoints,
    };
  });

  res.json(maestryData);
});

routes.get('/maestrySummary/:summonerName/:region', async (req, res) => {
  const { summonerName, region } = req.params;
  const summonerIdResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`,
      { headers: { 'X-Riot-Token': process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });
  const { id } = summonerIdResponse.data;

  const maestryResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${process.env.API_KEY}`,
      {
        headers: { 'X-Riot-Token': process.env.API_KEY },
      }
    )
    .catch((e) => {
      return res.status(e).json(e);
    });

  function getChampionName(championId) {
    for (let i = 0; i < championData.length; i++) {
      if (championData[i].id === championId) {
        return championData[i].name;
      }
    }
  }

  const championPoints = maestryResponse.data;

  let totalChampionPoints = 0;
  for (let i = 0; i < maestryResponse.data.length; i++) {
    totalChampionPoints += maestryResponse.data[i].championPoints;
  }

  // filter chestEarned = false and return number of false

  function totalChampionLevel(championLevel) {
    return championPoints.filter(
      (champion) => champion.championLevel === championLevel
    ).length;
  }

  function chestErned(status) {
    return championPoints.filter((champion) => champion.chestGranted === status).length;
  }


  res.json({
    TotalM7: totalChampionLevel(7),
    TotalM6: totalChampionLevel(6),
    TotalM5: totalChampionLevel(5),
    numberOfChestsNotEarned: chestErned(false),
    numberOfChestsEarned: chestErned(true),
    totalPoints: totalChampionPoints,
  });
});

module.exports = (app) => app.use('/api', routes);
