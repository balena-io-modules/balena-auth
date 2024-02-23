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
 * @module auth
 */

import * as errors from 'balena-errors';
import type { BalenaSettingsStorage } from 'balena-settings-storage';
import { getStorage } from 'balena-settings-storage';

import { APIKey } from './api-key';
import { JWT } from './jwt';
import type { Token, TokenType } from './token';

export { TokenType } from './token';

interface BalenaAuthOptions {
	dataDirectory?: string | false;
	tokenKey?: string;
}

export default class BalenaAuth {
	private readonly storage: BalenaSettingsStorage;
	private readonly tokenKey: string;
	private token?: Token;

	constructor({ dataDirectory, tokenKey = 'token' }: BalenaAuthOptions = {}) {
		this.storage = getStorage({ dataDirectory });
		this.tokenKey = tokenKey;
	}

	// Storage related methods

	/**
	 * @member setKey
	 * @summary Set the key
	 * @function
	 * @public
	 *
	 * @param {String} key
	 * @returns {Promise<void>}
	 *
	 * @example
	 * auth.setKey('...').then(() => { ... });
	 */
	public setKey = async (key: string): Promise<void> => {
		this.token = this.createToken(key);
		// Do not override the current key if the new one is invalid
		return this.storage.set(this.tokenKey, key);
	};

	/**
	 * @member hasKey
	 * @summary Has a key
	 * @function
	 * @public
	 *
	 * @returns {Promise<Boolean>} has key
	 *
	 * @example
	 * auth.hasKey().then((hasKey) => { ... });
	 */
	public hasKey = (): Promise<boolean> => this.storage.has(this.tokenKey);

	/**
	 * @member removeKey
	 * @summary Remove the key
	 * @function
	 * @public
	 *
	 * @description
	 * This promise is not rejected if there was no key at the time of removal.
	 *
	 * @returns {Promise}
	 *
	 * @example
	 * auth.removeKey();
	 */
	public removeKey = (): Promise<void> => {
		this.token = undefined;
		return this.storage.remove(this.tokenKey);
	};

	// Proxy promisified Token methods

	/**
	 * @member getType
	 * @summary Gets the key type
	 * @function
	 * @public
	 *
	 * @returns {Promise<TokenType>}
	 *
	 * @example
	 * auth.getType().then((type) => { ... });
	 */
	public getType = async (): Promise<TokenType> => {
		const token = await this.getToken();
		return token.type;
	};

	/**
	 * @member getKey
	 * @summary Gets the key
	 * @function
	 * @public
	 *
	 * @returns {Promise<string>}
	 *
	 * @example
	 * auth.getKey().then((key) => { ... });
	 */
	public getKey = async (): Promise<string> => {
		const token = await this.getToken();
		return token.key;
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
	public getAge = async (): Promise<number | undefined> => {
		const token = await this.getToken();
		return token.getAge();
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
	public isExpired = async (): Promise<boolean> => {
		const token = await this.getToken();
		return token.isExpired();
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
	public isValid = async (): Promise<boolean> => {
		const token = await this.getToken();
		return token.isValid();
	};

	/**
	 * @member get2FAStatus
	 * @summary Gets whether passing a 2FA challenge is pending, passed or not required.
	 * @function
	 * @public
	 *
	 * @returns {Promise<'not_required'|'pending'|'passed'>}
	 *
	 * @example
	 * auth.get2FAStatus().then((get2FAStatus) => { ... });
	 */
	public get2FAStatus = async (): Promise<
		'not_required' | 'pending' | 'passed'
	> => {
		const token = await this.getToken();
		return token.get2FAStatus();
	};

	/**
	 * @member needs2FA
	 * @summary Checks whether passing 2FA is pending/needed
	 * @function
	 * @public
	 *
	 * @returns {Promise<boolean>}
	 *
	 * @example
	 * auth.needs2FA().then((needs2FA) => { ... });
	 */
	public needs2FA = async (): Promise<boolean> => {
		const status = await this.get2FAStatus();
		return status === 'pending';
	};

	// Utility methods

	private createToken = (key: string): Token => {
		const token: Token = JWT.isValid(key) ? new JWT(key) : new APIKey(key);
		if (!token.isValid()) {
			throw new errors.BalenaMalformedToken(key);
		}
		if (token.isExpired()) {
			throw new errors.BalenaExpiredToken(key);
		}
		return token;
	};

	private getToken = async (): Promise<Token> => {
		if (this.token) {
			return this.token;
		}

		const key = await this.storage.get(this.tokenKey);
		if (typeof key !== 'string') {
			throw new errors.BalenaMalformedToken(key as any);
		}
		this.token = this.createToken(key as string);
		return this.token;
	};
}
