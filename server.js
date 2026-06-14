const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY = process.env.STEAM_API_KEY;

// Home route
app.get("/", (req, res) => {
res.send("Steam Comic Finder API Running");
});

// Resolve Steam vanity URL
app.get("/resolve/", async (req, res) => {

try {

    const response = await axios.get(
        "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/",
        {
            params: {
                key: API_KEY,
                vanityurl: req.params.vanity
            }
        }
    );

    res.json(response.data);

} catch (err) {

    console.error("Resolve Error:", err.message);

    res.status(500).json({
        error: err.message
    });

}

});

// Get owned games
app.get("/games/", async (req, res) => {

try {

    const response = await axios.get(
        "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/",
        {
            params: {
                key: API_KEY,
                steamid: req.params.steamid,
                include_appinfo: true,
                include_played_free_games: true
            }
        }
    );

    res.json(response.data);

} catch (err) {

    console.error("Games Error:", err.message);

    res.status(500).json({
        error: err.message
    });

}

});

// Get profile information
app.get("/profile/", async (req, res) => {

try {

    const response = await axios.get(
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
        {
            params: {
                key: API_KEY,
                steamids: req.params.steamid
            }
        }
    );

    res.json(response.data);

} catch (err) {

    console.error("Profile Error:");

    if (err.response) {
        console.error(err.response.data);
    } else {
        console.error(err.message);
    }

    res.status(500).json({
        error: "Failed to fetch profile."
    });

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log(
    `Steam Comic Finder API running on port ${PORT}`
);

});
