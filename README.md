# WASM-DENO-BOILERPLATE (WIP)

This repository provides a boilerplate for creating WebAssembly (WASM) modules with Deno using either Rust or AssemblyScript. It includes the
necessary files and configuration to get started quickly.

## Getting Started

### Prerequisites

- **Deno:** Requires at least v2.1.0 for WASM module support. [Install Deno](https://deno.land/manual/getting_started/installation).

### Compilers

- **AssemblyScript:** No additional requirements, as the compiler is included as an npm package.

- **Rust:**
  - Requires Rust and Cargo. [Install Rust](https://www.rust-lang.org/tools/install)
  - Ensure your Rust installation is up-to-date. You can check your Rust version with `rustc --version` and update it with `rustup update`.

### Usage

1. Generate a new project using the boilerplate generator:

   ```bash
   deno run -RWN jsr:@pinta365/wasm-deno-boilerplate --name <project_name> [options]
   ```

   Replace `<project_name>` with the desired name for your project. Default compiler language is set to AssemblyScript.

   Available options:
   ```
   --name <project_name>         Name of the project directory to create (required)
   --lang <rust|assemblyscript>  Specify the language for WASM compilation (assemblyscript, rust) (default: assemblyscript)
   --verbose, -v                 Enable verbose output
   --help, -h                    Show this help message
   ```

2. Navigate to the project directory:

   ```
   cd <project_name>
   ```

3. Build the WASM test module:

   ```bash
   deno task build:demo
   ```

   The `build:demo` task will go through these steps.
   - Format code
   - Compile the source code into a WASM binary (`/wasm`).
   - Run tests
