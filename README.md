# Arbitrum Stylus Starter Template for C

## Register and Storage Slots

Storage slots are pretty similar to registers in 32bit architectures.
Since both have:

1. Fixed Size: Storage slots in Ethereum can hold exactly 32 bytes. Similar to how registers have a fixed size in assembly (e.g., 32-bit, 64-bit).

2. Direct Addressing: Just as you access a specific register by its identifier (eax, r1), you access storage slots using their indexes: 0x01, 0x02.

3. Explicit Management: Like assembly programming, developers must explicitly manage how storage slots are allocated and used. Miss assignment of memory/slots can cause data corruption.

## Requisitos

- Brew (Mac) / Chocolatey (Windows)
- Docker (Docker Desktop)
- rust, cargo y rustup
- LLVM (con wasm-ld): Disponible desde la versión 15 (`llvm@15`)

## Verificar si tenemos `wasm-strip` instalado

Si no, podemos instalarlo con `brew install wabt`

## Instalando Cargo Stylus

- fork / git clone de este repositorio
- `git submodule update --init --recursive`
- `cargo install cargo-stylus`
- `rustup target add wasm32-unknown-unknown` (**opcional**, solventa un error de target wasm32 not found al hacer make)

## Antes de validar entorno

- `cd <carpeta_clon> && npm install`

## Validar entorno de desarollo

- `make` para generar el archivo contract.wasm
- `cargo stylus check --wasm-file ./contract.wasm -e https://sepolia-rollup.arbitrum.io/rpc` (si tenemos output en verde estamos listos 🚀🚀)

## Frontend
-  `cd frontend && npm install `
-  `npm run dev`
-  Acceder a [localhost:3000](http://localhost:3000/)
  
## ¿Cómo Jugar?
- Al acceder a la página principal haz click en el botón Connect Wallet arriba a la derecha
  
![Captura de pantalla 2024-12-09 152826](https://github.com/user-attachments/assets/88d21ba4-c3a0-41e4-bb1a-0a462aae8c99)

- Una vez conectada, nos creamos una cuenta haciendo click en registrar y rellenamos los datos

![Captura de pantalla 2024-12-09 153227](https://github.com/user-attachments/assets/072a0e47-e621-41c8-84a6-9f0e967f1f76)

- Una vez la transacción al hacer el registro se complete hacemos click en Sign In e iniciamos sesión con los datos registrados


![Captura de pantalla 2024-12-09 153414](https://github.com/user-attachments/assets/a0737174-a8a4-485e-a7d7-9aaa011b4c0d)


- Al acceder nos dará permiso para jugar al Blockdle. Una vez acabada la partida aparecerá un botón para subir la puntuación Obtenida. Tendremos que realizar otra transacción en la blockchain
   
![Captura de pantalla 2024-12-09 154014](https://github.com/user-attachments/assets/c8695852-ce9f-41b4-adaf-b1215331d01f)

- Una vez hecha la transacción podemos ir a ver nuestras estadisticas de las últimas cinco partidas
  
 ![Captura de pantalla 2024-12-09 154135](https://github.com/user-attachments/assets/dc2eb666-758d-40c3-9b3e-bd93c0a5d5c2)


## Extras updates
La idea futura es que el smart contract se encargue de toda la gestión del juego como sumar los scores, ordenarlos e incluir varios jugadores.
Parte de esas funciones podemos encontrarlas en el repositorio de nuestra compañera Gema -> https://github.com/gbrasam/blockchain
