// Adapted from:
// https://github.com/OffchainLabs/zig-on-stylus/blob/main/WALKTHROUGH.md
//
// Copyright 2022-2023, Offchain Labs, Inc.
// For licensing, see https://github.com/stylus-sdk-c/blob/stylus/licenses/COPYRIGHT.md

#ifndef STYLUS_SDK_H
#define STYLUS_SDK_H

#include "stylus_entry.h"

#ifdef __cplusplus
extern "C" {
#endif

#define VM_HOOK(name) extern __attribute__((import_module("vm_hooks"), import_name(#name)))

VM_HOOK(pay_for_memory_grow) void pay_for_memory_grow(const uint16_t pages);

#ifdef __cplusplus
}
#endif

#endif
