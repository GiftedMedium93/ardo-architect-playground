import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

interface UseUndoRedoReturn<T> {
  state: T;
  setState: (newState: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
  historyLength: number;
}

export function useUndoRedo<T>(
  initialState: T,
  maxHistoryLength: number = 50
): UseUndoRedoReturn<T> {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const isUndoRedoAction = useRef(false);

  const setState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      // Skip adding to history if this is an undo/redo action
      if (isUndoRedoAction.current) {
        isUndoRedoAction.current = false;
        return;
      }

      setHistory((currentHistory) => {
        const resolvedState =
          typeof newState === 'function'
            ? (newState as (prev: T) => T)(currentHistory.present)
            : newState;

        // Don't add to history if state hasn't changed
        if (JSON.stringify(resolvedState) === JSON.stringify(currentHistory.present)) {
          return currentHistory;
        }

        const newPast = [...currentHistory.past, currentHistory.present];

        // Limit history length
        if (newPast.length > maxHistoryLength) {
          newPast.shift();
        }

        return {
          past: newPast,
          present: resolvedState,
          future: [], // Clear future when new state is set
        };
      });
    },
    [maxHistoryLength]
  );

  const undo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.past.length === 0) {
        return currentHistory;
      }

      const previous = currentHistory.past[currentHistory.past.length - 1];
      const newPast = currentHistory.past.slice(0, currentHistory.past.length - 1);

      isUndoRedoAction.current = true;

      return {
        past: newPast,
        present: previous,
        future: [currentHistory.present, ...currentHistory.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory((currentHistory) => {
      if (currentHistory.future.length === 0) {
        return currentHistory;
      }

      const next = currentHistory.future[0];
      const newFuture = currentHistory.future.slice(1);

      isUndoRedoAction.current = true;

      return {
        past: [...currentHistory.past, currentHistory.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const clear = useCallback(() => {
    setHistory({
      past: [],
      present: initialState,
      future: [],
    });
  }, [initialState]);

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    clear,
    historyLength: history.past.length + 1 + history.future.length,
  };
}

