/*
Copyright 2016-17 Balena

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

/**
 * @module api-key
 */

import { Token, TokenType } from './token';

export class APIKey implements Token {
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
	public readonly type = TokenType.APIKey;

	/**
	 * @member key
	 * @summary Get the original string key
	 * @public
	 *
	 * @returns {string} string
	 *
	 * @example
	 * console.log(token.key())
	 */
	public readonly key: string;

	constructor(key: string) {
		this.key = key;
	}

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
	public isValid = (): boolean => true;

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
	public getAge = (): number | undefined => 0;

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
	public isExpired = (): boolean => false;

	/**
	 * @member get2FAStatus
	 * @summary Gets whether passing a 2FA challenge is pending, passed or not required.
	 * @function
	 * @public
	 *
	 * @returns {'not_required'|'pending'|'passed'}
	 *
	 * @example
	 * console.log(token.get2FAStatus())
	 */
	public get2FAStatus = (): 'not_required' | 'pending' | 'passed' =>
		'not_required';
}
