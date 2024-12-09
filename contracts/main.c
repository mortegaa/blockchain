#include "../include/stylus_sdk.h"
#include "../stylus-sdk-c/include/storage.h"
#include "../stylus-sdk-c/include/string.h"
#include "../stylus-sdk-c/include/stdlib.h"

#include "../include/handle_data.h"
#include "../include/player.h"

int handler(size_t argc)
{
  // Save the function calldata
  uint8_t argv[argc];
  read_args(argv); // 4 bytes for selector + function arguments

  // Define the registry array with registered functions
  FunctionRegistry registry[] = {
      {to_function_selector("set_value(bytes32)"), set_value},
      {to_function_selector("get_value()"), get_value},
      {to_function_selector("add_player(bytes8)"), add_player},
      {to_function_selector("get_player_info(bytes8)"), get_player_info},
      {to_function_selector("set_player_info(bytes32)"), set_player_info},
      // Add more functions as needed here
  };

  uint32_t signature = *((uint32_t *)argv); // Parse function selector

  // Call the function based on the signature
  ArbResult res = call_function(registry,
                                sizeof(registry) / sizeof(registry[0]),
                                signature, argv + 4, argc - 4 // Exclude the selector from calldata
  );
  return (write_result(res.output, res.output_len), res.status);
}

ENTRYPOINT(handler)
