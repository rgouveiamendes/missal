import adventJSON from '@/../public/data/pt/advent.json'
import { DayPropers, SeasonJSON } from '@/types/day-specifics';
import Link from 'next/link';
import convertToTitleCase from '@/lib/convertToTitleCase';
import convertToRomanNumerals from '@/lib/convertToRomanNumerals';
import thesaurusJSON from '@/../public/data/pt/thesaurus.json'
import { Thesaurus } from '@/types/thesaurus';

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
  const typedAdventJSON = adventJSON as unknown as SeasonJSON;
  const typedThesaurusJSON = thesaurusJSON as Thesaurus;

  const dayPropers = typedAdventJSON.propers[period][day] as DayPropers;

  let isSunday;
  let isNumberedWeek;

  if (period.split('-')[0] == 'week') {
    isNumberedWeek = true;
    if (day == '1') {
      isSunday = true;
    } else {
      isSunday = false;
    }
  } else {
    isNumberedWeek = false;
    isSunday = false;
  }

  return (
    <>
      <h1 className="background advent">
        {isNumberedWeek ? (
          <><b>{convertToRomanNumerals(parseInt(period.split('-')[1]))} Semana do Advento</b>
            <br />
            {convertToTitleCase(typedThesaurusJSON['week-days'][parseInt(day) - 1])}</>
        ) : (<>
          <b>Advento</b>
          <br />{day} de {convertToTitleCase(typedThesaurusJSON.months[11])}
        </>
        )
        }
      </h1>
      <div className="navigation-menu">
        {!isSunday && <div className="button-group">
          <Link className="button advent" href={`/advent/${period}/${day}/readings`}>Leituras do dia</Link>
        </div>}
        {isSunday && <div className="button-group">
          <Link className="button advent" href={`/advent/${period}/${day}-A/readings`}>Leituras Do A</Link>
          <Link className="button advent" href={`/advent/${period}/${day}-B/readings`}>Leituras Do B</Link>
          <Link className="button advent" href={`/advent/${period}/${day}-C/readings`}>Leituras Do C</Link>
        </div>}
        <div className="button-group">
          <Link className="button advent" href="/">Sa</Link>
          <Link className="button advent" href="/">Se</Link>
        </div>
        {/* <div className="button-group">
          <a className="button advent" href="../../../sem-02/qa/oracoes">Semana II</a>
        </div> */}
      </div>

      <section id="ant-entrada">
        <h2>Antífona de Entrada</h2>
        {dayPropers.entrance.reference &&
          <p className="rub">{dayPropers.entrance.reference}</p>}

        <p className="ref">{dayPropers.entrance.text}</p>
        <p className="lt ref">Lorem ipsum dolor sit amet.</p>
      </section>

      <div className="context-menu button-group">
        <p className="red">Ritos Iniciais (Não se diz o Glória):</p>
        <a href="/ordinario/pt/ritos-iniciais" className="button advent">Português</a>
        <a href="/ordinario/lt/ritos-iniciais" className="button advent">Latim</a>
      </div>

      <section id="coleta">
        <h2>Oração Coleta</h2>
        {dayPropers.collect.reference &&
          <p className="rub">{dayPropers.collect.reference}</p>}
        <p>{dayPropers.collect.text}</p>
      </section>

      <div className="context-menu">
        <a href="leituras#sem-01-qa" className="button advent">Leituras</a>
      </div>

      <section id="oblatas">
        <h2>Oração sobre as Oblatas</h2>
        {dayPropers.offerings.reference &&
          <p className="rub">{dayPropers.offerings.reference}</p>}
        <p>{dayPropers.offerings.text}</p>
      </section>

      <div className="context-menu">
        <div className="button-group">
          <p className="red">Prefácios do Advento:</p>
          <a href="prefacios#pt" className="button advent">Português</a>
          <a href="prefacios#lt" className="button advent">Latim</a>
        </div>
        <div className="button-group">
          <p className="red">Orações Eucarísticas:</p>
          <a href="/ordinario/oracoes-eucaristicas/01" className="button advent">I</a>
          <a href="/ordinario/oracoes-eucaristicas/02" className="button advent">II</a>
          <a href="/ordinario/oracoes-eucaristicas/03" className="button advent">III</a>
          <a href="/ordinario/oracoes-eucaristicas/04" className="button advent">IV</a>
        </div>
      </div>

      <section id="ant-comunhao">
        <h2>Antífona da Comunhão</h2>
        {dayPropers.communion.reference &&
          <p className="rub">{dayPropers.communion.reference}</p>}
        <p className="ref">{dayPropers.communion.text}</p>
        <p className="lt ref">Lorem ipsum dolor sit amet.</p>
      </section>

      <div className="context-menu button-group">
        <p className="red">Ritos da Comunhão:</p>
        <a href="/ordinario/pt/liturgia-eucaristica#comunhao" className="button advent">Português</a>
        <a href="/ordinario/lt/liturgia-eucaristica#comunhao" className="button advent">Latim </a>
      </div>

      <section id="pos-comunhao">
        <h2>Oração depois da Comunhão</h2>
        {dayPropers['post-communion'].reference &&
          <p className="rub">{dayPropers['post-communion'].reference}</p>}
        <p>{dayPropers['post-communion'].text}</p>
      </section>

      <div className="context-menu">
        <div className="button-group">
          <p className="red">Ritos de Conclusão:</p>
          <a href="/ordinario/pt/ritos-conclusao" className="button advent">Português</a>
          <a href="/ordinario/lt/ritos-conclusao" className="button advent">Latim</a>
        </div>
        <div className="button-group">
          <a href="/ordinario/pt/bencaos-solenes" className="button advent">Bênção Solene</a>
        </div>
      </div>
    </>
  );
}
