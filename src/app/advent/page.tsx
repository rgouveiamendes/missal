import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="background advent"><b>Advento</b><br />Índice</h1>

      <section id="propers">
        <h2>Orações</h2>

        <div className="context-menu">
          <p className="red">I Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-01/1/propers" className="button advent">Do</Link>
            <Link href="./advent/week-01/2/propers" className="button advent">Se</Link>
            <Link href="./advent/week-01/3/propers" className="button advent">Te</Link>
            <Link href="./advent/week-01/4/propers" className="button advent">Qa</Link>
            <Link href="./advent/week-01/5/propers" className="button advent">Qi</Link>
            <Link href="./advent/week-01/6/propers" className="button advent">Sx</Link>
            <Link href="./advent/week-01/7/propers" className="button advent">Sa</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">II Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-02/1/propers" className="button advent">Do</Link>
            <Link href="./advent/week-02/2/propers" className="button advent">Se</Link>
            <Link href="./advent/week-02/3/propers" className="button advent">Te</Link>
            <Link href="./advent/week-02/4/propers" className="button advent">Qa</Link>
            <Link href="./advent/week-02/5/propers" className="button advent">Qi</Link>
            <Link href="./advent/week-02/6/propers" className="button advent">Sx</Link>
            <Link href="./advent/week-02/7/propers" className="button advent">Sa</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">III Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-03/1/propers" className="button advent">Do</Link>
            <Link href="./advent/week-03/2/propers" className="button advent">Se</Link>
            <Link href="./advent/week-03/3/propers" className="button advent">Te</Link>
            <Link href="./advent/week-03/4/propers" className="button advent">Qa</Link>
            <Link href="./advent/week-03/5/propers" className="button advent">Qi</Link>
            <Link href="./advent/week-03/6/propers" className="button advent">Sx</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">IV Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-04/1/propers" className="button advent">Do</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">Dias de dezembro:</p>
          <div className="button-container">
            <Link href="./advent/december/17/propers" className="button advent">17.dez</Link>
            <Link href="./advent/december/18/propers" className="button advent">18.dez</Link>
            <Link href="./advent/december/19/propers" className="button advent">19.dez</Link>
            <Link href="./advent/december/20/propers" className="button advent">20.dez</Link>
            <Link href="./advent/december/21/propers" className="button advent">21.dez</Link>
            <Link href="./advent/december/22/propers" className="button advent">22.dez</Link>
            <Link href="./advent/december/23/propers" className="button advent">23.dez</Link>
            <Link href="./advent/december/24/propers" className="button advent">24.dez</Link>
          </div></div>
      </section>

      <section id="readings">
        <h2>Leituras</h2>

        <div className="context-menu">
          <p className="red">I Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-01/1-A/readings" className="button advent">Do A</Link>
            <Link href="./advent/week-01/1-B/readings" className="button advent">Do B</Link>
            <Link href="./advent/week-01/1-C/readings" className="button advent">Do C</Link>
            <Link href="./advent/week-01/2/readings" className="button advent">Se</Link>
            <Link href="./advent/week-01/3/readings" className="button advent">Te</Link>
            <Link href="./advent/week-01/4/readings" className="button advent">Qa</Link>
            <Link href="./advent/week-01/5/readings" className="button advent">Qi</Link>
            <Link href="./advent/week-01/6/readings" className="button advent">Sx</Link>
            <Link href="./advent/week-01/7/readings" className="button advent">Sa</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">II Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-02/1-A/readings" className="button advent">Do A</Link>
            <Link href="./advent/week-02/1-B/readings" className="button advent">Do B</Link>
            <Link href="./advent/week-02/1-C/readings" className="button advent">Do C</Link>
            <Link href="./advent/week-02/2/readings" className="button advent">Se</Link>
            <Link href="./advent/week-02/3/readings" className="button advent">Te</Link>
            <Link href="./advent/week-02/4/readings" className="button advent">Qa</Link>
            <Link href="./advent/week-02/5/readings" className="button advent">Qi</Link>
            <Link href="./advent/week-02/6/readings" className="button advent">Sx</Link>
            <Link href="./advent/week-02/7/readings" className="button advent">Sa</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">III Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-03/1-A/readings" className="button advent">Do A</Link>
            <Link href="./advent/week-03/1-B/readings" className="button advent">Do B</Link>
            <Link href="./advent/week-03/1-C/readings" className="button advent">Do C</Link>
            <Link href="./advent/week-03/2/readings" className="button advent">Se</Link>
            <Link href="./advent/week-03/3/readings" className="button advent">Te</Link>
            <Link href="./advent/week-03/4/readings" className="button advent">Qa</Link>
            <Link href="./advent/week-03/5/readings" className="button advent">Qi</Link>
            <Link href="./advent/week-03/6/readings" className="button advent">Sx</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">IV Semana:</p>
          <div className="button-container">
            <Link href="./advent/week-04/1-A/readings" className="button advent">Do A</Link>
            <Link href="./advent/week-04/1-B/readings" className="button advent">Do B</Link>
            <Link href="./advent/week-04/1-C/readings" className="button advent">Do C</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">Dias de dezembro:</p>
          <div className="button-container">
            <Link href="./advent/december/17/readings" className="button advent">17.dez</Link>
            <Link href="./advent/december/18/readings" className="button advent">18.dez</Link>
            <Link href="./advent/december/19/readings" className="button advent">19.dez</Link>
            <Link href="./advent/december/20/readings" className="button advent">20.dez</Link>
            <Link href="./advent/december/21/readings" className="button advent">21.dez</Link>
            <Link href="./advent/december/22/readings" className="button advent">22.dez</Link>
            <Link href="./advent/december/23/readings" className="button advent">23.dez</Link>
            <Link href="./advent/december/24/readings" className="button advent">24.dez</Link>
          </div></div>
      </section>
    </>
  )
}
