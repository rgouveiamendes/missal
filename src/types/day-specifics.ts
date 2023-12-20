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

export interface DayPropers {
  entrance: {
    reference: string | null;
    text: string;
  };
  collect: {
    reference: string | null;
    text: string;
  };
  offerings: {
    reference: string | null;
    text: string;
  };
  communion: {
    reference: string | null ;
    text: string;
  };
  "post-communion": {
    reference: string | null;
    text: string;
  };
}

export interface PeriodReadings {
  [day: string]: DayReadings[] | DayReadings;
}

export interface PeriodPropers {
  [day: string]: DayPropers;
}

export interface SeasonJSON {
  propers: {
    [period: string]: PeriodPropers;
  };
  readings: {
    [period: string]: PeriodReadings;
  };
}
