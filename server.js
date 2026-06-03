const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

const API_KEY = process.env.STEAM_API_KEY;

app.get("/", (req, res) => {
    res.send("Steam Comic Finder API Running");
});

// Resolve vanity URLs like /id/Maxlolhahaha2
app.get("/resolve/:vanity", async (req, res) => {
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
        res.status(500).json({ error: err.message });
    }
});

// Get owned games
app.get("/games/:steamid", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/",
            {
                params: {
                    key: API_KEY,
                    steamid: req.params.steamid,
                    include_appinfo: true
                }
            }
        );

        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
