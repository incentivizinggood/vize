# Vize's Coding Style

The coding style we use is almost identical to Meteor's recommended style and
Prettier's default style. The only differences are:

-   We use a larger indention size of 4 characters so that the code's structure
    is easier to see.
-   We put trailing commas in multi-line object and array literals. This is done
    so that new fields/elements can be appended without changing the line above
    them.
-   We use prose wrapping to make Markdown documents more readable when
    displayed as plain text.
-   We are using tabs for indention for all code except YAML and Markdown. These
    languages are excluded because they require spaces for indention.

It should be noted that these changes are not applied to the files
`package.json` and `package-lock.json`. These files are edited by NPM and it
would be a unneeded hassle to fight with it on formatting.

## Tools

To help enforce the coding style we are using Prettier. Prettier corrects any
formatting errors automatically.

To help detect errors and low quality code we are going to use ESLint. ESLint
scans the source code to detect errors and bad habits. This caches some problems
earlier and reduces the amount of time spent on debugging.

## Setup on Atom

### Editor Settings

For configuring Atom's editor settings you should use the EditorConfig package.
EditorConfig reads settings from the `.editorconfig` file and overrides Atom's
normal settings. This makes it so that you can use the proper settings in this
project, and still use your preferred settings in your other projects all
without ever changing your settings.

1.  Install the `editorconfig` package into Atom.
1.  Do not change any of this package's settings.

### Prettier

1.  Install the `prettier-atom` package into Atom.
1.  Select the option "Format Files on Save". This will make Prettier run
    automatically whenever you save a file so that you never accidentally commit
    bad code into Git.
1.  Select the options "Only format if Prettier is found in your project's
    dependencies" and "Only format if a Prettier config is found". These options
    will prevent Prettier from running on any other projects that you may work
    on.
1.  Do not change any of the other settings for this package.

### ESLint

1.  Install the packages `language-babel`, `linter`, and `linter-eslint`.
1.  Go to `linter-eslint`'s settings.
1.  Select the option "Disable when no ESLint config is found". This will
    prevent ESLint from running on any other projects that you may work on.

See https://guide.meteor.com/code-style.html#eslint-atom for more info.
