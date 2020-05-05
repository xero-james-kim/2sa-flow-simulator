import React, { useEffect, useState } from 'react'

export const useTempStore = <T extends {id: string}>() => {
    const [items, setItem] = useState<T[]>([])
    
    const add = (item: T) => {
        setItem([...items, item])
    }

    const update = (push: T) => {
        const newItems = items.map(x => {
            if(x.id === push.id) {
                return push
            }
            return x
        })
        setItem(newItems)
    }

    const remove = (id: string| undefined) => {
        const newitems = items.filter(x => x.id !== id)
        setItem(newitems)
    }

    const find = (id: string | undefined) => {
        const push = items.find(x => x.id === id)
        if(!push) {
            throw new Error("Cant find item: " + id)
        }
        return { ...push }
    } 

    const getAll = () => {
        return items 
    }

    return {
        add, update, remove, find, getAll
    }
}

