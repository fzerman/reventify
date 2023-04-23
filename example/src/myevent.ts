import { Revent } from 'reventify'

export const test = new Revent('hello')

test.bind(() => {
  console.log('Hello no args')
})

test.bind((args) => {
  console.log('Hello with args', args)
})
