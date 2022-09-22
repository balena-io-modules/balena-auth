import { expect } from 'chai';
import { JWT } from '../build/jwt';
import { TokenType } from '../build/token';
import { empty, expired, two2FA, invalid } from './fixtures/jwts';

function getJWT(key: string) {
	return new JWT(key);
}

describe('JWT', () => {
	describe('.type', () => {
		it('should always return TokenType.JWT', () => {
			expect(getJWT(empty).type).to.equal(TokenType.JWT);
		});
	});

	describe('.getKey()', () => {
		it('should return the same key provided in the constructor', () => {
			expect(getJWT(empty).key).to.equal(empty);
		});
	});

	describe('.isValid()', () => {
		it('should return true for a valid JWT', () => {
			expect(getJWT(empty).isValid()).to.equal(true);
			expect(getJWT(expired).isValid()).to.equal(true);
			expect(getJWT(two2FA).isValid()).to.equal(true);
		});

		it('should return false for an invalid JWT', () => {
			expect(getJWT(invalid).isValid()).to.equal(false);
		});
	});

	describe('.getAge()', () => {
		it('should return `undefined` when there is no `iat`', () => {
			expect(getJWT(empty).getAge()).to.equal(undefined);
		});

		it('should return >= 0 when there is a `iat`', () => {
			expect(getJWT(expired).getAge()).to.be.above(0);
		});
	});

	describe('.isExpired()', () => {
		it('should return false when there is no `exp`', () => {
			expect(getJWT(empty).isExpired()).to.equal(false);
		});

		it('should return true when `exp` is in the past', () => {
			expect(getJWT(expired).isExpired()).to.equal(true);
		});

		it('should return false when `exp` is in the future', () => {
			expect(getJWT(two2FA).isExpired()).to.equal(false);
		});
	});

	describe('.needs2FA()', () => {
		it('should return false when there is no `twoFactorRequired`', () => {
			expect(getJWT(empty).needs2FA()).to.equal(false);
		});

		it('should return false when `twoFactorRequired` is `false`', () => {
			expect(getJWT(expired).needs2FA()).to.equal(false);
		});

		it('should return true when `twoFactorRequired` is `true`', () => {
			expect(getJWT(two2FA).needs2FA()).to.equal(true);
		});
	});
});
