// Adapted from:
// https://github.com/OffchainLabs/zig-on-stylus/blob/main/WALKTHROUGH.md
//
// Copyright 2022-2023, Offchain Labs, Inc.
// For licensing, see https://github.com/stylus-sdk-c/blob/stylus/licenses/COPYRIGHT.md

#ifndef STYLUS_SDK_H
#define STYLUS_SDK_H

#include "stylus_entry.h"

#ifdef __cplusplus
extern "C"
{
#endif


  // Define the FunctionRegistry struct
  typedef struct
  {
    uint32_t signature;
    ArbResult (*function)(uint8_t *input, size_t len);
  } FunctionRegistry;

  // Iterate through the registry to find the function with the matching signature
  ArbResult call_function(FunctionRegistry *registry, uint8_t registry_size, uint32_t signature, uint8_t *input, size_t len)
  {
    for (uint8_t i = 0; i < registry_size; i++) // Loop until the sentinel is found
    {
      if (registry[i].signature == signature)
        return registry[i].function(input, len); // Call the function if signature matches
    }
    return _return_nodata(Success); // Return failure if function not found
  }

  uint32_t to_function_selector(const char *function_abi)
  {
    uint8_t result[16];
    native_keccak256((uint8_t *)function_abi, strlen(function_abi), result);
    return *((uint32_t *)result);
  }

#ifdef __cplusplus
}
#endif

#endif
