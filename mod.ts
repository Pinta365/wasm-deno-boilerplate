import { ensureDir } from "@std/fs";
import * as path from "@std/path";
import { parseArgs } from "@std/cli/parse-args";
import { bold, cyan, green, red, yellow } from "@std/fmt/colors";

const parsedArgs = parseArgs(Deno.args, {
    string: ["name", "lang"],
    boolean: ["verbose", "help"],
    alias: {
        verbose: ["v"],
        help: ["h"],
    },
    default: {
        "verbose": false,
        "help": false,
        "lang": "assemblyscript",
    },
});

if (parsedArgs.help) {
    console.log(
        `${green("Usage:")} deno run -RWN jsr:@pinta365/wasm-deno-boilerplate ${green("--name <project_name>")} [options]
  
  ${yellow("Options:")}
    ${green("--name <project_name>")}         ${bold("Name of the project directory to create (required)")}
    ${green("--lang <rust|assemblyscript>")}  ${
            bold("Specify the language to use for WASM compilation (assemblyscript, rust) (default: assemblyscript)")
        }
    ${green("--verbose")}, ${green("-v")}                 ${bold("Enable verbose output")}    
    ${green("--help")}, ${green("-h")}                    ${bold("Show this help message")}`,
    );
    Deno.exit(0);
}

const projectName = parsedArgs.name;
let projectDir: string;
const baseUrl = "https://raw.githubusercontent.com/Pinta365/wasm-deno-boilerplate/main";

if (!projectName) {
    console.error(`${red("Error:")} Please provide a project name using ${green("--name <project_name>")}`);
    Deno.exit(1);
}

async function downloadAndSave(filePath: string) {
    const langFolder = parsedArgs.lang === "rust" ? "rust" : "assemblyscript";

    if (parsedArgs.verbose) {
        console.log(cyan(`Downloading ${filePath}...`));
    }
    const response = await fetch(`${baseUrl}/${langFolder}/${filePath}`);
    if (!response.ok) {
        throw new Error(`Failed to download ${filePath}`);
    }
    const content = await response.text();
    await Deno.writeTextFile(path.join(projectDir, filePath), content);
}

try {
    projectDir = path.join(Deno.cwd(), projectName);
    await ensureDir(projectDir);

    if (parsedArgs.lang === "assemblyscript") {
        await downloadAndSave("README.md");
        await downloadAndSave("main.ts");
        await downloadAndSave("main_test.ts");
        await downloadAndSave("LICENSE");
        await downloadAndSave("deno.json");
        await downloadAndSave(".gitignore");

        await ensureDir(path.join(projectDir, "lib/"));
        await downloadAndSave("lib/ascompile.ts");
        await downloadAndSave("lib/customTransform.ts");

        await ensureDir(path.join(projectDir, "as_lib/src"));
        await downloadAndSave("as_lib/src/index.ts");
    } else if (parsedArgs.lang === "rust") {
        await downloadAndSave("deno.json");
        await downloadAndSave("main.ts");
        await downloadAndSave("main_test.ts");
        await downloadAndSave("README.md");
        await downloadAndSave("LICENSE");
        await downloadAndSave(".gitignore");
        await downloadAndSave(".rustfmt.toml");
        await downloadAndSave("Cargo.toml");

        await ensureDir(path.join(projectDir, "rs_lib/src"));

        await downloadAndSave("rs_lib/Cargo.toml");
        await downloadAndSave("rs_lib/src/lib.rs");
    } else {
        console.error(`${red("Error:")} ${yellow(parsedArgs.lang)} is not a supported language for compile.`);
        Deno.exit(1);
    }

    console.log(bold(green(`Project "${projectName}" created successfully!`)));
    console.log(yellow(`Navigate to the project directory: ${bold(`cd ${projectName}`)}`));
    console.log(yellow(`Run the build task: ${bold("deno task build:demo")}`));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error(`${red("Error:")} ${error.message}`);
        if (parsedArgs.verbose) {
            console.error("Error details:", error);
            console.error("Parsed arguments:", parsedArgs);
        }
    } else {
        console.error(`${red("Error:")} An unexpected error occurred.`);
    }
    Deno.exit(1);
}
