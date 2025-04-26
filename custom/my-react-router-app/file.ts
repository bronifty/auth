import config from "./config.json" with { type: "json" };


console.log("config.json", config, `\nconfig in grave quotes: ${JSON.stringify(config, null, 2)};`, `\nconfig.mode: ${config.mode};`);
