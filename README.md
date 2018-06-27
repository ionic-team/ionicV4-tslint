# @ionic/v4-migration-tslint

[![Build Status][circle-badge]][circle-badge-url]
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/ionic-team/v4-migration-tslint/badge.svg?branch=master)](https://coveralls.io/github/ionic-team/v4-migration-tslint?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

An effort to automatically fix syntax changes listed in [BREAKING.md](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md) using tslint + codelyzer.

We are looking for contributors to help build these rules out! We have not released a first version of this package yet but it is coming soon.

## How to Use

1. Install the lint rules:

    ```
    npm i -D @ionic/v4-migration-tslint
    ```

1. Add a file called `ionic-migration.json` at the root of your project and paste in the following JSON.

    ```
    {
      "rulesDirectory": [
        "@ionic/v4-migration-tslint/rules"
      ],
      "rules": {
        "ion-action-sheet-title-and-subtitle-are-now-header-and-sub-header": true,
        "ion-alert-title-and-subtitle-are-now-header-and-sub-header": true,
        "ion-button-is-now-an-element": true,
        "ion-button-attributes-are-renamed": true,
        "ion-chip-markup-has-changed": true,
        "ion-navbar-is-now-ion-toolbar": true,
        "ion-tab-title-is-now-label": true,
        "ion-tab-icon-is-now-icon": true,
        "ion-tab-badge-is-now-badge": true,
        "ion-tab-badge-style-is-now-badge-style": true
      }
    }
    ```

1. Lint your project:

    ```
    npx tslint -c ionic-migration.json -p tsconfig.json
    ```

1. Attempt automatic fixes with `--fix` (note: not all rules have fixes):

    ```
    npx tslint -c ionic-migration.json -p tsconfig.json --fix
    ```

## Rules

:black_square_button: &ndash; These rules need to be completed! See [`CONTRIBUTING.md`](https://github.com/ionic-team/v4-migration-tslint/blob/develop/CONTRIBUTING.md) to get started.

:wrench: &ndash; These rules can be automatically fixed with `--fix`.

<table>
<tr>
    <th>category</th>
    <th>rule</th>
    <th>contributors</th>
</tr>
<tr>
    <th colspan="3">Code Changes</th>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#action-sheet">Action Sheet</a></th>
    <td>:white_check_mark: <code>ion-action-sheet-title-and-subtitle-are-now-header-and-sub-header</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#alert">Alert</a></th>
    <td>:white_check_mark: <code>ion-alert-title-and-subtitle-are-now-header-and-sub-header</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#datetime">Datetime</a></th>
    <td>:black_square_button: <code>ion-datetime-capitalization-changed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-sliding">Item Sliding</a></th>
    <td>:black_square_button: <code>ion-item-option-method-get-sliding-percent-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#option">Option</a></th>
    <td>:black_square_button: <code>ion-option-class-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th rowspan="2"><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#overlays">Overlays</a></th>
    <td>:black_square_button: <code>ion-overlay-method-create-should-use-await</code></td>
    <td></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-overlay-method-present-should-use-await</code></td>
    <td></td>
</tr>
<tr>
    <th colspan="3">Markup Changes</th>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#back-button">Back Button</a></th>
    <td>:black_square_button: <code>ion-back-button-not-added-by-default</code></td>
    <td></td>
</tr>
<tr>
    <th rowspan="2"><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#button">Button</a></th>
    <td>:white_check_mark: <code>ion-button-attributes-are-renamed</code></td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <td>:white_check_mark: <code>ion-button-is-now-an-element</code></td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#chip">Chip</a></th>
    <td>:white_check_mark: <code>ion-chip-markup-has-changed</code></td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <th rowspan="3"><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#fab">FAB</a></th>
    <td>:black_square_button: <code>ion-fab-button-is-now-an-element</code></td>
    <td></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-fab-attributes-are-renamed</code></td>
    <td></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-fab-fixed-content</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#grid">Grid</a></th>
    <td>:black_square_button: <code>ion-grid-attributes-are-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#icon">Icon</a></th>
    <td>:black_square_button: <code>ion-icon-property-is-active-is-removed</code></td>
    <td></td>
</tr>
<tr>
    <th rowspan="4"><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item">Item</a></th>
    <td>:white_check_mark: <code>ion-item-is-now-an-element</code></td>
    <td><a href="https://github.com/dwieeb">@dwieeb</a></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-item-ion-label-is-now-required</code></td>
    <td></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-item-attributes-are-renamed</code></td>
    <td></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-item-detail-is-now-single-property</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-divider">Item Divider</a></th>
    <td>:black_square_button: <code>ion-item-divider-ion-label-is-now-required</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-options">Item Options</a></th>
    <td>:black_square_button: <code>ion-item-options-attributes-are-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-sliding">Item Sliding</a></th>
    <td>:black_square_button: <code>ion-item-option-is-now-an-element</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#list-header">List Header</a></th>
    <td>:black_square_button: <code>ion-list-header-ion-label-is-now-required</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#menu-toggle">Menu Toggle</a></th>
    <td>:black_square_button: <code>ion-menu-toggle-is-now-an-element</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#nav">Nav</a></th>
    <td>:black_square_button: <code>ion-nav-controller-method-remove-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#navbar">Navbar</a></th>
    <td>:white_check_mark: <code>ion-navbar-is-now-ion-toolbar</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#option">Option</a></th>
    <td>:black_square_button: <code>ion-option-is-now-ion-select-option</code></td>
    <td></td>
</tr>
<tr>
    <th rowspan="2"><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#radio">Radio</a></th>
    <td>:black_square_button: <code>ion-radio-slot-required</code></td>
    <td></td>
</tr>
<tr>
    <td>:black_square_button: <code>ion-radio-group-is-now-an-element</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#range">Range</a></th>
    <td>:black_square_button: <code>ion-range-attributes-are-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#select">Select</a></th>
    <td>:black_square_button: <code>ion-select-property-select-options-renamed</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#spinner">Spinner</a></th>
    <td>:black_square_button: <code>ion-spinner-name-changed</code></td>
    <td></td>
</tr>
<tr>
    <th rowspan="4"><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#tabs">Tabs</a></th>
    <td>:white_check_mark: <code>ion-tab-badge-is-now-badge</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <td>:white_check_mark: <code>ion-tab-badge-style-is-now-badge-style</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <td>:white_check_mark: <code>ion-tab-icon-is-now-icon</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <td>:white_check_mark: <code>ion-tab-title-is-now-label</code> :wrench:</td>
    <td><a href="https://github.com/cwoolum">@cwoolum</a></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#text--typography">Text / Typography</a></th>
    <td>:black_square_button: <code>ion-text-is-now-an-element</code></td>
    <td></td>
</tr>
<tr>
    <th><a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#toolbar">Toolbar</a></th>
    <td>:black_square_button: <code>ion-toolbar-attributes-are-renamed</code></td>
    <td></td>
</tr>
</table>

### Not Covered

Some changes are not covered by this fixer due to their complexity or because it would make no sense to do in automated fashion. They are:

* [Colors](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#colors)
* [Dynamic Mode](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#dynamic-mode)
* [Icon &raquo; Fonts Removed](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#icon)
* [Theming](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#theming)

[circle-badge]: https://circleci.com/gh/ionic-team/v4-migration-tslint.svg?style=shield
[circle-badge-url]: https://circleci.com/gh/ionic-team/v4-migration-tslint
