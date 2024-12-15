import { assertEquals } from "@std/assert";
import { fibonacci } from "./wasm/package_bg.wasm";

Deno.test("fibonacciTest", () => {
    assertEquals(fibonacci(10), 55);
});
