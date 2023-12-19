import { useEffect, useState } from "react";

/* in props we have either initialValue of T type or initialValue of type returned by function */
export function useLocalStorage<T>(key:  string, initialValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        /* at first we have to check data at the localStorage */
        const jsonValue = localStorage.getItem(key)
        if (jsonValue == null) {
            if (typeof initialValue === 'function') {
                return (initialValue as () => T)()
            } else {
                return initialValue;
            }
        } else {
            return JSON.parse(jsonValue);
        }
    })
    /* every time value&key changes we store it */
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    /* we return tuple where's 1st value - type T, 2nd - type of setValue */
    return [value, setValue] as [T, typeof setValue]
}