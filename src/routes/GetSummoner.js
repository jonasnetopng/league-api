const routes = require('express').Router();
const axios = require('axios');
const dotenv = require('dotenv').config();

routes.get('/summoner/:summonerName/:region', async (req, res) => {
  const { summonerName, region } = req.params;
  const summonerIdResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`,
      { headers: { 'X-Riot-Token': process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(500).json({
        error: e.message,
        message: 'Summoner not found'
      });
    });

  const { id, profileIconId, summonerLevel, name } = summonerIdResponse.data;

  const responseRanked = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`,
      {
        headers: { 'X-Riot-Token': process.env.API_KEY },
      }
    )
    .catch((e) => {
      return res.status(500).json({
        error: e.message,
        message: 'Summoner not found'
      });

    });

  const solo = responseRanked.data.find(
    (queue) => queue.queueType === 'RANKED_SOLO_5x5'
  );

  const { tier, rank, wins, losses, queueType, leaguePoints } = solo || {};

  // checkif solo is undefined or doesnt exist
  if (solo === undefined) {
    return res.status(404).json({
      message: 'Summoner not found',
    });
  }



  function checkMiniSeries() {
    if (solo.miniSeries !== undefined) {
      const { losses, progress, target, wins } = solo.miniSeries;
      return (miniSeries = {
        losses,
        progress,
        target,
        wins,
      });
    }
  }

  const getLeagueVersion = async () => {
    let version = await axios.get(
      'https://ddragon.leagueoflegends.com/api/versions.json'
    );
    const res = version.data[0];
    return res;
  };

  let currentVersion = await getLeagueVersion();

  res.json({
    name,
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${profileIconId}.png`,
    summonerLevel,
    tier,
    rank,
    wins,
    losses,
    queueType,
    leaguePoints,
    md5: checkMiniSeries(),
    winRate: ((wins / (wins + losses)) * 100).toFixed(0),
  });
});

module.exports = (app) => app.use('/api', routes);
