"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

// Utils
let log = require("../../utils/logger");
let config = require("../../utils/configHandler").getConfig();

/**
 * Invite command
 *
 * @param {*} client
 * @param {*} message
 */
exports.run = (client, message, args, callback) => {
    if (!args.length) return callback("Keine Rollen angegeben.");

    let roleNames = message.guild.roles
        .filter(element => String(element.name).toLowerCase() !== "@everyone")
        .map(element => element.name);

    if (!args.some(e => roleNames.includes(e))) return callback("Keine dieser Rollen existiert!");

    message.delete().catch(log.error);

    let validRoles = args.filter(value => roleNames.includes(value));

    validRoles.forEach(element => message.channel.send(element).then(msg => msg.react("✅")));

    callback();
};

exports.description = `Startet den assigner mit gegebenen rollen \nUsage: ${config.bot_settings.prefix.mod_prefix}assigner [rolle 1] [rolle 2] [...]`;
