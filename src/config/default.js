import LastFmPlugin from 'plugins/LastFmPlugin';
import HelpPlugin from 'plugins/HelpPlugin';
import UrlTitlePlugin from 'plugins/UrlTitlePlugin';
import AutoRejoinPlugin from 'plugins/AutoRejoinPlugin';
import WeatherUndergroundPlugin from 'plugins/WeatherUndergroundPlugin';
import KarmaPolicePlugin from 'plugins/KarmaPolicePlugin.js';
import KarmaPlugin from 'plugins/KarmaPlugin.js';
import GooglePlugin from 'plugins/GooglePlugin.js';
import WolframAlphaPlugin from 'plugins/WolframAlphaPlugin';
import ReminderPlugin from 'plugins/ReminderPlugin';
import DiceRollerPlugin from 'plugins/DiceRollerPlugin';
import HistoryPlugin from 'plugins/HistoryPlugin';
import SedPlugin from 'plugins/SedPlugin';

let lastFmOpts = {
    api_key: '467b4068bb8b4774f972e95e8bd2d81f',
    secret: 'a62a330dc620c528440cf9e4c6a30261',
    templates: {
        'np': "%user% is currently listening to %title% by %artist%.",
        'not_np': '%user% is currently not listening to anything.'
    }
};

let weatherOpts = {
    api_key: '0347d23efc0576af'
};

let googlOpts = {
    api_key: 'AIzaSyC-7hr4UZGOnM3E4mPsEpFC6N3ptEYhRr0'
};

let wolframAlphaOpts = {
    api_key: 'A4EUG7-AQUAL58QGQ'
};

/*
 ------------
 Core plugins
 ------------
 Any plugin here is considered 'required' for the bot to function stably.
 Many other plugins rely on the plugins listed here.  Don't edit this list.
 */
let corePlugins = [
    new HelpPlugin(),
    new AutoRejoinPlugin(1000),
    new HistoryPlugin()
];

/*
 -------
 Plugins
 -------
 A list of plugins for the bot.

 For requirePlugin(): they are loaded in the order they're specified here.
 */

let plugins = [
    new KarmaPolicePlugin(),
    new GooglePlugin(googlOpts.api_key),
    new LastFmPlugin(lastFmOpts.api_key, lastFmOpts.secret, lastFmOpts.templates),
    new WeatherUndergroundPlugin(weatherOpts.api_key),
    new WolframAlphaPlugin(wolframAlphaOpts.api_key),
    new UrlTitlePlugin(2000),
    new KarmaPlugin(),
    new ReminderPlugin(),
    new SedPlugin(),
    new DiceRollerPlugin()
];

export default {
    preferences: {
        prefix: "!"
    },

   /* server: {
        hostname: "irc.p2p-network.net",
        port: "6667",
        SSL: false,
        nick: "norbert-beta",
        fullname: "Norbert.The.Bot",
        channels: "#420-bots"
    },*/

     server: {
     hostname: "irc.freenode.net",
     port: "6667",
     SSL: false,
     nick: "norbert-beta",
     fullname: "Norbert.The.Bot",
     channels:"##phpbartalk"

     },

    database: {
        type: "sqlite3",
        location: "Norbert.sqlite"
    },

    plugins: corePlugins.concat(plugins)

};