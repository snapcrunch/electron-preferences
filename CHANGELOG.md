# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Always enable electron contextIsolation

### Added
- Preferences option `debug: true` which opens the devTools by default

### Changed
- Checkbox type supports a single boolean value

## [2.4.1] - 2020-07-13
### Fixed
- Focus the preference window when triggering .show() when window was already created
- Allow the Accelerator value to be cleared via a single backspace or delete keydown
- Checkbox crashing on invalid values
- First click on a checkbox is ignored

## [2.4.0] - 2020-07-10
### Added
- File select component
- Support multiple selection of files and folders via the 'multiSelections' option

### Changed
- Read/write settings file atomically
- Debounced saving settings file to 200ms (prevent overwriting disk)
- Add custom css stylesheet using the `css` options

## [2.3.2] - 2020-05-25
### Fixed
- Unable to pass complex objects (e.g. another BrowserWindow) to the preference options because of IPC serialization

## [2.3.1] - 2020-05-04
### Fixed
- Accidentally overwriting webpreferences

## [2.3.0] - 2020-04-30
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

## [2.2.0] - 2020-03-14
### Added
- Dark theme! 🌗
- Help information for the color component
- Brightness icon

### Changed
- UI of the settings menu
- New icons
- Clicking on the path of a directory will also open the select folder dialog

## [2.1.1] - 2020-03-11
### Fixed
- Fix issue with different radio groups/checkboxes interfering with each other

## [2.1.0] - 2020-02-04
### Added
- Adding a new preference will set a default value
- Ability to override the preferences window's title

### Changed
- enableRemoteModule set to true

### Removed
- remove functions from the preference options object

## [2.0.0] - 2019-09-21
### Added
- Start of the changelog
- ...
