STACK_SIZE=1024
CC=clang
LD=wasm-ld
CFLAGS=-Iinclude/ -Iinterface-gen/ --target=wasm32 -Os --no-standard-libraries -mbulk-memory -Wall -g
LDFLAGS=-O2 --no-entry --stack-first -z stack-size=$(STACK_SIZE)

C_FILES = $(wildcard contracts/*.c) $(wildcard sdk/*.c)
OBJECTS = $(patsubst %.c, %.o, $(C_FILES))

all: ./contract.wasm

# Step 1: link
contract_unstripped.wasm: $(OBJECTS)
	@$(LD) $(LDFLAGS) $(OBJECTS) -o $@

# Step 2: strip symbols from wasm
contract.wasm: contract_unstripped.wasm
	@wasm-strip -o $@ $<

# Step 3: check the wasm using cargo-stylus
# cargo stylus check --wasm-file ./contract.wasm -e $ENDPOINT --private-key=$PRIVATE_KEY

# Step 4: deploy the wasm using cargo-stylus
# cargo stylus check --wasm-file ./contract.wasm -e $ENDPOINT --private-key=$PRIVATE_KEY

clean:
	@rm $(OBJECTS) contract_unstripped.wasm contract.wasm

re: clean all

.phony: all clean re
