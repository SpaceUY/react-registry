# State Management Module

A lightweight state management solution for React apps using Zustand.

## Features

- Simple and performant state management
- Persistent storage support
- TypeScript support
- Minimal boilerplate
- React hooks for easy state access

## Required Dependencies

```bash
npm install zustand
```

## Quick Start

1. Create your store:

```typescript
import { create } from 'zustand'

type Store = {
  count: number
  inc: () => void
}

const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

function Counter() {
  const count = useStore((state) => state.count)
  const inc = useStore((state) => state.inc)
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  )
}
```

2. Use in your components:

```typescript
import { useStore } from './state-management'

function TodoList() {
  const todos = useStore((useTodoStore) => state.todos)
  const addTodo = useStore((useTodoStore) => state.addTodo)
  
  return (
    <View>
      {todos.map((todo, index) => (
        <Text key={index}>{todo}</Text>
      ))}
      <Button 
        onPress={() => addTodo('New Todo')}
        title="Add Todo"
      />
    </View>
  )
}
```

## API Reference

### `createStore(config)`

Creates a Zustand store with persistence support.

```typescript
interface StoreConfig {
  name: string            // Store name for persistence
  initialState?: object   // Initial state
  persist?: boolean       // Enable persistence
}
```

### `useStore(store, selector?)`

React hook to access store state.

```typescript
const value = useStore(store)                    // Get entire state
const todos = useStore(store, state => state.todos)  // Select specific value
```

## Best Practices

1. **State Organization**
   - Keep related state together
   - Use selectors for derived state
   - Split large stores into domains

2. **Performance**
   - Use selectors to prevent unnecessary re-renders
   - Keep state minimal and flat
   - Avoid storing computed values

3. **Persistence**
   - Only persist necessary data
   - Use the `persist` option for important user data
   - Clear persisted data when needed using `reset()`

4. **TypeScript**
   - Define state interfaces
   - Use generics for type safety
   - Leverage type inference

## Features
- Configurable state management
- Type-safe state operations
- Easy-to-use interface
- Zustand implementation
- Extensible for other state management solutions

## Installation

Ensure you have the required dependencies:
```bash
npm install zustand
```

## Usage

1. Import and Create the Store:
```typescript
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))
```

2. Use the Store in Components:
```typescript
import { useEffect } from 'react'
import { store } from './store'

function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(store.getState().isLoading)

  useEffect(() => {
    return store.subscribe((state) => {
      setIsLoading(state.isLoading)
    })
  }, [])

  return isLoading ? <ActivityIndicator /> : null
}
```

## Extending with Other State Management Solutions

The module is designed to be flexible and support multiple state management solutions. To add support for another provider:

1. Create a New Adapter
   - Create a new directory inside `state/`
   - Implement the `StateManagement` interface

2. Example with Redux:
```typescript
import { createStore } from '@reduxjs/toolkit'
import { StateManagement } from '../abstract/state-management.interface'

export const createReduxStore = (): StateManagement<AppState> => {
  const store = createStore(reducer)
  
  return {
    getState: store.getState,
    setState: (partial) => store.dispatch(updateState(partial)),
    subscribe: store.subscribe,
    destroy: () => {},
  }
}
```

## Contributing

Feel free to submit issues and enhancement requests! 