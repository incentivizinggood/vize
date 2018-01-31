# Information on `imports/ui/pages/`

## Description

All of the pages of the app are defined in this directory.

Because of the way Meteor works there is actually only one "page" in the traditional sense: `client/main.html`. All of these pages are React components which are rendered as divs and inserted into main.html. (See `imports/startup/client/router.js`)

## Conventions and Guidelines

### Suggested Template

It is recommended that all page definitions should be based on:

```
import React from "react";

export default class HelloPage extends React.Component {
    render() {
        return (
            <div className="page hello">
                <h1>Hello, world!</h1>
            </div>
        );
    }
}
```

### File Name

The file names should follow the convention: "a file named `imports/ui/pages/something.jsx` defines the class `SomethingPage`." This makes the directory tree easy to navigate but not to verbose.

Note: the file names should not contain the word "page." That would be redundant because all pages are in the directory `imports/ui/pages`.

### Class Name

The class names should follow the convention of `SomethingPage`. This makes it easy to identify pages in the code.

### CSS

For CSS purposes, the top level div of every page should be in the class `page`. This div should also be in another class or have an id that distinguishes each page from the other pages.
