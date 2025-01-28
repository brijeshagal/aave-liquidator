# Task

### Structure
- `server` directory contains the database interactions with results file inside it.
- `simulator` directory has foundry scripts to do simulations and make liquidationCalls.
- `blockData` directory is for getting the user addresses for WBTC suppliers and USDC borrowers. 

`blockData` setup is required since getting user data by listening to events across blocks is not directly viable task in foundry.

### Getting Users
Run `findUsers.ts` inside blockData in order to get the user's list by looking at past `10_000 blocks`.
- `suppliers.json`: WBTC suppliers.
- `borrowers.json`: USDC borrowers who are also WBTC suppliers.

> We use the users from `borrowers.json` into the foundry `simulator` project. 
  

## Usage
Inside `simulator` directory.
Make sure you have `FORK_URL` defined and source it.

### Install

```shell
$  forge install
```

### Test

```shell
$ forge test --fork-url FORK_URL  -vvv
```


## Getting data from database
- GET /userData/:address

Request
```bash
GET /userData/0x64a164b1a3c68Cb3849045d6FAc0AE9413f3F011
```

Response
```json
{
  "beforeSimulation": {
    "totalCollateralBase": "10970243643655",
    "totalDebtBase": "4897356619700",
    "healthFactor": "1770522600103432284"
  },
  "afterSimulation": {
    "totalCollateralBase": "2289037661152",
    "totalDebtBase": "4897356619700",
    "healthFactor": "387897492975786037"
  },
  "afterLiquidation": {
    "totalCollateralBase": "2288995501163",
    "totalDebtBase": "4897316467500",
    "healthFactor": "387940268629372582"
  }
}
```

```
GET /userData
```

Gets data for all the users.