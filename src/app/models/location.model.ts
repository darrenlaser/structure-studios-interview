export class LocationModel {
  constructor(
    public latitude: number = null,
    public longitude: number = null,
    public name: string = null,
    public state: string = null,
    public country: string = null
  ) {}
}
