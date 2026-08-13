export interface Quote {
  id: number;
  phrase: string;
  transliteration?: string;
  translation: string;
  speaker: 'Conductor' | 'Driver' | 'Passenger' | 'Highway Legend';
  context: string;
}

export interface Ticket {
  id: string;
  passengerName: string;
  from: string;
  to: string;
  fare: number;
  date: string;
  time: string;
  ticketNo: string;
  punched: boolean;
  seatType: 'Window' | 'Cabin' | 'Roof' | 'Standard';
}

export interface TrackInfo {
  id: string;
  youtubeId: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  duration: string;
  coverUrl: string;
}

export type TimeOfDay = 'day' | 'golden' | 'night';

export interface RouteStop {
  name: string;
  distanceKm: number;
  popularFor: string;
  fare: number;
}
