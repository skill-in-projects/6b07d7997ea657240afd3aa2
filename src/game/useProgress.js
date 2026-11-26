import { useContext } from 'react'
import { ProgressContext } from './progressContext.js'

export function useProgress() {
  return useContext(ProgressContext)
}
