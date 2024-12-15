/**
 * customTransform.ts
 *
 * This Transform provides hooks into the AssemblyScript compilation
 * process, allowing you to:
 *
 * - Analyze the parsed code (AST) after parsing.
 * - Analyze or modify the initialized program before compilation.
 * - Analyze or modify the compiled WebAssembly module before it's emitted.
 *
 * Extend this Transform with your own custom logic within the provided hooks.
 */
import { Transform } from "assemblyscript/transform";
import { Parser, Program } from "assemblyscript";
import { bold, yellow } from "@std/fmt/colors";
import binaryen from "binaryen";

export default class CustomTransform extends Transform {
    /*
     * Called when parsing is complete, before a program is initialized from the AST.
     *
     * You can add your custom logic here to analyze or modify the parsed AST.
     */
    override afterParse(_parser: Parser): void | Promise<void> {
        this.log(yellow(bold("Parsing completed.")));
    }

    /*
     * Called once the program is initialized, before it is being compiled.
     *
     * You can add your custom logic here to analyze or modify the initialized program.
     */
    override afterInitialize(_program: Program): void | Promise<void> {
        this.log(yellow(bold("Initialization completed.")));
    }

    /*
     * Called with the resulting module before it is being emitted.
     *
     * You can add your custom logic here to analyze or modify the compiled module.
     */
    // @ts-ignore Need to figure out why the Module type is not compatible to the function signature.
    override afterCompile(module: binaryen.Module): void | Promise<void> {
        this.log(
            yellow(
                bold(
                    `Compilation completed, compiled ${module.getNumFunctions()} functions.`,
                ),
            ),
        );
    }
}
