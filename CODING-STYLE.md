# Vize's Coding Style

The coding style we use is almost identical to Meteor's recommended style and
Prettier's default style. The only differences are:

*   We use a larger indention size of 4 characters so that the code's structure
    is easier to see.
*   We put trailing commas in multi-line object and array literals. This is done
    so that new fields/elements can be appended without changing the line above
    them.
*   We use prose wrapping to make Markdown documents more readable when
    displayed as plain text.

It should be noted that these changes are not applied to JSON files. The files
`package.json` and `package-lock.json` are edited by NPM and it would be a
unneeded hassle to fight with it on formating.

## Tools

To help enforce the coding style we are using Prettier. Prettier corrects any
formatting errors automatically.

To help detect errors and low quality code we are going to use ESLint. ESLint
scans the source code to detect errors and bad habits. This caches some problems
earlier and reduces the amount of time spent on debugging.

## Setup on Atom

### Editor Settings

EditorConfig has not been setup yet.

### Prettier

Prettier has not been setup yet.

### ESLint

1.  Install the packages `language-babel`, `linter`, and `linter-eslint`.
1.  Go to `linter-eslint`'s settings.
1.  Select the option "Disable when no ESLint config is found". This will
    prevent ESLint from running on any other projects that you may work on.

See https://guide.meteor.com/code-style.html#eslint-atom for more info.

## Setup on WebStorm

The one who wrote this does not use WebStorm. This section will be filled in
later.

### Editor Settings

To do.

### Prettier

Prettier has not been setup yet.

### ESLint

To do.

See https://guide.meteor.com/code-style.html#eslint-webstorm for more info.
