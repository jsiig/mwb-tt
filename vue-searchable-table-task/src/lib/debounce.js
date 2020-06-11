// Simple debounce method
// Would normally use lodash or throttle-debounce library

export default (callee, delay = 500) => {
  // Set timeout variable in outer function - context retained between calls
  let timeout

  // Return a function, so that any args caller is giving, is being passed on to callee
  return (...args) => {
    // Pass all given args into function call, called after timeout reached and not cleared
    const nextTick = () => callee(...args)

    // If timeout is already present when called, clear current timeout, set new timeout
    if (timeout) clearTimeout(timeout)

    // Finally, set the timeout with the delay to call nextTick function
    timeout = setTimeout(nextTick, delay)
  }
}
