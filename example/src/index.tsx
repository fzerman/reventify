import React from 'react'
import ReactDOM from 'react-dom/client'
import { EventProvider, useEvent } from 'reventify'
import { MyEventConsumer } from './consumer'
import { test } from './myevent'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

export const MyEventConsumer2 = () => {
  const revent = useEvent()

  return (
    <>
      <button onClick={() => revent?.run('hello', {})}>Consume without arg</button>
      <button
        onClick={() =>
          test.run({
            foo: 'bar',
          })
        }
      >
        Consume with arg
      </button>

      <button
        onClick={() =>
          test.bind(() => {
            console.log('Hello ' + Math.random())
          })
        }
      >
        Add no arg
      </button>
    </>
  )
}

root.render(
  <React.StrictMode>
    <EventProvider
      events={{
        hello: test.export().listeners,
        hello1: [],
      }}
    >
      <MyEventConsumer />
      <MyEventConsumer2 />
    </EventProvider>
  </React.StrictMode>,
)
