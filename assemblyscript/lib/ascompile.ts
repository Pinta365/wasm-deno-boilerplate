/**
 * Deno wrapper script to compile AssemblyScript to WebAssembly.
 *
 * This script provides a command-line interface for compiling AssemblyScript
 * code to WebAssembly using the AssemblyScript compiler (`asc`).
 */
import asc from "assemblyscript/asc";
import { parseArgs } from "@std/cli/parse-args";
import { yellow } from "@std/fmt/colors";

/**
 * Parses the command-line arguments. Just using it to extract -h and --help at
 * the moment but might want to parse other things later.
 *
 * @returns An object containing the parsed arguments.
 */
const parsedArgs = parseArgs(Deno.args, {
    boolean: ["help"],
    alias: {
        help: ["h"],
    },
    default: {
        help: false,
    },
});

/**
 * Displays the help message.
 */
if (parsedArgs.help) {
    console.log(
        yellow(
            "This project is just a Deno wrapper around the AssemblyScript compiler.\nBelow are the options available.",
        ),
    );

    const { error, stdout, stderr } = await asc.main(["-h"]);

    if (error) {
        console.error("Help command failed:", error.message);
        console.error("AssemblyScript compiler output:", stderr.toString());
        Deno.exit(1);
    } else {
        console.log(stdout.toString());
    }

    Deno.exit(0);
}

/**
 * Compiles the AssemblyScript code to WebAssembly.
 */
try {
    const { error, stdout, stderr } = await asc.main(Deno.args, {
        //stdout: Deno.stdout,
    });

    if (error) {
        console.error("Compilation failed:", error.message);
        console.error("AssemblyScript compiler output:", stderr.toString());
        Deno.exit(1);
    } else {
        if (stdout.toString()) {
            console.log(stdout.toString());
        }
    }
} catch (err) {
    console.error("An unexpected error occurred:", err);
    Deno.exit(1);
}
