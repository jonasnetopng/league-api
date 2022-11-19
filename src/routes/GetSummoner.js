const routes = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv").config();

routes.get("/summoner/:summonerName/:region", async (req, res) => {
  const { summonerName, region } = req.params;
  const summonerIdResponse = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      { headers: { "X-Riot-Token": process.env.API_KEY } }
    )
    .catch((e) => {
      return res.status(500).json({
        error: e.message,
        message: "Summoner not found",
      });
    });
  // catch error if summonerIdResponse is not found
  if (summonerIdResponse.statusCode === 500) {
    return "Summoner not found";
  }

  const { id, profileIconId, summonerLevel, name } = summonerIdResponse.data;

  const responseRanked = await axios
    .get(
      `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`,
      {
        headers: { "X-Riot-Token": process.env.API_KEY },
      }
    )
    .catch((e) => {
      return res.status(500).json({
        error: e.message,
        message: "Summoner not found",
      });
    });

  const solo = responseRanked.data.find(
    (queue) => queue.queueType === "RANKED_SOLO_5x5"
  );
  const flex = responseRanked.data.find(
    (queue) => queue.queueType === "RANKED_FLEX_SR"
  );

  // if (solo === undefined) {
  //   return res.status(404).json({
  //     message: "Summoner not found",
  //   });
  // }

  const { tier, rank, wins, losses, queueType, leaguePoints } = solo || {
    tier: "No Tier",
  };

  const getLeagueVersion = async () => {
    let version = await axios.get(
      "https://ddragon.leagueoflegends.com/api/versions.json"
    );
    const res = version.data[0];
    return res;
  };

  let currentVersion = await getLeagueVersion();

  res.json({
    id,
    name,
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/profileicon/${profileIconId}.png`,
    summonerLevel,
    soloqueue: {
      tier,
      rank,
      wins,
      losses,
      queueType,
      leaguePoints,
      winRate: ((wins / (wins + losses)) * 100).toFixed(0),
    },
    // flexqueue: {
    //   tier: flex.tier,
    //   rank: flex.rank,
    //   win: flex.win,
    //   losses: flex.losses,
    //   leaguePoints: flex.leaguePoints,
    // },
  });
});

module.exports = (app) => app.use("/api", routes);
