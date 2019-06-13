import React, { useReducer, useContext, createContext } from 'react';

const context = createContext()
const defaultMapper = () => {}

export const StoreProvider = context.Provider;

export const connect = (mapStateToProps = defaultMapper, mapDispatchToProps = defaultMapper) => {
  return function(Component) {
    return function() {
      const { state, dispatch } = useContext(context)
      const stateToProps = mapStateToProps(state)
      const dispatchToProps = mapDispatchToProps(dispatch)
      const props = { ...props, ...stateToProps, ...dispatchToProps }

      return <Component {...props} />
    }
  }
}

const createStore = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}

export default createStore