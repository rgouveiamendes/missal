import adventJSON from '@/../public/data/advent.json'
import { DayReadings, AdventJSON } from '@/types/readings';
import Link from 'next/link';

interface DatePath {
  period: string;
  day: string;
}

export async function generateStaticParams({
  params: { period, day },
}: {
  params: DatePath;
}) {

  const typedAdventJSON = adventJSON as AdventJSON;

  let paths: DatePath[] = [];

  // Iterate over the JSON data to generate paths
  Object.entries(typedAdventJSON.readings).forEach(([period, days]) => {
    Object.keys(days).forEach(day => {

      // Add the path object to the array
      paths.push({ period: period, day: day });
    });
  });

  return paths;
}

export default function Page({
  params: { period, day },
}: {
  params: DatePath;
}) {
  const typedAdventJSON = adventJSON as AdventJSON;
  const dayData = typedAdventJSON.readings[period][day];

  let dayReadings: DayReadings;
  let isSunday: boolean;
  if (Array.isArray(dayData)) {
    dayReadings = dayData[0];
    isSunday = true;
  } else {
    dayReadings = dayData;
    isSunday = false;
  }

  return (
    <>
      <h1 className="background advent"><b>I Semana do Advento</b><br />Quinta-feira</h1>
      <div className="navigation-menu">
        <div className="button-group">
          <Link className="button advent" href="../oracoes">Orações dia</Link>
        </div>
        {isSunday &&
          <div className="button-group">
            <Link className="button advent" href="/">Ano A</Link>
            <Link className="button advent" href="/">Ano C</Link>
          </div>}
        <div className="button-group">
          <Link className="button advent" href="/">Sa</Link>
        </div>
        <div className="button-group">
          <Link className="button advent" href="/">Se</Link>
        </div>
        <div className="button-group">
          <Link className="button advent" href="/">Semana II</Link>
        </div>
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
        <p className="ref"><span className="rub">Refrão:</span> {dayReadings['psalm'].response}</p>
        <p className="lt ref">Lorem ipsum dolot sit amet.</p>

        {dayReadings['psalm'].verses.map(verse => (
          <>
            <p>{verse}</p>
            <p className="ref"><span className="rub">Refrão:</span> {dayReadings['psalm'].response}</p>
            <p className="lt ref">Lorem ipsum dolot sit amet.</p>
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
        <p className="lt ref">Lorem ipsum dolot sit amet.</p>
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
