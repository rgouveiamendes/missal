import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="background christmas"><b>Missal</b><br />Índice</h1>
      <section id="liturgical-times" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>⚠ Página temporária ⚠</p>
        <Link href="./advent/" className="button advent">Advento</Link>
        <Link href="./advent/" className="button christmas">Tempo do Natal</Link>
        <Link href="./advent/" className="button lent">Quaresma</Link>
        <p>⚠ Página temporária ⚠</p>
      </section>
    </>
  )
}
