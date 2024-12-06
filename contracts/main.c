#include "../include/stylus_sdk.h"
#include "../stylus-sdk-c/include/stylus_utils.h"
#include "../stylus-sdk-c/include/storage.h"
#include "../stylus-sdk-c/include/string.h"

/**
 * General utils/helpers
 */

// buffer used to write output, avoiding malloc
uint8_t buf_out[32];

// succeed and return a bebi32
ArbResult inline _return_success_bebi32(bebi32 const retval)
{
  ArbResult res = {Success, retval, 32};
  return res;
}

ArbResult hola_mundo(uint8_t *input, size_t len)
{
  return _return_short_string(Success, "Hola Mundo");
}

char *ft_strnstr(const char *haystack, const char *needle, size_t len)
{
  int i;
  size_t limit;

  i = 0;
  limit = 0;
  if ((*needle == 0 && *haystack == 0) || (*needle == 0 && len == 0))
    return ((char *)haystack);
  while (*haystack && len && limit < len)
  {
    i = 0;
    while (limit + i < len && needle[i] && needle[i] == haystack[i])
      ++i;
    if (needle[i] == 0)
      return ((char *)haystack);
    haystack++;
    limit++;
  }
  return (NULL);
}

int handler(size_t argc)
{
  // Save the function calldata (selector(bytes4) + fn_args(bytes))
  uint8_t argv[argc];
  read_args(argv); // 4 btes (firma del a funcion)

  // Define the registry array with registered functions
  FunctionRegistry registry[] = {
      // balance()
      // address: 0x82B36e0c4C6E9cafA5CeACf481fa13e6CE2ac385
      // uint256: 100000000000000000000....32bytes
      // string: "242242121"
      // bytes32: 0x82B36ac385
      {to_function_selector("hola_mundo()"), hola_mundo}, // Add more functions as needed here
  };

  uint32_t signature = *((uint32_t *)argv); // Take function selector

  // Call the function based on the signature
  ArbResult res = call_function(registry,
                                sizeof(registry) / sizeof(registry[0]),
                                signature, argv + 4, argc - 4 // Exclude the selector from calldata
  );
  return (write_result(res.output, res.output_len), res.status);
}

ENTRYPOINT(handler)
