import { instantiate } from "./lib/rs_lib.generated.js";

const wasm = await instantiate();

export const add = wasm.add;
export const concat = wasm.concat;
export const fibonacci = wasm.fibonacci;

export function fibonacciTS(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacciTS(n - 1) + fibonacciTS(n - 2);
}
