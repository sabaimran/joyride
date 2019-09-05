/**
 * Interface for Ride schema.
 */
export interface IRide {
    driverID: String,
    date: Date,
    destination: String,
    departure: String,
    category: String,
    price: number,
    numberOfSeats: number
}
