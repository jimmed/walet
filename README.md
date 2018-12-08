# walet

> WAL theme exchange

## Overview

Web UI, API and CLI for previewing and sharing WAL-based terminal themes.

## Project Structure/Standards

- [Yarn workspace setup](https://medium.com/trabe/monorepo-setup-with-lerna-and-yarn-workspaces-5d747d7c0e91) (monorepo)
- Babel + (prettier-)ESlint
- External-facing type definitions (TypeScript + Flow)
- Jest for unit tests

```
docs/
packages/
  core/     Core functionality (i.e. theme generation)
  ui/       User interface for webapp
  cli/      Command-line tool
  web/      Web API (probably the GraphQL part)
```

## MVP Features

Themes are comprised of:

- A unique identifier
- An image URL
- The hash of the resolved image
- A colour scheme

### Web UI

- [ ] Preview themes on fake desktop ('rice style') from URL
- [ ] Create new themes
  - [ ] Provide image URL
  - [ ] Generage theme from image using WALgorithm
  - [ ] Generate shareable URL

### API

Probably GraphQL.

Who am I kidding? Definitely GraphQL.

- [ ] Create theme from image URL
- [ ] Get theme from unique ID

### CLI

- [ ] Set current WAL theme from unique theme ID
- [ ] Local cache of themes for offline use

## Second Phase Features

- [ ] Authentication / user accounts
- [ ] Per-user 'library' of created/liked themes

## Other Possibilities

- [ ] Customizable previews
  - [ ] Choice of window manager
  - [ ] Different preview windows
    - [ ] Terminal (choice of content, maybe asciinema)
    - [ ] IDE
    - [ ] Customizable via JSX?
  - [ ] "Compositing" options (emulate some of compton's functionality)
- [ ] Customizable profile pages (i.e. libraries)
  - [ ] Pinned/default theme(s)
- [ ] Nice OpenGraph integration for shareable URLs
