# @ionic/v4-migration-tslint

[![Build Status][circle-badge]][circle-badge-url]
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Coverage Status](https://coveralls.io/repos/github/ionic-team/v4-migration-tslint/badge.svg?branch=master)](https://coveralls.io/github/ionic-team/v4-migration-tslint?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

An effort to warn about and automatically fix syntax changes listed in [`BREAKING.md`](https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md) using tslint, codelyzer, and the Angular compiler.

We are looking for contributors to help build these rules out! See [`CONTRIBUTING.md`](https://github.com/ionic-team/v4-migration-tslint/blob/develop/CONTRIBUTING.md) to help out. :sparkling_heart:

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
        "ion-action-sheet-method-create-parameters-renamed": true,
        "ion-alert-method-create-parameters-renamed": true,
        "ion-button-attributes-renamed": true,
        "ion-button-is-now-an-element": true,
        "ion-chip-markup-has-changed": true,
        "ion-datetime-capitalization-changed": true,
        "ion-fab-attributes-renamed": true,
        "ion-fab-button-is-now-an-element": true,
        "ion-item-is-now-an-element": true,
        "ion-navbar-is-now-ion-toolbar": true,
        "ion-tab-attributes-renamed": true
      }
    }
    ```

1. Lint your project:

    ```
    npx tslint -c ionic-migration.json -p tsconfig.json
    ```

    :memo: **Hints**:

    * Run tslint with `-t verbose` to output the rule names of lint errors which correspond to the [table of rules](#rules) below.
    * Run tslint with `--fix` to attempt automatic fixes (_note_: not all rules have fixes):

## Rules

:white_large_square: &ndash; These rules need to be completed! See [`CONTRIBUTING.md`](https://github.com/ionic-team/v4-migration-tslint/blob/develop/CONTRIBUTING.md) to get started.

:wrench: &ndash; These rules can be automatically fixed with `--fix`.

<table>
  <tr>
    <th>category</th>
    <th colspan="3">rule</th>
    <th>contributors</th>
  </tr>
  <tr>
    <th colspan="5">Code Changes</th>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#action-sheet">Action Sheet</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-action-sheet-method-create-parameters-renamed</code></td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#alert">Alert</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-alert-method-create-parameters-renamed</code></td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#datetime">Datetime</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-datetime-capitalization-changed</code>
    </td>
    <td>
      <a href="https://github.com/mhartington">@mhartington</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-sliding">Item Sliding</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-item-option-method-get-sliding-percent-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#option">Option</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-option-class-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th rowspan="2">
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#overlays">Overlays</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-overlay-method-create-should-use-await</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-overlay-method-present-should-use-await</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th colspan="5">Markup Changes</th>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#back-button">Back Button</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-back-button-not-added-by-default</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th rowspan="2">
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#button">Button</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-button-attributes-renamed</code>
    </td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-button-is-now-an-element</code>
    </td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#chip">Chip</a>
    </th>
    <td></td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-chip-markup-has-changed</code>
    </td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <th rowspan="3">
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#fab">FAB</a>
    </th>
    <td></td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-fab-button-is-now-an-element</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-fab-attributes-renamed</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-fab-fixed-content</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#grid">Grid</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-grid-attributes-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#icon">Icon</a>
    </th>
    <td></td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-icon-attribute-is-active-removed</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <th rowspan="3">
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item">Item</a>
    </th>
    <td></td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-item-is-now-an-element</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-item-ion-label-is-now-required</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-item-attributes-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-divider">Item Divider</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-item-divider-ion-label-is-now-required</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-options">Item Options</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-item-options-attributes-renamed</code>
    </td>
    <td>
      <a href="https://github.com/mhartington">@mhartington</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#item-sliding">Item Sliding</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-item-option-is-now-an-element</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#label">Label</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-label-attributes-renamed</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#list-header">List Header</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-list-header-ion-label-is-now-required</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#menu-toggle">Menu Toggle</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-menu-toggle-is-now-an-element</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#nav">Nav</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-nav-controller-method-remove-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#navbar">Navbar</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-navbar-is-now-ion-toolbar</code></td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#option">Option</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-option-is-now-ion-select-option</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th rowspan="3">
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#radio">Radio</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-radio-attributes-renamed</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-radio-slot-required</code>
    </td>
    <td>
      <a href="https://github.com/dwieeb">@dwieeb</a>
    </td>
  </tr>
  <tr>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-radio-group-is-now-an-element</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#range">Range</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-range-attributes-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#select">Select</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-select-attributes-renamed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#spinner">Spinner</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-spinner-attribute-values-changed</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#tabs">Tabs</a>
    </th>
    <td>:wrench:</td>
    <td>:white_check_mark:</td>
    <td>
      <code>ion-tab-attributes-renamed</code></td>
    <td>
      <a href="https://github.com/cwoolum">@cwoolum</a>
    </td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#text--typography">Text / Typography</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-text-is-now-an-element</code>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>
      <a href="https://github.com/ionic-team/ionic/blob/master/angular/BREAKING.md#toolbar">Toolbar</a>
    </th>
    <td></td>
    <td>:white_large_square:</td>
    <td>
      <code>ion-toolbar-attributes-renamed</code>
    </td>
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
