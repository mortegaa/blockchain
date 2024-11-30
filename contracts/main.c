// You can compile this file with stock clang as follows
//     clang *.c -o siphash.wasm --target=wasm32 --no-standard-libraries -mbulk-memory -Wl,--no-entry -O3
//
// For C programs that use the standard library, cross compile clang with wasi if your compiler doesn't support it
//     https://github.com/WebAssembly/wasi-sdk

#include "../include/stylus_sdk.h"
#include "../stylus-sdk-c/include/stylus_utils.h"
#include "../stylus-sdk-c/include/storage.h"

// function hola() public pure returns (string memory);
ArbResult hola(uint8_t *input, size_t len)
{
    return _return_short_string(Success, "Hello, World!");
}

ENTRYPOINT(hola);
