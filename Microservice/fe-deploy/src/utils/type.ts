export interface LoginResponse {
  grantType: string;
  accessToken: string;
  accessTokenExpiresIn: number;
}

export interface DeployedPlay {
  id: number;
  image: string;
  namespace: string;
  name: string;
  bookingStartDate: string;
  bookingEndDate: string;
  seatsAndPrices: any;
}

export interface DeployedPlayDetail {
  pid: number;
  thumbnailUrl: string;
  title: string;
  deployDate: Date;
  status: string;
  bookingStartDate: Date;
  bookingEndDate: Date;
}

export interface TemplateInfo {
  nickname: string;
  descirption: string;
  type: string[];
}

export type Template = [string, TemplateInfo];

export interface Image {
  data: Blob;
  ext: string;
  url: string;
}

export interface Seat {
  x: number;
  y: number;
}

export interface Section {
  sectionName: string;
  seats: Seat[];
}

export interface Venue {
  name: string;
  backgroundImage: string;
  imageSize: {
    width: number;
    height: number;
  }
  sections: Section[];
}

export interface MerchandiseImage {
  url: string;
  data: Blob;
  ext: string;
}

export interface Merchandise {
  image: MerchandiseImage;
  name: string;
  price: number;
  count: number;
}
