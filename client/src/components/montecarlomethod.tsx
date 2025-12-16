import LottoExample from './lotto_example.svg'

export default function MonteCarloMethod() {
  return (
    <div className="text-left flex">
      <p className='size-80'><b>Richtige:</b><br/>Auf wie viele richtig getippte Kugeln bei der Berechnung geachtet werden soll.</p>
      <p className='size-80'><b>Gezogene Kugeln:</b><br/>Wie viele Kugeln bei der Lottoziehung gezogen werden sollen.</p>
      <p className='size-80'><b>Kugeln Insgesamt:</b><br/>Aus wie vielen Kugeln gezogen werden soll.</p>
      <p className='size-80'><b>Tippzettel:</b><br/>Ein Tippzettel, welcher mit Komma getrennte Zahlen enthalten muss. Die Menge der Zahlen muss "Gezogene Kugeln" entsprechen und der Wertebereich entspricht 1 bis "Kugeln insgesamt".</p>
      <img className="rounded-md" src={LottoExample} alt="lotto_example.svg fehlt" height="350" width="350" />
    </div>
  )
}