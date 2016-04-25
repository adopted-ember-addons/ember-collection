# Change Log

## [1.0.0-alpha.6](https://github.com/emberjs/ember-collection/tree/1.0.0-alpha.6) (2016-04-25)
[Full Changelog](https://github.com/emberjs/ember-collection/compare/v1.0.0-alpha.5...1.0.0-alpha.6)

- [BREAKING] Delegate to layout for calculating style [\#81](https://github.com/emberjs/ember-collection/pull/81) ([raytiley](https://github.com/raytiley))

  If you have written custom layouts, you will need to implement `formatItemStyle` on them. See the PR for details

- Fallback to setTimeout if requestAnimationFrame is not present [\#84](https://github.com/emberjs/ember-collection/pull/84) ([raytiley](https://github.com/raytiley))
- Fix percentage-columns-layout [\#87](https://github.com/emberjs/ember-collection/pull/87) ([raytiley](https://github.com/raytiley))

- Build tooling and doc updates:
  - Fix comparison link in CHANGELOG.md [\#82](https://github.com/emberjs/ember-collection/pull/82) ([tricknotes](https://github.com/tricknotes))
  - Update README [\#85](https://github.com/emberjs/ember-collection/pull/85) ([raytiley](https://github.com/raytiley))
  - Update to ember-cli@2.3.0-beta.1. [\#86](https://github.com/emberjs/ember-collection/pull/86) ([rwjblue](https://github.com/rwjblue))
  - Update releases tested in CI. [\#88](https://github.com/emberjs/ember-collection/pull/88) ([rwjblue](https://github.com/rwjblue))
  - Use Xunit reporter in CI.  [\#90](https://github.com/emberjs/ember-collection/pull/90) ([rwjblue](https://github.com/rwjblue))
  - Remove template compiler from built assets. [\#91](https://github.com/emberjs/ember-collection/pull/91) ([rwjblue](https://github.com/rwjblue))
  - Update percentage-columns-layout example. [\#95](https://github.com/emberjs/ember-collection/pull/95) ([dustinspecker](https://github.com/dustinspecker))
  - Update ember-cli from 2.3.0-beta.2 to 2.3.0 [\#101](https://github.com/emberjs/ember-collection/pull/101) ([fpauser](https://github.com/fpauser))
  - Update ember-try to 0.2.0. [\#102](https://github.com/emberjs/ember-collection/pull/102) ([rwjblue](https://github.com/rwjblue))


## [v1.0.0-alpha.5](https://github.com/emberjs/ember-collection/tree/v1.0.0-alpha.5) (2016-01-20)
[Full Changelog](https://github.com/emberjs/ember-collection/compare/v1.0.0-alpha.4...v1.0.0-alpha.5)

- Update to use Ember.Array API... [\#66](https://github.com/emberjs/ember-collection/pull/66) ([lukemelia](https://github.com/lukemelia))
- It's not necessary to set the box-sizing css property on the ember-native-scrollable [\#63](https://github.com/emberjs/ember-collection/pull/63) ([lukemelia](https://github.com/lukemelia))
- Use separate variables instead of two-element hashes when it makes sense [\#51](https://github.com/emberjs/ember-collection/pull/51) ([srgpqt](https://github.com/srgpqt))

The dummy app also got various improvements thanks to @ef4, @raytiley and @lukemelia. It is now hosted at http://emberjs.com/ember-collection/

## [v1.0.0-alpha.4](https://github.com/emberjs/ember-collection/tree/v1.0.0-alpha.4) (2015-09-15)
[Full Changelog](https://github.com/emberjs/ember-collection/compare/v1.0.0-alpha.3...v1.0.0-alpha.4)

Use hyphenated action name for consistency with other attrs.

## [v1.0.0-alpha.3](https://github.com/emberjs/ember-collection/tree/v1.0.0-alpha.3) (2015-09-15)
[Full Changelog](https://github.com/emberjs/ember-collection/compare/v1.0.0-alpha.2...v1.0.0-alpha.3)

- If scrollChange action is provided, emit scroll changes to it and bind the scroll position [\#48](https://github.com/emberjs/ember-collection/pull/48) ([lukemelia](https://github.com/lukemelia))

## [v1.0.0-alpha.2](https://github.com/emberjs/ember-collection/tree/v1.0.0-alpha.2) (2015-09-14)
[Full Changelog](https://github.com/emberjs/ember-collection/compare/v1.0.0-alpha.1...v1.0.0-alpha.2)

Update layout-bin-packer version.

## [v1.0.0-alpha.1](https://github.com/emberjs/ember-collection/tree/v1.0.0-alpha.1) (2015-09-14)

Initial alpha release.
