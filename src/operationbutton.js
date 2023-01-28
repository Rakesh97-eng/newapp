import { action } from "./App"

export default function OperationButton ({dispatch,digit}){
    return (
        <>
            <button onClick={() => { dispatch({ type:action.Choose_operation, payload: digit }) }}>{digit}</button>
        </>
    )
}