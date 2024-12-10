use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn concat(str1: &str, str2: &str) -> String {
    format!("{}{}", str1, str2)
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_adds() {
        let result = add(1, 2);
        assert_eq!(result, 3);
    }

    #[test]
    fn it_concats() {
        let result = concat("Hello, ", "world!");
        assert_eq!(result, "Hello, world!");
    }

    #[test]
    fn it_calculates_fibonacci() {
        assert_eq!(fibonacci(0), 0);
        assert_eq!(fibonacci(1), 1);
        assert_eq!(fibonacci(2), 1);
        assert_eq!(fibonacci(3), 2);
        assert_eq!(fibonacci(10), 55);
    }
}
