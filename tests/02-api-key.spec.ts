import { expect } from 'chai';
import { APIKey } from '../build/api-key';
import { TokenType } from '../build/token';
import * as fixtures from './fixtures/api-keys';

const apiKey = new APIKey(fixtures.apiKey);

describe('APIKey', () => {
	describe('.type', () => {
		it('should always return TokenType.APIKey', () => {
			expect(apiKey.type).to.equal(TokenType.APIKey);
		});
	});

	describe('.getKey()', () => {
		it('should return the same key provided in the constructor', () => {
			expect(apiKey.key).to.equal(fixtures.apiKey);
		});
	});

	describe('.isValid()', () => {
		it('should always return true', () => {
			expect(apiKey.isValid()).to.equal(true);
		});
	});

	describe('.getAge()', () => {
		it('should always return 0', () => {
			expect(apiKey.getAge()).to.equal(0);
		});
	});

	describe('.isExpired()', () => {
		it('should always return false', () => {
			expect(apiKey.isExpired()).to.equal(false);
		});
	});

	describe('.has2FA()', () => {
		it('should always return false', () => {
			expect(apiKey.has2FA()).to.equal(false);
		});
	});

	describe('.needs2FA()', () => {
		it('should always return false', () => {
			expect(apiKey.needs2FA()).to.equal(false);
		});
	});
});
