# Rafiki

![Rafiki](https://github.com/interledger/rafiki/assets/20246798/528b1978-0e02-4bc4-a6b4-e8e81d2f3c3a)

## What is Rafiki?

Rafiki is open source software that provides an efficient solution for an [Account Servicing Entity](https://rafiki.dev/concepts/account-servicing-entity/) to enable Interledger functionality on its users' accounts.

This includes

- sending and receiving payments (via [SPSP](https://rafiki.dev/reference/glossary/#simple-payments-setup-protocol-spsp) and [Open Payments](https://rafiki.dev/concepts/open-payments/overview/))
- allowing third-party access to initiate payments and view transaction data (via [Open Payments](https://rafiki.dev/concepts/open-payments/overview/))

**❗ Rafiki is intended to be run by [Account Servicing Entities](https://rafiki.dev/reference/glossary/#account-servicing-entity) only and should not be used in production by non-regulated entities.**

Rafiki is made up of several components, including an Interledger connector, a high-throughput accounting database called [TigerBeetle](https://rafiki.dev/concepts/accounting/tigerbeetle/), and several APIs:

- the [Admin API](https://rafiki.dev/apis/backend/schema/) to create [peering relationships](https://rafiki.dev/concepts/interledger-protocol/peering/), add supported [assets](https://rafiki.dev/concepts/asset/), and issue [wallet addresses](https://rafiki.dev/reference/glossary/#wallet-address)
- the [Open Payments](https://rafiki.dev/reference/glossary/#open-payments) API to allow third parties (with the account holder's consent) to initiate payments and to view the transaction history
- the [SPSP](https://rafiki.dev/reference/glossary/#simple-payments-setup-protocol-spsp) API for simple Interledger Payments

Additionally, this package also includes a reference implementation of a [GNAP](https://rafiki.dev/reference/glossary/#grant-negotiation-authorization-protocol) authorization server, which handles the access control for the [Open Payments](https://rafiki.dev/reference/glossary/#open-payments) API. For more information on the architecture, check out the [Architecture documentation](https://rafiki.dev/introduction/architecture/).

### New to Interledger?

Never heard of Interledger before? Or would you like to learn more? Here are some excellent places to start:

- [Interledger Website](https://interledger.org/)
- [Interledger Specs](https://interledger.org/rfcs/0027-interledger-protocol-4/)
- [Interledger Explainer Video](https://twitter.com/Interledger/status/1567916000074678272)
- [Open Payments](https://openpayments.guide/)
- [Web monetization](https://webmonetization.org/)

## Contributing

Please read the [contribution guidelines](.github/contributing.md) before submitting contributions. All contributions must adhere to our [code of conduct](.github/code_of_conduct.md).

## Community Calls

Our Rafiki community calls are open to our community members. We have them every Tuesday at 14:30 GMT, via Google Meet.

**Google Meet joining info**

Video call link: https://meet.google.com/sms-fwny-ezc

Or dial: ‪(GB) +44 20 3956 0467‬ PIN: ‪140 111 239‬#

More phone numbers: https://tel.meet/sms-fwny-ezc?pin=5321780226087

[Add to Google Calendar](https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=YjN1NW5ibDloN2dua2IwM2thOWlrZXRvMTVfMjAyMzA0MTdUMTUwMDAwWiBjX2NqMDI3Z21oc3VqazkxZXZpMjRkOXB2bXQ0QGc&tmsrc=c_cj027gmhsujk91evi24d9pvmt4%40group.calendar.google.com&scp=ALL)

## Local Development Environment

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [NVM](https://github.com/nvm-sh/nvm)

### Environment Setup

```sh
# install node 18
nvm install lts/hydrogen
nvm use lts/hydrogen

# install pnpm
corepack enable

# if moving from yarn run
pnpm clean

# install dependencies
pnpm i
```

### Local Development

The Rafiki local environment is the best way to explore Rafiki locally. The [localenv](localenv) directory contains instructions for setting up a local playground. Please refer to the README for each individual package for more details.

### Useful commands

```sh
# build all the packages in the repo:
pnpm -r build

# build specific package (e.g. backend):
pnpm --filter backend build

# generate types from specific package GraphQL schema:
pnpm --filter backend generate

# run individual tests (e.g. backend)
pnpm --filter backend test

# run all tests
pnpm -r --workspace-concurrency=1 test

# format and lint code:
pnpm format

# check lint and formatting
pnpm checks

# verify code formatting:
pnpm check:prettier

# verify lint
pnpm check:lint
```
