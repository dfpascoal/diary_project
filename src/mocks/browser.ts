
// @ts-ignore - MSW types may not be available
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// @ts-ignore
export const worker = setupWorker(...handlers)