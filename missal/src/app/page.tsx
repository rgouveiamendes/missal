import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <h1 className="background advento"><b>Advento</b><br />Índice</h1>

      <section id="leituras">
        <h2>Leituras</h2>

        <div className="context-menu">
          <p className="r">I Semana:</p>
          <Link href="./advent/week-01/1" className="button advento">Do</Link>
          <Link href="./advent/week-01/2" className="button advento">Se</Link>
          <Link href="./advent/week-01/3" className="button advento">Te</Link>
          <Link href="./advent/week-01/4" className="button advento">Qa</Link>
          <Link href="./advent/week-01/5" className="button advento">Qi</Link>
          <Link href="./advent/week-01/6" className="button advento">Sx</Link>
          <Link href="./advent/week-01/7" className="button advento">Sa</Link>
        </div>

        <div className="context-menu">
          <p className="r">II Semana:</p>
          <Link href="./advent/week-02/1" className="button advento">Do</Link>
          <Link href="./advent/week-02/2" className="button advento">Se</Link>
          <Link href="./advent/week-02/3" className="button advento">Te</Link>
          <Link href="./advent/week-02/4" className="button advento">Qa</Link>
          <Link href="./advent/week-02/5" className="button advento">Qi</Link>
          <Link href="./advent/week-02/6" className="button advento">Sx</Link>
          <Link href="./advent/week-02/sa" className="button advento">Sa</Link>
        </div>

        <div className="context-menu">
          <p className="r">III Semana:</p>
          <Link href="./advent/week-03/1" className="button advento">Do</Link>
          <Link href="./advent/week-03/2" className="button advento">Se</Link>
          <Link href="./advent/week-03/3" className="button advento">Te</Link>
          <Link href="./advent/week-03/4" className="button advento">Qa</Link>
          <Link href="./advent/week-03/5" className="button advento">Qi</Link>
          <Link href="./advent/week-03/6" className="button advento">Sx</Link>
        </div>

        <div className="context-menu">
          <p className="r">IV Semana:</p>
          <Link href="./advent/week-04/1" className="button advento">Do</Link>
        </div>

        <div className="context-menu">
          <p className="r">Dias de dezembro:</p>
          <Link href="./advent/december/17" className="button advento">17.dez</Link>
          <Link href="./advent/december/18" className="button advento">18.dez</Link>
          <Link href="./advent/december/19" className="button advento">19.dez</Link>
          <Link href="./advent/december/20" className="button advento">20.dez</Link>
          <Link href="./advent/december/21" className="button advento">21.dez</Link>
          <Link href="./advent/december/22" className="button advento">22.dez</Link>
          <Link href="./advent/december/23" className="button advento">23.dez</Link>
          <Link href="./advent/december/24" className="button advento">24.dez</Link>
        </div>
      </section>
    </>
  )
}
