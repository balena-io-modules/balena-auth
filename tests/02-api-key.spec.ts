import { chai } from 'mochainon';
import { APIKey } from '../lib/api-key';
import { TokenType } from '../lib/token';
import fixtures from './fixtures/api-keys';

const { expect } = chai;
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
		it('should return true for non-empty values', () => {
			expect(apiKey.isValid()).to.equal(true);
		});
		it('should return false for empty token', () => {
			expect(new APIKey('').isValid()).to.equal(false);
		});
		it('should return false for null/undefined values', () => {
			expect(new APIKey((null as any) as string).isValid()).to.equal(false);
			expect(new APIKey((undefined as any) as string).isValid()).to.equal(
				false
			);
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

	describe('.needs2FA()', () => {
		it('should always return false', () => {
			expect(apiKey.needs2FA()).to.equal(false);
		});
	});
});
