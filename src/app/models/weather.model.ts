export class WeatherModel {
  constructor(
    public name: string,
    public country: string,
    public description: string = null,
    public icon_code: string = null,
    public temperature: number = null,
    public feels_like: number = null,
    public high: number = null,
    public low: number = null,
    public pressure: number = null,
    public humidity: number = null,
    public wind: number = null
  ) {}

  get icon_url() {
    return this.icon_code
      ? `https://openweathermap.org/img/wn/${this.icon_code}@2x.png`
      : '';
  }
}
