#ifndef HANDLE_DATA_H
# define HANDLE_DATA_H

#include "../stylus-sdk-c/include/storage.h"
#include "../stylus-sdk-c/include/stylus_utils.h"
#include "../stylus-sdk-c/include/hostio.h"
#include "../include/hooks.h"

#define STORAGE_SLOT__value 0x0


/*
 * General utils/helpers
 */


ArbResult	_return_success_bebi32(bebi32 const retval);
ArbResult	set_value(uint8_t *input, size_t len);
ArbResult	get_value(uint8_t *input, size_t len);
void		set_actual_address(char i);

#endif
