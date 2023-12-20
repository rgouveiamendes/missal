import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="background advent"><b>Advento</b><br />Índice</h1>

      <section id="leituras">
        <h2>Leituras</h2>

        <div className="context-menu">
          <p className="red">I Semana:</p>
          <div className="button-container">
            <Link href="./readings/advent/week-01/1" className="button advent">Do</Link>
            <Link href="./readings/advent/week-01/2" className="button advent">Se</Link>
            <Link href="./readings/advent/week-01/3" className="button advent">Te</Link>
            <Link href="./readings/advent/week-01/4" className="button advent">Qa</Link>
            <Link href="./readings/advent/week-01/5" className="button advent">Qi</Link>
            <Link href="./readings/advent/week-01/6" className="button advent">Sx</Link>
            <Link href="./readings/advent/week-01/7" className="button advent">Sa</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">II Semana:</p>
          <div className="button-container">
            <Link href="./readings/advent/week-02/1" className="button advent">Do</Link>
            <Link href="./readings/advent/week-02/2" className="button advent">Se</Link>
            <Link href="./readings/advent/week-02/3" className="button advent">Te</Link>
            <Link href="./readings/advent/week-02/4" className="button advent">Qa</Link>
            <Link href="./readings/advent/week-02/5" className="button advent">Qi</Link>
            <Link href="./readings/advent/week-02/6" className="button advent">Sx</Link>
            <Link href="./readings/advent/week-02/7" className="button advent">Sa</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">III Semana:</p>
          <div className="button-container">
            <Link href="./readings/advent/week-03/1" className="button advent">Do</Link>
            <Link href="./readings/advent/week-03/2" className="button advent">Se</Link>
            <Link href="./readings/advent/week-03/3" className="button advent">Te</Link>
            <Link href="./readings/advent/week-03/4" className="button advent">Qa</Link>
            <Link href="./readings/advent/week-03/5" className="button advent">Qi</Link>
            <Link href="./readings/advent/week-03/6" className="button advent">Sx</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">IV Semana:</p>
          <div className="button-container">
            <Link href="./readings/advent/week-04/1" className="button advent">Do</Link>
          </div></div>

        <div className="context-menu">
          <p className="red">Dias de dezembro:</p>
          <div className="button-container">
            <Link href="./readings/advent/december/17" className="button advent">17.dez</Link>
            <Link href="./readings/advent/december/18" className="button advent">18.dez</Link>
            <Link href="./readings/advent/december/19" className="button advent">19.dez</Link>
            <Link href="./readings/advent/december/20" className="button advent">20.dez</Link>
            <Link href="./readings/advent/december/21" className="button advent">21.dez</Link>
            <Link href="./readings/advent/december/22" className="button advent">22.dez</Link>
            <Link href="./readings/advent/december/23" className="button advent">23.dez</Link>
            <Link href="./readings/advent/december/24" className="button advent">24.dez</Link>
          </div></div>
      </section>
    </>
  )
}
