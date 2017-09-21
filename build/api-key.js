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
 * @module api-key
 */
var token_1 = require("./token");
var APIKey = (function () {
    function APIKey(key) {
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
        this.type = token_1.TokenType.APIKey;
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
        this.isValid = function () { return true; };
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
        this.getAge = function () { return 0; };
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
        this.isExpired = function () { return false; };
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
        this.needs2FA = function () { return false; };
        this.key = key;
    }
    return APIKey;
}());
exports.APIKey = APIKey;
//# sourceMappingURL=api-key.js.map
