import { assertEquals } from "@std/assert";
import { fibonacci } from "./wasm/package.wasm";

Deno.test("fibonacciTest", () => {
    const expects = 55;
    console.log(`Expecting ${expects} to be the 10th Fibonacci number.`);
    const got = fibonacci(10);
    console.log(`Got ${got} from compiled function.`);
    assertEquals(got, expects);
});
