import adventJSON from '@/../public/data/pt/advent.json'
import { DayPropers, SeasonJSON } from '@/types/readings';
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

  const dayPropers = typedAdventJSON.propers[period][day] as DayPropers;

  return (
    <>
      <h1 className="background advent"><b>I Semana do Advento</b><br />Quarta-feira</h1>
      <div className="navigation-menu">
        <div className="button-group">
          <a className="button advent" href="../leituras">Leituras dia</a>
        </div>
        <div className="button-group">
          <a className="button advent" href="../../te/oracoes">Te</a>
          <a className="button advent" href="../../qi/oracoes">Qi</a>
        </div>
        <div className="button-group">
          <a className="button advent" href="../../../sem-02/qa/oracoes">Semana II</a>
        </div>
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
