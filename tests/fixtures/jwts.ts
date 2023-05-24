import * as jsonwebtoken from 'jsonwebtoken';
import { JWTData } from '../../build/jwt';

const signToken = (data: JWTData) =>
	jsonwebtoken.sign(data, '_SECRET_', { noTimestamp: !data.iat });

const nowInSec = () => Math.floor(Date.now() / 1000);

const deltaInSec = (delaySec: number) => nowInSec() + delaySec;

export const empty = signToken({});

export const pending2FA = signToken({
	iat: nowInSec(),
	exp: deltaInSec(100),
	twoFactorRequired: true,
});

export const passed2FA = signToken({
	iat: nowInSec(),
	exp: deltaInSec(100),
	twoFactorRequired: false,
});

export const expired = signToken({
	iat: deltaInSec(-2),
	exp: deltaInSec(-10),
	twoFactorRequired: false,
});

export const invalid = 'ashjda/asdashsg/adaasddas';
