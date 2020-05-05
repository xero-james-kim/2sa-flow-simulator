import React, { useState } from 'react'

export const useTimeoutManager = () => {
    const [timeouts, setTimeouts] = useState<number[]>([])

    const add = (t: number) => setTimeouts([...timeouts, t])

    const addTimeout = (cb: ()=> void, delay?: number) => {
        const timeout = setTimeout(cb, delay)
        add(timeout)
    }

    const clearTimeouts = () => timeouts.forEach(clearTimeout)

    return {
        addTimeout, clearTimeouts
    }
}