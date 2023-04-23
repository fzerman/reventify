import React from 'react'
import { useEvent } from 'reventify'
import { test } from './myevent'

export const MyEventConsumer = () => {
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
