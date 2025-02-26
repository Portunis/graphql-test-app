export interface IBookings {
    firstBooking: IBooking[],
    user: IUser
}

interface IBooking {
  id: string;
  user: string;
  date: string;
  time: string;
  location: string;
}

interface IUser {
  id: string;
  name: string;
}
