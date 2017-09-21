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
 * @module jwt
 */
var jwtDecode = require("jwt-decode");
var token_1 = require("./token");
var JWT = (function () {
    function JWT(key) {
        var _this = this;
        /**
         * @member type
         * @summary Get the type of token
         * @public
         *
         * @returns {TokenType} the type of token
         *
         * @example
         * console.log(token.type)
         */
        this.type = token_1.TokenType.JWT;
        /**
         * @member isValid
         * @summary Check if a token is valid
         * @function
         * @public
         *
         * @returns {boolean} is valid
         *
         * @example
         * console.log(token.isValid());
         */
        this.isValid = function () { return JWT.isValid(_this.key); };
        /**
         * @member getAge
         * @summary Get the token age
         * @function
         * @public
         *
         * @returns {number | undefined}
         *
         * @example
         * console.log(token.getAge());
         */
        this.getAge = function () {
            var iat = JWT.parse(_this.key).iat;
            return iat ? Date.now() - iat * 1000 : undefined;
        };
        /**
         * @member isExpired
         * @summary Check whether the token has expired
         * @function
         * @public
         *
         * @returns {boolean}
         *
         * @example
         * console.log(token.isExpired());
         */
        this.isExpired = function () {
            var exp = JWT.parse(_this.key).exp;
            return exp ? Date.now() > exp * 1000 : false;
        };
        /**
         * @member needs2FA
         * @summary Check if the given token requires 2FA
         * @function
         * @public
         *
         * @returns {boolean}
         *
         * @example
         * console.log(token.needs2FA());
         */
        this.needs2FA = function () { return !!JWT.parse(_this.key).twoFactorRequired; };
        this.key = key;
    }
    JWT.parse = function (key) {
        return jwtDecode(key.trim());
    };
    JWT.isValid = function (key) {
        try {
            this.parse(key);
            return true;
        }
        catch (err) {
            return false;
        }
    };
    return JWT;
}());
exports.JWT = JWT;
//# sourceMappingURL=jwt.js.map
