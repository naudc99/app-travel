export interface Reservation{
    reservationId: number,
    userId: number,
    destinationId: number,
    activityId: number,
    accommodationId: number,
    reservationDate: Date,
    initialDate: Date,
    finalDate: Date,
    passengerCount: number,
    status: string, 
    price: number
}