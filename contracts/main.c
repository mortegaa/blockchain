// You can compile this file with stock clang as follows
// > make all
//
// For C programs that use the standard library, cross compile clang with wasi if your compiler doesn't support it
// > https://github.com/WebAssembly/wasi-sdk

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

char *portable_strstr(const char *haystack, const char *needle)
{
  if (!*needle)
    return (char *)haystack; // Return haystack if needle is empty

  for (; *haystack; haystack++)
  {
    const char *h = haystack, *n = needle;
    while (*h && *n && (*h == *n))
      h++, n++;
    if (!*n)
      return (char *)haystack; // Match found
  }
  return NULL; // No match
}

void uint8_to_string(const uint8_t *input, size_t len, char *output)
{
  // Copy input to output and ensure null-termination
  memcpy(output, input, len);
  output[len] = '\0'; // Null-terminate the string
}

bool inline is_valid_address(uint8_t *input, size_t len)
{
  // validate input is an address padded to 32 bytes
  if (len != 32)
    return false;

  if (!bebi32_is_u160(input))
    return false;

  return true;
}

ArbResult hola_mundo(uint8_t *input, size_t len)
{
  return _return_short_string(Success, "Hola Mundo");
}

extern ArbResult get_sender(uint8_t *input, size_t len)
{
  msg_sender_padded(buf_out);
  return _return_success_bebi32(buf_out);
}

extern ArbResult ping_pong(uint8_t *input, size_t len)
{
  if (len >= 32) // Ensure the input length is within bounds
    len = 31;    // Limit to 31 to reserve space for null-terminator in the string

  char str_content[32];
  uint8_to_string(input, len, str_content);

  if (portable_strstr(str_content, "ping") != NULL)
  {
    return _return_short_string(Success, "pong");
  }
  return _return_short_string(Success, "Nope!");
}

int handler(size_t args_len)
{

  uint8_t args[args_len];
  read_args(args);

  const ArbResult result = ping_pong(args, args_len);
  write_result(result.output, result.output_len);
  return result.status;
}

ENTRYPOINT(handler)
