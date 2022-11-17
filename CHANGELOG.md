# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.8.1] - 2022-11-17
### Fixed
- move serialize-javascript from dev dependencies to dependencies (#183)

### Changed
- Bump loader-utils dependencies to 1.4.2

## [2.8.0] - 2022-11-07
### Added
- `hideFunction` on sections, groups or fields which you can conditionally hide (via other preferences) (#160)
- Ability to pass JS functions in the preference object to the renderer (#160)
- Ability to pass `sectionId` to the `show()` function (#153)
- `secret` field which encrypts the input via electron's `safeStorage` (#176)
- `encrypt` and `decrypt` IPC calls which use electron's `safeStorage` (#176)
- expose `decrypt` function on preferences object (#176)

### Changed
- Bump dependencies to their latest version

## [2.7.0] - 2022-07-18
### Fixed
- Freezing UI when clicking a button type in the preferences window (#161)
- Defaults could be changed by passing around the defaults object (#150)

### Added
- Added `allowOnlyModifier` property to the accelerator input to allow shortcuts like `Alt` or `Shift`
- type 'number' instead of having to declare type 'text' with 'inputType = number' (#168)
- Maximum and minimum list size via `min` and `max` list properties (#164)
- `resetToDefaults` endpoint to the preferences object which removes any non-default properties and set all default properties to their default values (#97)

### Changed
- bump dependencies to their latest version

## [2.6.0] - 2022-03-29
### Fixed
- Reset scroll when switching between tabs (#158)
- Set defaults for new preferences added in a group after app has started (#141)
- Include files to be exposed in npm build (#119)
- Correct `menuBar` option in README (#130)
- Updated dependencies
- Improve README.md

### Added
- Button component. Will trigger an event on the `preferences.click` when clicked. (#99)
- Expose `close` function on preference object to close the preference window if opened (#130)
- Expose `closePreferences` function on the ipcRenderer to close the preference window if opened (#130)

## [2.5.0] - 2021-09-18
### Fixed
- Accessibility issues: contrast, navigation with keyboard, labels (#76)
- Always enable electron contextIsolation (#122)

### Added 
- Preferences option `debug: true` which opens the devTools by default (#124)
- Expose `browserWindowOverrides` on the preference object (#112)

### Changed
- Checkbox type supports a single boolean value

## [2.4.1] - 2021-07-13
### Fixed
- Focus the preference window when triggering .show() when window was already created
- Allow the Accelerator value to be cleared via a single backspace or delete keydown
- Checkbox crashing on invalid values
- First click on a checkbox is ignored

## [2.4.0] - 2021-07-10
### Added
- File select component
- Support multiple selection of files and folders via the 'multiSelections' option

### Changed
- Read/write settings file atomically
- Debounced saving settings file to 200ms (prevent overwriting disk)
- Add custom css stylesheet using the `css` options

## [2.3.2] - 2021-05-25
### Fixed
- Unable to pass complex objects (e.g. another BrowserWindow) to the preference options because of IPC serialization

## [2.3.1] - 2021-05-04
### Fixed
- Accidentally overwriting webpreferences

## [2.3.0] - 2021-04-30
### Added
- Orderable List component
- 'step' property to slider input
- hover state to sidebar items

### Changed
- Update to electron v12
- Enable context isolation
- Disable remote module
- Build with webpack

### Removed
- Grunt dependency for building

## [2.2.0] - 2021-03-14
### Added
- Dark theme! 🌗
- Help information for the color component
- Brightness icon

### Changed
- UI of the settings menu
- New icons
- Clicking on the path of a directory will also open the select folder dialog

## [2.1.1] - 2021-03-11
### Fixed
- Fix issue with different radio groups/checkboxes interfering with each other

## [2.1.0] - 2021-02-04
### Added
- Adding a new preference will set a default value
- Ability to override the preferences window's title

### Changed
- enableRemoteModule set to true

### Removed
- remove functions from the preference options object

## [2.0.0] - 2020-09-21
### Added
- Start of the changelog
- ...
