'use strict';

const _ = require('lodash');
const config = require('./config');
const channel = `#${config.streamlabs.channel}`;
const Discord = require('discord.js');
const discord = new Discord.Client();
const io = require('socket.io-client');
const streamlabs = io(`https://sockets.streamlabs.com?token=${config.streamlabs.token}`);

streamlabs.on('event', (eventData) => {
  if (!eventData.for || eventData.for === 'streamlabs' && eventData.type === 'donation') {
    sendDiscordMessage({
      embed: {
        color: 3447003,
        title: `Donation - ${channel}`,
        description: `Donation from \`${eventData.message[0].name}\` for \`${eventData.message[0].formatted_amount}\``,
        timestamp: new Date()
      }
    });
  }

  if (eventData.for === 'twitch_account') {
    switch(eventData.type) {
      case 'bits': {
        sendDiscordMessage({
          embed: {
            color: 1752220,
            title: `Bits - ${channel}`,
            description: `Bit donation from \`${eventData.message[0].name}\` for \`${eventData.message[0].amount}\` bits`,
            timestamp: new Date()
          }
        });
        break;
      }
      case 'follow': {
        sendDiscordMessage({
          embed: {
            color: 3066993,
            title: `Follow - ${channel}`,
            description: `\`${eventData.message[0].name}\` just followed`,
            timestamp: new Date()
          }
        });
        break;
      }
      case 'host': {
        sendDiscordMessage({
          embed: {
            color: 10181046,
            title: `Host - ${channel}`,
            description: `Host from \`${eventData.message[0].name}\` for \`${eventData.message[0].viewers}\` viewers`,
            timestamp: new Date()
          }
        });
        break;
      }
      case 'subscription': {
        let plan = 'Prime';

        switch (eventData.message[0].sub_plan) {
          case '3000': {
            plan = 'Tier 3';
            break;
          }
          case '2000': {
            plan = 'Tier 2';
            break;
          }
          case '1000': {
            plan = 'Tier 1';
            break;
          }
        }

        sendDiscordMessage({
          embed: {
            color: 15158332,
            title: `Subscription - ${channel}`,
            description: `Subscription from \`${eventData.message[0].name}\` for \`${eventData.message[0].months}\` month(s) | ${plan}`,
            timestamp: new Date()
          }
        });
        break;
      }
    }
  }
});

function sendDiscordMessage(message) {
  _.forEach(config.discord.postTo, function(channel) {
    const channelObject = discord.channels.find('id', channel);

    if (channelObject) {
      channelObject.send('', message);
    }
  });
}

discord.login(config.discord.botToken);
