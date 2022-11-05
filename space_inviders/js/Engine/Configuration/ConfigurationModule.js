import configuration from "./configuration.json" assert { type: "json" };
export class ConfigurationModule {
    static IsAudioEnabled() {
        return configuration.AudioEnabled;
    }
}
