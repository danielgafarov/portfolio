import Test0 from './test0.jpg'
import Test1 from './test1.jpg'
import Test2 from './test2.jpg'
import Test3 from './test3.jpg'
import Test4 from './test4.jpg'
import Test5 from './test5.jpg'
import Test6 from './test6.jpg'
import Test7 from './test7.jpg'
import Test8 from './test8.jpg'
import Test9 from './test9.jpg'


export default function FeedForward() {
  return (
    <>
    <p className="text-center"> Beim Ausführen werden diese 10 Zahlen von der KI analysiert. In Zukunft können sie hier selber Zahlen mit der Maus schreiben und analysieren lassen.</p>
      <div className="text-left flex">
        <img className='rounded-md' src={Test0} alt="test0.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test1} alt="test1.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test2} alt="test2.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test3} alt="test3.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test4} alt="test4.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test5} alt="test5.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test6} alt="test6.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test7} alt="test7.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test8} alt="test8.jpg fehlt" height="100" width="100"></img>
        <img className='rounded-md' src={Test9} alt="test9.jpg fehlt" height="100" width="100"></img>
      </div>
    </>
  )
}