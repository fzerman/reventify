# reventify

React Event Library for Event Driven Development

## Usage

- Without Provider (Recommended)
- With Provider

### Without Provider

```js
import { Revent } from 'reventify'

export const test = new Revent('hello')

// add listener that doesn't take arguments
test.bind(() => {
  console.log('Hello no args')
})

// add listener that takes arguments
test.bind((args) => {
  console.log('Hello with args', args)
})

// in component
const MyComponent = () => (
  <div>
    <button
      onClick={() =>
        test.bind(() => {
          console.log('Hello ' + Math.random())
        })
      }
    >
      Add new listener without arg
    </button>
    <button
      onClick={() =>
        test.bind((arg) => {
          console.log('Hello ' + Math.random(), arg)
        })
      }
    >
      Add new listener with arg
    </button>
  </div>
)

// in component
const MyComponent2 = () => (
  <div>
    <button onClick={() => test.run()}>Run event without arg</button>
    <button onClick={() => test.run({ foo: 'bar' })}>Run event with arg</button>
  </div>
)
```
