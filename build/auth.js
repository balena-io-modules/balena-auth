"use strict";
/*
Copyright 2016-17 Resin.io

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module auth
 */
var Promise = require("bluebird");
var errors = require("resin-errors");
var getStorage = require("resin-settings-storage");
var api_key_1 = require("./api-key");
var jwt_1 = require("./jwt");
var ResinAuth = (function () {
    function ResinAuth(_a) {
        var _b = _a === void 0 ? {} : _a, dataDirectory = _b.dataDirectory, _c = _b.tokenKey, tokenKey = _c === void 0 ? 'token' : _c;
        var _this = this;
        // Storage related methods
        /**
         * @member setKey
         * @summary Set the token key
         * @function
         * @public
         *
         * @param {String} key
         * @returns {Promise<void>}
         *
         * @example
         * auth.setKey('...').then(() => { ... });
         */
        this.setKey = function (key) {
            try {
                _this.token = _this.createToken(key);
                // Do not override the current key if the new one is invalid
                return _this.storage.set(_this.tokenKey, key);
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        /**
         * @member hasKey
         * @summary Has a token
         * @function
         * @public
         *
         * @returns {Promise<Boolean>} has token
         *
         * @example
         * auth.hasKey().then((hasToken) => {
         * 	if (hasToken) {
         * 		console.log('There is a key!');
         * 	} else {
         * 		console.log('There is not a key!');
         * 	}
         * });
         */
        this.hasKey = function () { return _this.storage.has(_this.tokenKey); };
        /**
         * @member removeKey
         * @summary Remove the token
         * @function
         * @public
         *
         * @description
         * This promise is not rejected if there was no token at the time of removal.
         *
         * @returns {Promise}
         *
         * @example
         * auth.removeKey();
         */
        this.removeKey = function () {
            _this.token = undefined;
            return _this.storage.remove(_this.tokenKey);
        };
        // Proxy promisified Token methods
        /**
         * @member getType
         * @summary Gets the token type
         * @function
         * @public
         *
         * @returns {Promise<TokenType>}
         *
         * @example
         * auth.getType().then((type) => { ... });
         */
        this.getType = function () {
            return _this.getToken().then(function (token) { return token.type; });
        };
        /**
         * @member getKey
         * @summary Gets the token key
         * @function
         * @public
         *
         * @returns {Promise<string>}
         *
         * @example
         * auth.getKey().then((key) => { ... });
         */
        this.getKey = function () {
            return _this.getToken().then(function (token) { return token.key; });
        };
        /**
         * @member getAge
         * @summary Gets the token age
         * @function
         * @public
         *
         * @returns {Promise<number | undefined>}
         *
         * @example
         * auth.getAge().then((age) => { ... });
         */
        this.getAge = function () {
            return _this.getToken().then(function (token) { return token.getAge(); });
        };
        /**
         * @member isExpired
         * @summary Checks if token is expired
         * @function
         * @public
         *
         * @returns {Promise<boolean>}
         *
         * @example
         * auth.isExpired().then((expired) => { ... });
         */
        this.isExpired = function () {
            return _this.getToken().then(function (token) { return token.isExpired(); });
        };
        /**
         * @member isValid
         * @summary Checks if token format is valid
         * @function
         * @public
         *
         * @returns {Promise<boolean>}
         *
         * @example
         * auth.isValid().then((valid) => { ... });
         */
        this.isValid = function () {
            return _this.getToken().then(function (token) { return token.isValid(); });
        };
        /**
         * @member needs2FA
         * @summary Checks whether 2FA is needed
         * @function
         * @public
         *
         * @returns {Promise<boolean>}
         *
         * @example
         * auth.needs2FA().then((needs2FA) => { ... });
         */
        this.needs2FA = function () {
            return _this.getToken().then(function (token) { return token.needs2FA(); });
        };
        // Utility methods
        this.createToken = function (key) {
            var token = jwt_1.JWT.isValid(key) ? new jwt_1.JWT(key) : new api_key_1.APIKey(key);
            if (!token.isValid()) {
                throw new errors.ResinMalformedToken(key);
            }
            if (token.isExpired()) {
                throw new errors.ResinExpiredToken(key);
            }
            return token;
        };
        this.getToken = function () {
            if (_this.token) {
                return Promise.resolve(_this.token);
            }
            return _this.storage.get(_this.tokenKey).then(function (key) {
                if (typeof key !== 'string') {
                    throw new errors.ResinMalformedToken(key);
                }
                _this.token = _this.createToken(key);
                return _this.token;
            });
        };
        this.storage = getStorage({ dataDirectory: dataDirectory });
        this.tokenKey = tokenKey;
    }
    return ResinAuth;
}());
exports.ResinAuth = ResinAuth;
//# sourceMappingURL=auth.js.map
