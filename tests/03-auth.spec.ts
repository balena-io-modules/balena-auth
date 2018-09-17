import { chai } from 'mochainon';
import ResinAuth from '../lib/auth';
import { TokenType } from '../lib/token';
import apiKeyFixtures from './fixtures/api-keys';
import jwtFixtures from './fixtures/jwts';

const { expect } = chai;
const IS_BROWSER = typeof window !== 'undefined';

let dataDirectory;
if (!IS_BROWSER) {
	// tslint:disable-next-line no-var-requires
	const settings = require('resin-settings-client');
	dataDirectory = settings.get('dataDirectory');
}

const auth = new ResinAuth({ dataDirectory, tokenKey: 'token-test' });

describe('ResinAuth', () => {
	beforeEach(() =>
		// Ensure a clean state before starting
		auth.removeKey());

	describe('.hasKey()/.removeKey()', () => {
		it('should return false when no key was stored', () => {
			expect(auth.hasKey()).to.eventually.equal(false);
		});

		it('should return true when any key was successfully stored', () => {
			return auth.setKey(jwtFixtures.empty).then(() => {
				expect(auth.hasKey()).to.eventually.equal(true);
			});
		});

		it('should return false again when the key is removed', () => {
			return auth
				.setKey(jwtFixtures.empty)
				.then(() => auth.removeKey())
				.then(() => {
					expect(auth.hasKey()).to.eventually.equal(false);
				});
		});
	});

	// These only check one basic variation of each, the other specs go into more detail

	describe('.setKey()', () => {
		describe('JWT', () => {
			beforeEach(() => auth.setKey(jwtFixtures.empty));

			describe('.getType()', () => {
				it('should always return TokenType.JWT', () => {
					expect(auth.getType()).to.eventually.equal(TokenType.JWT);
				});
			});

			describe('.getKey()', () => {
				it('should return the same key provided originally', () => {
					expect(auth.getKey()).to.eventually.equal(jwtFixtures.empty);
				});
			});

			describe('.isValid()', () => {
				it('should return true for a valid JWT', () => {
					expect(auth.isValid()).to.eventually.equal(true);
				});
			});

			describe('.getAge()', () => {
				it('should return `undefined` when there is no `iat`', () => {
					expect(auth.getAge()).to.eventually.equal(undefined);
				});
			});

			describe('.isExpired()', () => {
				it('should return false when there is no `exp`', () => {
					expect(auth.isExpired()).to.eventually.equal(false);
				});
			});

			describe('.needs2FA()', () => {
				it('should return false when there is no `twoFactorRequired`', () => {
					expect(auth.needs2FA()).to.eventually.equal(false);
				});
			});
		});

		describe('APIKey', () => {
			beforeEach(() => auth.setKey(apiKeyFixtures.apiKey));

			describe('.getType()', () => {
				it('should always return TokenType.APIKey', () => {
					expect(auth.getType()).to.eventually.equal(TokenType.APIKey);
				});
			});

			describe('.getKey()', () => {
				it('should return the same key provided originally', () => {
					expect(auth.getKey()).to.eventually.equal(apiKeyFixtures.apiKey);
				});
			});

			describe('.isValid()', () => {
				it('should always return true', () => {
					expect(auth.isValid()).to.eventually.equal(true);
				});
			});

			describe('.getAge()', () => {
				it('should always return 0', () => {
					expect(auth.getAge()).to.eventually.equal(0);
				});
			});

			describe('.isExpired()', () => {
				it('should always return false', () => {
					expect(auth.isExpired()).to.eventually.equal(false);
				});
			});

			describe('.needs2FA()', () => {
				it('should always return false', () => {
					expect(auth.needs2FA()).to.eventually.equal(false);
				});
			});
		});
	});
});
