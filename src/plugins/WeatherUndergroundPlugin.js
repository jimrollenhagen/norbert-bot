// @flow

import SimpleChanMsgPlugin from 'plugins/SimpleChanMsgPlugin';
import Wunderground from 'node-weatherunderground';
import Norbert from 'lib/Norbert';

export default class WeatherUndergroundPlugin extends SimpleChanMsgPlugin {
    client:Wunderground;

    constructor(apiKey:string) {
        super();
        this.client = new Wunderground(apiKey);
    }

    getName() {
        return "WeatherUnderground";
    }

    getHelp() {
        return {
            overview: "Weather Underground Plugin",
            commands: {
                "weather" : "Gets the weather, shocking!"
            }
        }
    }

    getCommands() {
        return {
            weather: this.getWeather.bind(this)
        }

    }

    getWeather(channel:string, sender:string, message:string, norbert:Norbert) {
        if(!message.trim()) {
            return;
        }

        this.client.conditions({city: message}, (err, data) => {
            let conditions = this.getWeatherConditionsString(data);
            if(conditions === false) {
                conditions = `No weather found for ${message}`;
            }

            norbert.client.say(channel, conditions);
        });
    }

    getWeatherConditionsString(data:Object) {
        if(!data ||
            !data.hasOwnProperty('observation_location') ||
            !data.hasOwnProperty('temperature_string') ||
            !data.hasOwnProperty('observation_time') ||
            !data.hasOwnProperty('weather') ||
            !data.hasOwnProperty('relative_humidity') ||
            !data.hasOwnProperty('wind_string') ||
            !data.hasOwnProperty('feelslike_string') ||
            !data.hasOwnProperty('forecast_url')
        ) {
            return false;
        }

        let location = data.observation_location.full;
        let temp = data.temperature_string;
        let observation = data.observation_time;
        let weather = data.weather;
        let humidity = data.relative_humidity;
        let wind = data.wind_string.replace('From', 'from');
        let feelsLike = data.feelslike_string;
        let url = data.forecast_url;

        return `Current conditions: ${weather} / ${temp} [feels like ${feelsLike}] `
            + ` / ${humidity} humidity / Wind ${wind} / ${observation} at ${location}`
            + ` / More at ${url}`;
    }
}