This is the /i18n directory.

Its purpose is to hold the translation files used for internationalization
("i18n") by the universe:i18n package

It currently has two subdirectories:

i18n/SimpleSchema: Holds the translation files for the SimpleSchema namespace,
which covers all the text items used by the SimpleSchema package in this app.
These are things like error messages and form field labels.

i18n/common: Holds everything else. Most of the UI text displayed on the website
(page descriptions, button labels, component labels, and field placeholders)
goes in here.

The distinction between what goes in which directory seems a bit arbitrary,
especially since a lot of what appears on forms does come out of the common
namespace.

The practical difference is that translations in the SimpleSchema namespace have
to be loaded and initialized differently, according to the manner in which the
SimpleSchema package handles i18n. This becomes clear when looking at the code
in imports/startup/client/i18n.js, which is where most of these "exception
cases" are handled. Most of the time one can easily call a function from the
universe:i18n package to get a translation whenever it's needed, but field
labels and error messages are handled mostly by the packages that are concerned
with them, and unless one calls the right package functions to load the
translations, they will not be translated reactively, which results in a jarring
and inconsistent user experience.

As to how the individual files are structured, the name of each translation item
("name" here indicates the entire types name of the JSON field, which includes
the field name and all parent fields) is supposed to indicate where and how it
is used. There isn't really a unified and consistent naming scheme, but for now
it suffices to track down where it is used in the code to get the name and then
use Ctrl-F if you need to explore the translation files, or vice versa.

Here are the docs for the universe:i18n package:
https://github.com/vazco/meteor-universe-i18n

Here are the docs for universe:i18n's Blaze support, which is used in the forms
to translate input field placeholders and other text items:
https://github.com/vazco/universe-i18n-blaze/

Descriptions of how SimpleSchema handles i18n can be found in its docs:
https://github.com/aldeed/simple-schema-js#customizing-validation-messages
https://github.com/aldeed/simple-schema-js#translation-of-regular-expression-messages

Cheers.

P.S. If you're wondering whether anything needs to be translated, try Ctrl-F
"PLEASE TRANSLATE" on the translation files. That's how I tend to indicate that
something exists but needs to be translated.
