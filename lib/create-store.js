import React, { useReducer, useContext, createContext } from 'react';

const context = createContext()

export const StoreProvider = context.Provider;

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return function(Component) {
    return function() {
      const { state, dispatch } = useContext(context)
      const stateToProps = typeof mapStateToProps === 'function' ? mapStateToProps(state) : {}
      const dispatchToProps = typeof mapDispatchToProps === 'function' ? mapDispatchToProps(dispatch) : {}
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