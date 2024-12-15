// WebAssembly script module.
// @ts-nocheck AssemblyScript

/**
 * Calculates the nth Fibonacci number.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The nth Fibonacci number.
 */
export function fibonacci(n: i32): i32 {
    // Base case: for n <= 1, return n
    if (n <= 1) {
        return n;
    }
    // Recursive step: calculate the nth Fibonacci number by summing
    // the (n-1)th and (n-2)th Fibonacci numbers.
    return fibonacci(n - 1) + fibonacci(n - 2);
}
