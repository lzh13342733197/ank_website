// requestManager.ts
type RetryableRequest = () => void
const retryQueue = new Set<RetryableRequest>()

export const registerRetry = (fn: RetryableRequest) => {
  retryQueue.add(fn)
}

export const clearRetryQueue = () => {
  retryQueue.clear()
}

export const retryAll = () => {
  retryQueue.forEach((fn) => fn())
}
