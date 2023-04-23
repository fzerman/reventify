import React, { createContext, FC, ReactNode, useState } from 'react'
import { Revent } from '../classes/Revent'

export type ReventContextType = {
  revents: ReventProp
  register: (revent: Revent) => void
  run: (name: string, args: any) => false | any[]
  on: (name: string, cb: ReventFunc, priority?: number) => false | (() => void)
  off: (name: string, listener_id: string) => void
  once: (name: string, cb: ReventFunc, priority?: number) => void
  get: (name: string) => ReventObj | false
  getAll: () => ReventProp
  remove: (revent: Revent) => boolean
}

export const ReventContext = createContext<ReventContextType | null>(null)

export interface ReventProviderProp {
  revents?: ReventProp
  children: ReactNode
}

export type ReventFunc = (args: any) => void

export interface ReventProp {
  [key: string]: Revent
}

export type ReventObj = {
  name: string
  listeners: ReventFunc[]
}

export const ReventProvider: FC<ReventProviderProp> = ({ revents: _ = {}, children }) => {
  const [revents, setRevents] = useState<ReventProp>(_)

  /**
   * Register New Revent
   * @param revent
   */
  const register = (revent: Revent) => {
    if (!(revent.name in revents)) {
      setRevents({
        ...revents,
        [revent.name]: revent,
      })
    }
  }

  /**
   * Run a event with custom args
   * @param name
   * @param args
   * @returns if event has registered already, true, otherwise false.
   */
  const run = (name: string, args: any) => {
    if (name in revents) {
      return revents[name].run(args)
    } else {
      console.log(`ReventError: '${name}' Revent is not found!`)
      return false
    }
  }

  /**
   * Add an listener to an event
   * @param name
   * @param cb
   * @param priority
   * @returns unsubscribe function
   */
  const on = (name: string, cb: ReventFunc, priority?: number) => {
    if (name in revents) {
      const listener_id = revents[name].bind(cb, priority)
      return () => off(name, listener_id)
    } else {
      console.log(`ReventError: '${name}' Revent is not found!`)
      return false
    }
  }

  /**
   * Remove an listener from an event
   * @param name
   * @param listener_id
   */
  const off = (name: string, listener_id: string) => {
    if (name in revents) {
      return revents[name].untie(listener_id)
    } else {
      console.log(`ReventError: '${name}' Revent is not found!`)
    }
  }

  /**
   * Add only onetime listener to an event
   * @param name
   * @param cb
   * @param priority
   */
  const once = (name: string, cb: ReventFunc, priority?: number) => {
    revents[name].bindOnce(cb, priority)
  }

  /**
   * Get an event object
   * @param name
   * @returns if event has registered already, ReventObj, otherwise false
   */
  const get = (name: string): ReventObj | false => {
    if (name in revents) {
      return revents[name].export()
    }
    return false
  }

  /**
   * Returns all events
   * @returns ReventProp
   */
  const getAll = () => {
    return revents
  }

  /**
   * Remove an event
   * @param revent
   * @returns if event has registered already, true, otherwise false
   */
  const remove = (revent: Revent) => {
    if (revent.name in revents) {
      const tempObj = JSON.parse(JSON.stringify(revents))

      delete tempObj[revent.name]

      setRevents(tempObj)
      return true
    } else {
      console.log(`ReventError: '${revent.name}' Revent is not found!`)
      return false
    }
  }

  return (
    <ReventContext.Provider
      value={{
        revents: revents,
        register,
        run,
        on,
        off,
        once,
        get,
        getAll,
        remove,
      }}
    >
      {children}
    </ReventContext.Provider>
  )
}
