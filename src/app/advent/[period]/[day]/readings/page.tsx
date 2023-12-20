import adventJSON from '@/../public/data/pt/advent.json'
import thesaurusJSON from '@/../public/data/pt/thesaurus.json'
import { DayReadings, SeasonJSON } from '@/types/day-specifics';
import { Thesaurus } from '@/types/thesaurus';
import Link from 'next/link';
import convertToTitleCase from '@/lib/convertToTitleCase';
import convertToRomanNumerals from '@/lib/convertToRomanNumerals';

interface DatePath {
  period: string;
  day: string;
}

export async function generateStaticParams({
  params: { period, day },
}: {
  params: DatePath;
}) {

  const typedAdventJSON = adventJSON as SeasonJSON;

  let paths: DatePath[] = [];

  // Iterate over the JSON data to generate paths
  Object.entries(typedAdventJSON.readings).forEach(([period, days]) => {
    Object.keys(days).forEach(day => {

      if (days[day] && Array.isArray(days[day])) {
        (days[day] as DayReadings[]).forEach((dayReading: DayReadings) => {
          paths.push({ period: period, day: `${day}-${dayReading.cycle}` });
        });

      } else {
        paths.push({ period: period, day: day });
      }
    });
  });

  return paths;
}

export default function Page({
  params: { period, day },
}: {
  params: DatePath;
}) {
  const typedAdventJSON = adventJSON as SeasonJSON;
  const typedThesaurusJSON = thesaurusJSON as Thesaurus;

  const weekday = day.split('-')[0]
  const liturgical_year = day.split('-')[1]

  let dayReadings: DayReadings;
  let isSunday: boolean;

  let isNumberedWeek;
  let cycles: string[] = [];

  if (period.split('-')[0] == 'week') {
    isNumberedWeek = true;
    if (weekday == '1') {
      const daysData = typedAdventJSON.readings[period][weekday] as DayReadings[];
      cycles = daysData.map((dayData: DayReadings) => dayData.cycle) as string[];
      const idx = cycles.indexOf(liturgical_year);
      dayReadings = daysData[idx] as DayReadings;
      isSunday = true;
    } else {
      dayReadings = typedAdventJSON.readings[period][weekday] as DayReadings;
      isSunday = false;
    }
  } else {
    isNumberedWeek = false;
    dayReadings = typedAdventJSON.readings[period][day] as DayReadings;
    isSunday = false;
  }

  return (
    <>
      <h1 className="background advent">
        {isNumberedWeek ? (
          <><b>{convertToRomanNumerals(parseInt(period.split('-')[1]))} Semana do Advento</b>
            <br />
            {convertToTitleCase(typedThesaurusJSON['week-days'][parseInt(weekday) - 1])}
            {isSunday && ` - Ano ${liturgical_year}`}</>
        ) : (<>
          <b>Advento</b>
          <br />{day} de {convertToTitleCase(typedThesaurusJSON.months[11])}
        </>
        )
        }
      </h1>
      <div className="navigation-menu">
        <div className="button-group">
          <Link className="button advent" href={`/advent/${period}/${weekday}/propers`}>Orações dia</Link>
        </div>
        {isSunday &&
          <>
            <div className="button-group">
              {cycles?.map((cycle: string) => (
                liturgical_year != cycle && <Link key={cycle} className="button advent" href={`/advent/${period}/${weekday}-${cycle}/readings`}>Ano {cycle}</Link>
              ))}
            </div>
          </>
        }
        <div className="button-group">
          <Link className="button advent" href="/">Sa</Link>
          <Link className="button advent" href="/">Se</Link>
        </div>
        {/* <div className="button-group">
          <Link className="button advent" href="/">Semana II</Link>
        </div> */}
      </div>

      <section id="leitura-1">
        <h2>Leitura I</h2>
        <p className="rub">{dayReadings['reading-I'].reference}</p>
        <p className="rub">{dayReadings['reading-I'].snippet}</p>

        <p>{dayReadings['reading-I'].announcement}</p>
        <p>{dayReadings['reading-I'].text}</p>
        <p>Palavra do Senhor.</p>
      </section>

      <section id="salmo">
        <h2>Salmo Responsorial</h2>
        <p className="rub">{dayReadings['psalm'].reference}</p>
        <p className="ref"><span className="red">Refrão:</span> {dayReadings['psalm'].response}</p>
        <p className="lt ref">Lorem ipsum dolor sit amet.</p>

        {dayReadings['psalm'].verses.map(verse => (
          <>
            <p>{verse}</p>
            <p className="ref"><span className="red">Refrão:</span> {dayReadings['psalm'].response}</p>
            <p className="lt ref">Lorem ipsum dolor sit amet.</p>
          </>
        ))}
      </section >

      {dayReadings['reading-II'] &&
        <section id="leitura-2">
          <h2>Leitura II</h2>
          <p className="rub">{dayReadings['reading-II'].reference}</p>
          <p className="rub">{dayReadings['reading-II'].snippet}</p>

          <p>{dayReadings['reading-II'].announcement}</p>
          <p>{dayReadings['reading-II'].text}</p>
          <p>Palavra do Senhor.</p>
        </section>
      }

      <section id="aleluia">
        <h2>Aleluia</h2>
        {dayReadings['aleluia'].reference && <p className="rub">{dayReadings['aleluia'].reference}</p>}
        <p className="ref"><span className="red">Refrão:</span> Aleluia. Aleluia.</p>

        <p>{dayReadings['aleluia'].text}</p>
        <p className="lt ref">Lorem ipsum dolor sit amet.</p>
      </section>

      <section id="evangelho">
        <h2>Evangelho</h2>
        <p className="rub">{dayReadings['gospel'].reference}</p>
        {dayReadings['gospel'].snippet && <p className="rub">{dayReadings['gospel'].snippet}</p>}

        <p><span className="red">✠</span> {dayReadings['gospel'].announcement}</p>
        <p>{dayReadings['gospel'].text}</p>
        <p>Palavra da salvação.</p>
      </section>

      <div className="context-menu">
        <div className="button-group">
          <p className="red">Credo:</p>
          <Link href="/" className="button advent">Português</Link>
          <Link href="/" className="button advent">Latim</Link>
        </div>
        <div className="button-group">
          <p className="red">Liturgia Eucarística:</p>
          <Link href="/" className="button advent">Português</Link>
          <Link href="/" className="button advent">Latim</Link>
        </div>
      </div>
    </>
  );
}
