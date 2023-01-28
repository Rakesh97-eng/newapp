import { action } from "./App"

export default function DigitButton ({dispatch,digit}){
    return (
        <>
            <button onClick={() => { dispatch({ type:action.Add, payload: digit }) }}>{digit}</button>
        </>
    )
}