#ifndef HOOKS_H
# define HOOKS_H

  VM_HOOK(pay_for_memory_grow)
  void pay_for_memory_grow(const uint16_t pages);

  VM_HOOK(storage_cache_bytes32)
  // Store 32bytes slot in the permanent storage - https://github.com/OffchainLabs/stylus-sdk-rs/blob/main/stylus-sdk/src/hostio.rs#L113
  void storage_cache_bytes32(const uint8_t *key, const uint8_t *value);

  VM_HOOK(storage_flush_cache)
  // Confirm to store all cached bytes - https://github.com/OffchainLabs/stylus-sdk-rs/blob/main/stylus-sdk/src/hostio.rs#L119
  void storage_flush_cache(bool clean_cache);


#endif
