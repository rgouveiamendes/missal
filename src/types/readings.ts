export interface Reading {
  reference: string;
  snippet: string;
  announcement: string;
  text: string;
}

export interface Psalm {
  reference: string;
  notice?: string;
  response: string;
  verses: string[];
}

export interface Aleluia {
  reference?: string | null;
  response: string;
  text: string;
}

export interface Gospel {
  reference: string;
  snippet?: string;
  announcement: string;
  text: string;
}

export interface DayReadings {
  cycle?: string;
  "reading-I": Reading;
  psalm: Psalm;
  "reading-II"?: Reading;
  aleluia: Aleluia;
  gospel: Gospel;
  [key: string]: Reading | Psalm | Aleluia | Gospel | string | undefined;
}

export interface Period {
  [day: string]: DayReadings[] | DayReadings;
}

export interface AdventJSON {
  readings: {
    [periodKey: string]: Period;
  };
}
