import * as chai from 'chai';
import { expect } from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import BalenaAuth from '../build/auth';
import { TokenType } from '../build/token';
import * as apiKeyFixtures from './fixtures/api-keys';
import * as jwtFixtures from './fixtures/jwts';
chai.use(chaiAsPromised);

const IS_BROWSER = typeof window !== 'undefined';

let dataDirectory;
if (!IS_BROWSER) {
	// tslint:disable-next-line no-var-requires
	const settings = require('balena-settings-client');
	dataDirectory = settings.get('dataDirectory');
}

const auth = new BalenaAuth({ dataDirectory, tokenKey: 'token-test' });

describe('BalenaAuth', () => {
	beforeEach(() =>
		// Ensure a clean state before starting
		auth.removeKey(),
	);

	describe('.hasKey()/.removeKey()', () => {
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
		describe('JWT', () => {
			beforeEach(() => auth.setKey(jwtFixtures.empty));

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
			beforeEach(() => auth.setKey(apiKeyFixtures.apiKey));

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
});
