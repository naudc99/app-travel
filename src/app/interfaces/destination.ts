import { Country } from "./country";

export interface Destination{
    destinationId: number,
    name: string,
    country: Country,
    description: string,
    image: string,
    price: number,
}