import { fibonacci } from "./wasm/package_bg.wasm";

/**
 * Calculates the nth Fibonacci number.
 *
 * @param n The index of the Fibonacci number to calculate.
 * @returns The nth Fibonacci number.
 */
export function fibonacciTS(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacciTS(n - 1) + fibonacciTS(n - 2);
}

if (import.meta.main) {
    const n = 40;

    const t1 = performance.now();
    fibonacci(n);
    const t2 = performance.now();
    console.log(`Rust fibonacci(${n}): ${t2 - t1} ms`);

    const t3 = performance.now();
    fibonacciTS(n);
    const t4 = performance.now();
    console.log(`TypeScript fibonacci(${n}): ${t4 - t3} ms`);
}
