export type EventFunc = (args: any) => void

export class Revent {
  name: string
  listeners: EventFunc[]
  constructor(name: string) {
    this.name = name
    this.listeners = []
  }

  run(args: any) {
    return this.listeners.map(function (e) {
      const res: any = e(args)
      return res ? res : undefined
    })
  }

  bind(listener: EventFunc, priority: number = 9999) {
    let index = priority
    if (this.listeners.length > priority)
      this.listeners = [...this.listeners.slice(0, priority), listener, ...this.listeners.slice(priority + 1)]
    else {
      this.listeners.push(listener)
      index = this.listeners.length - 1
    }

    return this.name + '#' + index
  }

  bindOnce(listener: EventFunc, priority: number = 999) {
    this.bind((args: any) => {
      const res: any = listener(args)
      this.untie(this.getIndex(listener))
      return res
    }, priority)
  }

  untie(listener_id: string) {
    let index = parseInt(listener_id.replace(this.name + '#', ''))
    if (this.listeners.length > index) this.listeners.splice(index, 1)
  }

  getIndex(listener: EventFunc) {
    return this.name + '#' + this.listeners.indexOf(listener)
  }

  export() {
    return {
      name: this.name,
      listeners: this.listeners,
    }
  }

  import(eventObject: { name: string; listeners: EventFunc[] }) {
    this.name = eventObject.name
    this.listeners = eventObject.listeners
  }
}
