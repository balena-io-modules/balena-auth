resin-auth
-----------

[![npm version](https://badge.fury.io/js/resin-auth.svg)](http://badge.fury.io/js/resin-auth)
[![dependencies](https://david-dm.org/resin-io-modules/resin-auth.png)](https://david-dm.org/resin-io-modules/resin-auth.png)
[![Build Status](https://travis-ci.org/resin-io-modules/resin-auth.svg?branch=master)](https://travis-ci.org/resin-io-modules/resin-auth)

Join our online chat at [![Gitter chat](https://badges.gitter.im/resin-io/chat.png)](https://gitter.im/resin-io/chat)

Resin.io session authentication utilities

Role
----

The intention of this module is to provide low level access to how a Resin.io authentication tokens are parsed and persisted.

**THIS MODULE IS LOW LEVEL AND IS NOT MEANT TO BE USED BY END USERS DIRECTLY**.

Unless you know what you're doing, use the [Resin SDK](https://github.com/resin-io/resin-sdk) instead.

Installation
------------

Install `resin-auth` by running:

```sh
$ npm install --save resin-auth
```

Documentation
-------------

The module returns a class that you use to get an instance of the auth module.

It accepts the following params:

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options |
| options.dataDirectory | <code>string</code> | the directory to use for storage in Node.js. Ignored in the browser. |
| options.tokenKey | <code>string</code> | the key used to store the last token in the storage. `token` by default. |

**Example**
```js
const ResinAuth = require('resin-auth');
const auth = new ResinAuth({
	dataDirectory: '/opt/cache/resin',
	tokenKey: 'token'
});
```


* [auth](#module_auth)
    * [~setKey(key)](#module_auth..setKey) ⇒ <code>Promise.&lt;void&gt;</code>
    * [~hasKey()](#module_auth..hasKey) ⇒ <code>Promise.&lt;Boolean&gt;</code>
    * [~removeKey()](#module_auth..removeKey) ⇒ <code>Promise</code>
    * [~getType()](#module_auth..getType) ⇒ <code>Promise.&lt;TokenType&gt;</code>
    * [~getKey()](#module_auth..getKey) ⇒ <code>Promise.&lt;string&gt;</code>
    * [~getAge()](#module_auth..getAge) ⇒ <code>Promise.&lt;(number\|undefined)&gt;</code>
    * [~isExpired()](#module_auth..isExpired) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [~isValid()](#module_auth..isValid) ⇒ <code>Promise.&lt;boolean&gt;</code>
    * [~needs2FA()](#module_auth..needs2FA) ⇒ <code>Promise.&lt;boolean&gt;</code>

<a name="module_auth..setKey"></a>

### auth~setKey(key) ⇒ <code>Promise.&lt;void&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Set the token key  
**Access**: public  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

**Example**  
```js
auth.setKey('...').then(() => { ... });
```
<a name="module_auth..hasKey"></a>

### auth~hasKey() ⇒ <code>Promise.&lt;Boolean&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Has a token  
**Returns**: <code>Promise.&lt;Boolean&gt;</code> - has token  
**Access**: public  
**Example**  
```js
auth.hasKey().then((hasToken) => {
	if (hasToken) {
		console.log('There is a key!');
	} else {
		console.log('There is not a key!');
	}
});
```
<a name="module_auth..removeKey"></a>

### auth~removeKey() ⇒ <code>Promise</code>
This promise is not rejected if there was no token at the time of removal.

**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Remove the token  
**Access**: public  
**Example**  
```js
auth.removeKey();
```
<a name="module_auth..getType"></a>

### auth~getType() ⇒ <code>Promise.&lt;TokenType&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Gets the token type  
**Access**: public  
**Example**  
```js
auth.getType().then((type) => { ... });
```
<a name="module_auth..getKey"></a>

### auth~getKey() ⇒ <code>Promise.&lt;string&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Gets the token key  
**Access**: public  
**Example**  
```js
auth.getKey().then((key) => { ... });
```
<a name="module_auth..getAge"></a>

### auth~getAge() ⇒ <code>Promise.&lt;(number\|undefined)&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Gets the token age  
**Access**: public  
**Example**  
```js
auth.getAge().then((age) => { ... });
```
<a name="module_auth..isExpired"></a>

### auth~isExpired() ⇒ <code>Promise.&lt;boolean&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Checks if token is expired  
**Access**: public  
**Example**  
```js
auth.isExpired().then((expired) => { ... });
```
<a name="module_auth..isValid"></a>

### auth~isValid() ⇒ <code>Promise.&lt;boolean&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Checks if token format is valid  
**Access**: public  
**Example**  
```js
auth.isValid().then((valid) => { ... });
```
<a name="module_auth..needs2FA"></a>

### auth~needs2FA() ⇒ <code>Promise.&lt;boolean&gt;</code>
**Kind**: inner method of [<code>auth</code>](#module_auth)  
**Summary**: Checks whether 2FA is needed  
**Access**: public  
**Example**  
```js
auth.needs2FA().then((needs2FA) => { ... });
```


Support
-------

If you're having any problem, please [raise an issue](https://github.com/resin-io-modules/resin-auth/issues/new) on GitHub and the Resin.io team will be happy to help.

Tests
-----

Run the test suite by doing:

```sh
$ npm test
```

Contribute
----------

- Issue Tracker: [github.com/resin-io-modules/resin-auth/issues](https://github.com/resin-io-modules/resin-auth/issues)
- Source Code: [github.com/resin-io-modules/resin-auth](https://github.com/resin-io-modules/resin-auth)

Before submitting a PR, please make sure that you include tests, and that [tslint](https://palantir.github.io/tslint/) runs without any warning:

```sh
$ npm run lint
```

License
-------

The project is licensed under the Apache 2.0 license.
