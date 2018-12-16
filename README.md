# walet

> WAL theme exchange

## Overview

Web UI, API and CLI for previewing and sharing WAL-based terminal themes.

## Project Structure

### Monorepo

This project is a monorepo, which (in this case) means that it is a single git repository, containing multiple node.js modules.

Each of these modules will be published on npm under the `@walet` scope.

### Source Code

All source is written in TypeScript. As much as possible:

- use of the `any` type is avoided
- functional paradigms are preferred over imperative ones.

### Linting / Formatting

No linting is currently performed. It is likely that this will be added in the future, in combination with enforced autoformatting.

### Unit Testing

Unit tests are written in Jest. There is a target test coverage ratio of 80% expected before the project can be considered even slightly stable.

## Package Features / Roadmap

### Core (`@walet/core`)

- [x] Generate colour scheme from an image buffer
- [ ] Allow choice of colour scheme backend

### Web UI (`@walet/web`)

- [ ] Preview themes on fake desktop ('rice style') from URL
- [ ] Create new themes
  - [ ] Provide image URL
  - [ ] Generage theme from image using WALgorithm
  - [ ] Generate shareable URL

### API (`@walet/api`)

Probably GraphQL.

Who am I kidding? Definitely GraphQL.

- [ ] Create theme from image URL
- [ ] Get theme from unique ID

### CLI (`@walet/cli`)

- [x] Generate theme from file path or URL
- [x] Generate 'light' themes via command-line switch
- [ ] Set current WAL theme from unique theme ID
- [ ] Local cache of themes for offline use

## Future Possible Features

- [ ] Authentication / user accounts
- [ ] Per-user 'library' of created/liked themes
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
