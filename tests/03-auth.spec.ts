import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import BalenaAuth from '../build/auth';
import { TokenType } from '../build/token';
import * as apiKeyFixtures from './fixtures/api-keys';
import * as jwtFixtures from './fixtures/jwts';
chai.use(chaiAsPromised);

const IS_BROWSER = typeof window !== 'undefined';

let dataDirectory: string | undefined;
if (!IS_BROWSER) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const settings = require('balena-settings-client');
	dataDirectory = settings.get('dataDirectory');
}

const auth = new BalenaAuth({ dataDirectory, tokenKey: 'token-test' });

describe('BalenaAuth', () => {
	before(async () => {
		// Ensure a clean state before starting
		await auth.removeKey();
	});

	describe('.hasKey()/.removeKey()', () => {
		beforeEach(async () => {
			await auth.removeKey();
		});
		it('should return false when no key was stored', async () => {
			await expect(auth.hasKey()).to.eventually.equal(false);
		});

		it('should return true when any key was successfully stored', async () => {
			await auth.setKey(jwtFixtures.empty);
			await expect(auth.hasKey()).to.eventually.equal(true);
		});

		it('should return false again when the key is removed', async () => {
			await auth.setKey(jwtFixtures.empty);
			await auth.removeKey();
			await expect(auth.hasKey()).to.eventually.equal(false);
		});
	});

	// These only check one basic variation of each, the other specs go into more detail

	describe('.setKey()', () => {
		beforeEach(async () => {
			await auth.removeKey();
		});
		describe('JWT', () => {
			beforeEach(async () => {
				await auth.setKey(jwtFixtures.empty);
			});

			describe('.getType()', () => {
				it('should always return TokenType.JWT', async () => {
					await expect(auth.getType()).to.eventually.equal(TokenType.JWT);
				});
			});

			describe('.getKey()', () => {
				it('should return the same key provided originally', async () => {
					await expect(auth.getKey()).to.eventually.equal(jwtFixtures.empty);
				});
			});

			describe('.isValid()', () => {
				it('should return true for a valid JWT', async () => {
					await expect(auth.isValid()).to.eventually.equal(true);
				});
			});

			describe('.getAge()', () => {
				it('should return `undefined` when there is no `iat`', async () => {
					await expect(auth.getAge()).to.eventually.equal(undefined);
				});
			});

			describe('.isExpired()', () => {
				it('should return false when there is no `exp`', async () => {
					await expect(auth.isExpired()).to.eventually.equal(false);
				});
			});

			describe('given a token where there is no `twoFactorRequired`', () => {
				beforeEach(() => auth.setKey(jwtFixtures.empty));

				describe('.get2FAStatus()', () => {
					it('should return `not_required`', async () => {
						await expect(auth.get2FAStatus()).to.eventually.equal(
							'not_required',
						);
					});
				});

				describe('.needs2FA()', () => {
					it('should return false', async () => {
						await expect(auth.needs2FA()).to.eventually.equal(false);
					});
				});
			});

			describe('given a token where `twoFactorRequired` is `false`', () => {
				beforeEach(() => auth.setKey(jwtFixtures.passed2FA));

				describe('.get2FAStatus()', () => {
					it('should return `passed`', async () => {
						await expect(auth.get2FAStatus()).to.eventually.equal('passed');
					});
				});

				describe('.needs2FA()', () => {
					it('should return false', async () => {
						await expect(auth.needs2FA()).to.eventually.equal(false);
					});
				});
			});

			describe('given a token where `twoFactorRequired` is `true`', () => {
				beforeEach(() => auth.setKey(jwtFixtures.pending2FA));

				describe('.get2FAStatus()', () => {
					it('should return `pending`', async () => {
						await expect(auth.get2FAStatus()).to.eventually.equal('pending');
					});
				});

				describe('.needs2FA()', () => {
					it('should return true', async () => {
						await expect(auth.needs2FA()).to.eventually.equal(true);
					});
				});
			});
		});

		describe('APIKey', () => {
			beforeEach(async () => {
				await auth.setKey(apiKeyFixtures.apiKey);
			});

			describe('.getType()', () => {
				it('should always return TokenType.APIKey', async () => {
					await expect(auth.getType()).to.eventually.equal(TokenType.APIKey);
				});
			});

			describe('.getKey()', () => {
				it('should return the same key provided originally', async () => {
					await expect(auth.getKey()).to.eventually.equal(
						apiKeyFixtures.apiKey,
					);
				});
			});

			describe('.isValid()', () => {
				it('should always return true', async () => {
					await expect(auth.isValid()).to.eventually.equal(true);
				});
			});

			describe('.getAge()', () => {
				it('should always return 0', async () => {
					await expect(auth.getAge()).to.eventually.equal(0);
				});
			});

			describe('.isExpired()', () => {
				it('should always return false', async () => {
					await expect(auth.isExpired()).to.eventually.equal(false);
				});
			});

			describe('.get2FAStatus()', () => {
				it('should always return `not_required`', async () => {
					await expect(auth.get2FAStatus()).to.eventually.equal('not_required');
				});
			});

			describe('.needs2FA()', () => {
				it('should always return false', async () => {
					await expect(auth.needs2FA()).to.eventually.equal(false);
				});
			});
		});
	});

	describe('mutliple instances', function () {
		before(async () => {
			await auth.setKey(apiKeyFixtures.apiKey);
		});

		describe('using the same dataDirectory and tokenKey', function () {
			let authOther: InstanceType<typeof BalenaAuth>;
			before(function () {
				authOther = new BalenaAuth({ dataDirectory, tokenKey: 'token-test' });
			});
			describe('.hasKey()', () => {
				it('should return true', async () => {
					expect(await authOther.hasKey()).to.equal(true);
				});
			});
			describe('.getKey()', () => {
				it('should return the same key provided originally', async () => {
					expect(await authOther.getKey()).to.equal(apiKeyFixtures.apiKey);
				});
			});
		});

		describe('using a different dataDirectory and the same tokenKey', function () {
			let authOther: InstanceType<typeof BalenaAuth>;
			before(function () {
				authOther = new BalenaAuth({
					dataDirectory: `${dataDirectory}-other`,
					tokenKey: 'token-test',
				});
			});
			describe('.hasKey()', () => {
				// TODO: we should provide the same isolation level for browsers as well
				if (IS_BROWSER) {
					it('should return true', async () => {
						expect(await authOther.hasKey()).to.equal(true);
					});
				} else {
					it('should return false', async () => {
						expect(await authOther.hasKey()).to.equal(false);
					});
				}
			});
			describe('.getKey()', () => {
				// TODO: we should provide the same isolation level for browsers as well
				if (IS_BROWSER) {
					it('should return the same key provided originally', async () => {
						expect(await authOther.getKey()).to.equal(apiKeyFixtures.apiKey);
					});
				} else {
					it('should reject', async () => {
						await expect(authOther.getKey()).to.eventually.be.rejected;
					});
				}
			});
		});

		describe('using the same dataDirectory and differter tokenKey', function () {
			let authOther: InstanceType<typeof BalenaAuth>;
			before(function () {
				authOther = new BalenaAuth({
					dataDirectory,
					tokenKey: 'token-test-other',
				});
			});
			describe('.hasKey()', () => {
				it('should return false', async () => {
					expect(await authOther.hasKey()).to.equal(false);
				});
			});
			describe('.getKey()', () => {
				it('should reject', async () => {
					await expect(authOther.getKey()).to.eventually.rejected;
				});
			});
		});

		describe('using dataDirectory: false and the same tokenKey', function () {
			let authIsolated1: InstanceType<typeof BalenaAuth>;
			let authIsolated2: InstanceType<typeof BalenaAuth>;
			before(async function () {
				await auth.setKey(apiKeyFixtures.apiKey);

				authIsolated1 = new BalenaAuth({
					dataDirectory: false,
					tokenKey: 'token-test',
				});
				authIsolated2 = new BalenaAuth({
					dataDirectory: false,
					tokenKey: 'token-test',
				});
			});
			describe('.hasKey()', () => {
				it('should return true on the original instance', async () => {
					expect(await auth.hasKey()).to.equal(true);
				});
				it('should return false on the isolated instance', async () => {
					expect(await authIsolated1.hasKey()).to.equal(false);
				});
			});
			describe('.getKey()', () => {
				it('should return the key on the original instance', async () => {
					expect(await auth.getKey()).to.equal(apiKeyFixtures.apiKey);
				});
				it('should reject on the isolated instance', async () => {
					await expect(authIsolated1.getKey()).to.eventually.rejected;
				});
			});
			describe('.setKey()', () => {
				it('should work', async function () {
					await authIsolated1.setKey(apiKeyFixtures.apiKey2);
					expect(await authIsolated1.getKey()).to.equal(apiKeyFixtures.apiKey2);
					expect(await authIsolated1.hasKey()).to.equal(true);
				});
			});
			describe('given a key set by the first isolated instance', function () {
				before(async function () {
					await authIsolated1.setKey(apiKeyFixtures.apiKey2);
				});
				describe('.hasKey()', () => {
					it('should return true on the original instance', async () => {
						expect(await auth.hasKey()).to.equal(true);
					});
					it('should return true when called on the first isolated instance', async () => {
						expect(await authIsolated1.hasKey()).to.equal(true);
					});
					it('should return false when called on the second isolated instance', async () => {
						expect(await authIsolated2.hasKey()).to.equal(false);
					});
				});
				describe('.getKey()', () => {
					it('should return the key on the original instance', async () => {
						expect(await auth.getKey()).to.equal(apiKeyFixtures.apiKey);
					});
					it('should return the provided key when called on the first isolated instance', async () => {
						expect(await authIsolated1.getKey()).to.equal(
							apiKeyFixtures.apiKey2,
						);
					});
					it('should reject when called on the second isolated instance', async () => {
						await expect(authIsolated2.getKey()).to.eventually.rejected;
					});
				});
			});
			describe('given a key set by the second isolated instance', function () {
				before(async function () {
					await authIsolated2.setKey(apiKeyFixtures.apiKey3);
				});
				describe('.hasKey()', () => {
					it('should return true on the original instance', async () => {
						expect(await auth.hasKey()).to.equal(true);
					});
					it('should return true when called on the first isolated instance', async () => {
						expect(await authIsolated1.hasKey()).to.equal(true);
					});
					it('should return true when called on the second isolated instance', async () => {
						expect(await authIsolated2.hasKey()).to.equal(true);
					});
				});
				describe('.getKey()', () => {
					it('should return the key on the original instance', async () => {
						expect(await auth.getKey()).to.equal(apiKeyFixtures.apiKey);
					});
					it('should return the provided key when called on the first isolated instance ', async () => {
						expect(await authIsolated1.getKey()).to.equal(
							apiKeyFixtures.apiKey2,
						);
					});
					it('should return the provided key when called on the second isolated instance ', async () => {
						expect(await authIsolated2.getKey()).to.equal(
							apiKeyFixtures.apiKey3,
						);
					});
				});
			});
			describe('when the first isolated instance removes its key', function () {
				before(async function () {
					await authIsolated1.removeKey();
				});
				describe('.hasKey()', () => {
					it('should return true on the original instance', async () => {
						expect(await auth.hasKey()).to.equal(true);
					});
					it('should return false when called on the first isolated instance', async () => {
						expect(await authIsolated1.hasKey()).to.equal(false);
					});
					it('should return true when called on the second isolated instance', async () => {
						expect(await authIsolated2.hasKey()).to.equal(true);
					});
				});
				describe('.getKey()', () => {
					it('should return the key on the original instance', async () => {
						expect(await auth.getKey()).to.equal(apiKeyFixtures.apiKey);
					});
					it('should reject when called on the first isolated instance', async () => {
						await expect(authIsolated1.getKey()).to.eventually.rejected;
					});
					it('should return the provided key when called on the second isolated instance ', async () => {
						expect(await authIsolated2.getKey()).to.equal(
							apiKeyFixtures.apiKey3,
						);
					});
				});
			});
		});
	});
});
