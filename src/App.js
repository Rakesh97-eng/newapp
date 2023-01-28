import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import { useEffect, useReducer } from 'react';
import './App.css';
import DigitButton from './digitbutton';
import OperationButton from "./operationbutton"

const intialstate = {currentvalue: 0||"" ,previousvalue:0||"",operation:""}

export const action= {
  Add: "add_digit",
  Equate: "Evaluate",
  Choose_operation: "choose",
  Delete: "del",
  Clear:"clr"
}

const reducer = (state, { type, payload }) => { 
  console.log("state",state);
  switch (type) {
    case action.Add:
      if (state.overwrite) {
        return {
         ...state,currentvalue:payload,overwrite:false
       }
     }
     if (payload === 0 && state.currentvalue === 0) { return state }
     if (payload === "."&& state.currentvalue.includes(".") ) { return state }

    return {...state,currentvalue:`${state.currentvalue ||""}${payload}` }
    
    case action.Choose_operation:
      if (state.currentvalue === "" && state.previousvalue === "") {
        return state
      }
      if (state.currentvalue === "") {
        return {
          ...state,operation:payload
        }
      }
      if (state.previousvalue === "") {
        return {
          ...state,
          operation: payload,
          previousvalue: state.currentvalue,
          currentvalue:""
        }
      }
      return {
        ...state,
        previousvalue: calculate(state),
        operation: payload,
        currentvalue:""
      }
    
    case action.Clear:
      return {}
     
    case action.Equate:
      return {
        ...state,
        overwrite:true,
        currentvalue: calculate(state),
        previousvalue:'',
        operation: "",
      }
    case action.Delete:
      if (state.overwrite) {
        return {
          ...state,currentvalue:""
        }
      }
      if (state.currentvalue.length === 1) {
        return {
          ...state,currentvalue:''
        }
      }
      return {
        ...state,currentvalue:state.currentvalue.slice(0,-1)
      }
      
  } 


}

function calculate({ currentvalue, previousvalue, operation }) {
  console.log("calculate",currentvalue, previousvalue, operation);
  let current = parseFloat(currentvalue);
  let prev = parseInt(previousvalue);
  let computation = "";
  switch (operation) {
    case "+":
      console.log("current",current,prev);
      computation = current + prev;
      // console.log("xom",computation);
      break;
    case "-":
      computation = current - prev;
      break;
    case "*":
      computation = current * prev;
      break;
    case "/":
      computation = current / prev;
      break;
  }
  return computation;
  
}

function App() {
  const [state, dispatch] = useReducer(reducer, intialstate)

  return (
    <>
      <div className='output'>{state.previousvalue}{ state.operation}</div>  
      <div className='output' style={{"fontSize":"2rem"}}>{state.currentvalue}</div>
     
      <div className='calc-grid'>
         <button className='SpanTwo' onClick={()=>dispatch({type:action.Clear,payload:"Ac"})}>Ac</button>  
         <button onClick={()=>dispatch({type:action.Delete,payload:"Ac"})}>Del</button>
        <OperationButton digit={"/"} dispatch={dispatch} />
        <DigitButton digit={"1"} dispatch={dispatch} />
        <DigitButton digit={"2"} dispatch={dispatch} />
        <DigitButton digit={"3"} dispatch={dispatch} />
        <OperationButton digit={"*"} dispatch={dispatch} />
        <DigitButton digit={"4"} dispatch={dispatch} />
        <DigitButton digit={"5"} dispatch={dispatch} />
        <DigitButton digit={"6"} dispatch={dispatch} />
        <OperationButton digit={"+"} dispatch={dispatch} />
        <DigitButton digit={"7"} dispatch={dispatch} />
        <DigitButton digit={"8"} dispatch={dispatch} />
        <DigitButton digit={"9"} dispatch={dispatch} />
        <OperationButton digit={"-"} dispatch={dispatch} />
        <DigitButton digit={"."} dispatch={dispatch} />
        <DigitButton digit={"0"} dispatch={dispatch} />

      <button className='equalspan' onClick={()=>dispatch({type:action.Equate,payload:"="})}>=</button>

      </div>
      
    </>
  );
}

export default App;
