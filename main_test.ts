import { assertEquals } from "@std/assert";
import { add, concat, fibonacci, fibonacciTS } from "./main.ts";

Deno.test("addTest", () => {
    assertEquals(add(2, 3), 5);
});

Deno.test("concatTest", () => {
    assertEquals(concat("Hello, ", "world!"), "Hello, world!");
});

Deno.test("fibonacciTest", () => {
    assertEquals(fibonacci(10), 55);
});

Deno.test("fibonacciTest-TS", () => {
    assertEquals(fibonacciTS(10), 55);
});

Deno.test("fibonacciBench", () => {
    const n = 40;

    const t1 = performance.now();
    fibonacci(n);
    const t2 = performance.now();
    console.log(`Rust fibonacci(${n}): ${t2 - t1} ms`);

    const t3 = performance.now();
    fibonacciTS(n);
    const t4 = performance.now();
    console.log(`TypeScript fibonacci(${n}): ${t4 - t3} ms`);
});
