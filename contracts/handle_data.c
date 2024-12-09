#include "../include/handle_data.h"


// Address from the data is goig to be read/write
char		ACTUAL_ADDRESS = 0;

// buffer used to write output, avoiding malloc
uint8_t buf_out[32];


// succeed and return a bebi32
ArbResult inline _return_success_bebi32(bebi32 const retval)
{
  ArbResult res = {Success, retval, 32};
  return res;
}


ArbResult set_value(uint8_t *input, size_t len)
{

  uint8_t *slot_address = (uint8_t *)(STORAGE_SLOT__value + ACTUAL_ADDRESS); // Get the slot address

  // Allocate a temporary buffer to store the input
  storage_cache_bytes32(slot_address, input);

  // Flush the cache to store the value permanently
  storage_flush_cache(false);
  return _return_success_bebi32(input);
}

ArbResult get_value(uint8_t *input, size_t len)
{

  uint8_t *slot_address = (uint8_t *)(STORAGE_SLOT__value + ACTUAL_ADDRESS); // Get the slot address

  storage_load_bytes32(slot_address, buf_out);

  return _return_success_bebi32(buf_out);
}


/*
 *	Function to be able to access the variable from outside
 */

void	set_actual_address(char i)
{
	ACTUAL_ADDRESS = i;
}
