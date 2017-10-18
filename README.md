# Streamlabs Discord Notifier

### Requirements

- NodeJS (6+)

### Installation

1. `git clone https://github.com/technoblazed/streamlabs-discord-notifier`
2. `cd streamlabs-discord-notifier`
3. `npm install`
4. Create a Discord Application [here](https://discordapp.com/developers/applications/me). Follow the steps and convert the account to a Bot user.
5. Rename `config.js.example` to `config.js` and complete accordingly.   
  - `discord.botToken` - The Token provided from the Discord developer interfact.
  - `discord.postTo` - An array of stringified channel IDs where messages should be posted to.
  - `streamlabs.channel` - Channel to be displayed with each alert.
  - `streamlabs.token` - Streamlabs socket API token. You can either create an oauth system to get this, or just grab your account one from [here](https://streamlabs.com/dashboard#/apisettings) and visit the API Tokens menu. Use the Socket API token.
6. Invite the Discord bot to your server using the following link, replacing `<CLIENT_ID>` with the Client ID of your bot.  

 `https://discordapp.com/oauth2/authorize?client_id=<CLIENT_ID>&scope=bot&permissions=19456`  
7. `npm start`
