import React, { useReducer, useContext, createContext } from 'react';

const MyContext = createContext()
export const MyProvider = MyContext.Provider;

export const connect = (mapStateToProps, mapDispatchToProps) => {
    return function (Component) {
        return function () {
            const {state, dispatch} = useContext(MyContext)
            const stateToProps = mapStateToProps(state)
            const dispatchToProps = mapDispatchToProps(dispatch)
            const props = {...props, ...stateToProps, ...dispatchToProps}

            return (
                <Component {...props} />
            )
        }
    }
}

const createStore = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

export default createStore