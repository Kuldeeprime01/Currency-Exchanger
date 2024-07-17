import { useEffect, useState } from 'react'
import './App.css' 
import Inputbox from './components/Inputbox'
import CurrencyInfo from './hooks/CurrencyInfo';

function App() {
  const [amount,setAmount] = useState();
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState('inr');
  const [result, setresult] = useState();
  const [swapped, setSwapped] = useState(true);

  const currencyInfo = CurrencyInfo(from);
  const Options = Object.keys(currencyInfo);

  function convert(){
    if(amount != '' && swapped == true){
      setresult(amount * currencyInfo[to]);
    }else if(amount == '') setresult('');
  }

  function swap(){
    setSwapped(false);
    setTo(from);
    setAmount(result);
    setresult(amount);
    setFrom(to);
  }

  useEffect(()=>{
    convert();
    setSwapped(true);
  },[amount, from, to])
  return (
    <div className='w-max h-max bg-white/30 backdrop-blur p-10 flex gap-6 flex-col'>
        <h1 className='text-4xl text-white tracking-wider font-semibold'>Currency Converter</h1>
        <div className='relative w-full h-full flex flex-col gap-2'>
          <div>
              <Inputbox
              label = "From"
              amount={amount}
              currencyOptions={Options}
              selectCurrency={from}
              onAmountChange={(amount)=>{
                if(amount != '' && amount >= 0){
                  setAmount(amount);
                }else {
                  setAmount('');
                }
              }}
              onCurrencyChange={(currency) => setFrom(currency)}
              />
          </div>
          <div className=' bg-blue-500 flex items-center rounded-md duration-150 border-2 border-solid border-white child hover:bg-blue-600' onClick={swap}>
            <button className=' rounded-sm px-2 py-1'>Swap</button>
            <span className="material-symbols-outlined">swap_vert</span>
          </div>
          <div>
              <Inputbox
              label = "To"
              amount={result}
              selectCurrency={to}
              currencyOptions={Options}
              onCurrencyChange={(currency) => setTo(currency)}
              onAmountChange={(amount) => {
                if(amount != ''){
                  setresult(amount);
                }else {
                  setresult('');
                }
              }}
              amountDisable = {true}
              />
          </div>
        </div>
    </div>
  )
}

export default App
