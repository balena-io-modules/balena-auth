# Change Log

All notable changes to this project will be documented in this file
automatically by Versionist. DO NOT EDIT THIS FILE MANUALLY!
This project adheres to [Semantic Versioning](http://semver.org/).

## 6.0.1 - 2024-02-23

* Update jwt-decode to v3 [Thodoris Greasidis]

## 6.0.0 - 2024-02-23

* Update typescript to 5.3.3 [Thodoris Greasidis]
* Move the sources from lib to src [Thodoris Greasidis]
* Update @balena/lint to v7 [Thodoris Greasidis]
* Stop publishing the lib folder [Thodoris Greasidis]
* Drop support for nodejs < 18 [Thodoris Greasidis]
* Drop no longer used appveyor.yml [Thodoris Greasidis]

## 5.1.0 - 2023-07-28

* Add support for isolated instances by passing dataDirectory: false [Thodoris Greasidis]

## 5.0.1 - 2023-07-28

* Add multiple instance isolation tests [Thodoris Greasidis]

## 5.0.0 - 2023-07-24


<details>
<summary> Update balena-settings-storage to 8.0.0 [Thodoris Greasidis] </summary>

> ### balena-settings-storage-8.0.0 - 2023-07-24
> 
> * virtual-storage: Use an object without a prototype as the store [Thodoris Greasidis]
> * Specify a browser entry point [Thodoris Greasidis]
> * Use es6 exports [Thodoris Greasidis]
> * Update TypeScript to 5.1.6 [Thodoris Greasidis]
> * Drop support for nodejs < 14 [Thodoris Greasidis]
> 
> ### balena-settings-storage-7.0.2 - 2022-11-08
> 
> * Update balena-errors from v4.7.1 to v4.7.3 [JSReds]
> 
> ### balena-settings-storage-7.0.1 - 2022-11-01
> 
> * Fix tests on node18 [Thodoris Greasidis]
> * Replace balenaCI with flowzone [JSReds]
> 

</details>

* Update dependencies [Thodoris Greasidis]
* Drop support for nodejs < 14 [Thodoris Greasidis]

## 4.2.1 - 2023-07-13

* patch: Update flowzone.yml [Kyle Harding]

## 4.2.0 - 2023-05-25

* Add a get2FAStatus() method [Thodoris Greasidis]

## 4.1.3 - 2023-05-25

* Fix async tests not waiting for the result [Thodoris Greasidis]

## 4.1.2 - 2022-09-26

* Delete redundant .resinci.yml [Thodoris Greasidis]

## 4.1.1 - 2022-09-22

* Replace balenaCI with flowzone [Thodoris Greasidis]

# v4.1.0
## (2020-11-04)

* Update balena-settings-storage from 6.0.0 to 7.0.0 [josecoelho]

# v4.0.2
## (2020-07-13)

* Add .versionbot/CHANGELOG.yml for nested changelogs [Pagan Gazzard]

# v4.0.1
## (2020-07-03)

* Explicitly add tslib dependency [Pagan Gazzard]

# v4.0.0
## (2020-07-02)

* Specify node 10+ [Pagan Gazzard]
* Switch to native promises [Pagan Gazzard]
* Update target to es2015 [Pagan Gazzard]
* Update to balena-settings-storage 6.x [Pagan Gazzard]

# v3.1.1
## (2020-07-02)

* Switch to @balena/lint for linting [Pagan Gazzard]

# v3.1.0
## (2020-06-01)

* Generate and use type declarations [Pagan Gazzard]

## 3.0.1 - 2020-01-20

* Update dependencies [Pagan Gazzard]

## v3.0.0 - 2018-10-17

* Rename everything 'resin' to 'balena' [Tim Perry]

## v2.0.1 - 2018-09-17

* Use resinCI for publishing to npm [Thodoris Greasidis]
* Pin bluebird typings & prettier versions to fix the tests [Thodoris Greasidis]

## v2.0.0 - 2017-10-16

* Expose ResinAuth instead of ResinAuth.ResinAuth #12 [MoranF]

## v1.0.3 - 2017-10-10

* Keep build output after tests, so we can deploy it #10 [Tim Perry]

## v1.0.2 - 2017-10-10

* Ignore & remove all built files, but publish them once generated #9 [Ariel Flesler]

## v1.0.1 - 2017-10-09

* Change project repo to resin-io-modules #7 [Ariel Flesler]

## v1.0.0 - 2017-10-04

* Support auth with both JWTs and API Keys #2 [Ariel Flesler]

## v0.9.0 - 2017-09-21

* Add the basic project files to the repo [Ariel Flesler]
