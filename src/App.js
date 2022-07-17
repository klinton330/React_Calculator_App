import { useState } from 'react'
import { Helmet } from 'react-helmet'

function App() {
  const [calc, setcalc] = useState('')
  const [result, setResult] = useState('')

  const ops = ['/', '*', '+', '-', '.']

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    )
      return
    console.log(calc)
    setcalc(calc + value)

    if (!ops.includes(value)) setResult(eval(calc + value).toString())
  }

  const createDigits = () => {
    const digits = []
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button key={i} onClick={() => updateCalc(i.toString())}>
          {i}
        </button>,
      )
    }

    return digits
  }

  const calculate = () => {
    if (ops.includes(calc.slice(-1))) return
    setcalc(eval(calc))
  }

  const deleteValue = () => {
    if (calc === '') return
    console.log('Res', result)
    const val = calc.slice(0, -1)
    setcalc(val)
  }

  const resetValue = () => {
    if (calc === '') return
    setcalc('')
    setResult('')
  }

  return (
    <div className="app">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Calculator</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Calculator application" />
      </Helmet>
      <div className="calculator">
        <div className="display">
          <span>{result || ''}</span>
          {calc || '0'}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteValue}>DEL</button>
          <button onClick={resetValue}>CE</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
