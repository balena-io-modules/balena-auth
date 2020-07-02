import * as jsonwebtoken from 'jsonwebtoken';
import { JWTData } from '../../lib/jwt';

const signToken = (data: JWTData) =>
	jsonwebtoken.sign(data, '_SECRET_', { noTimestamp: !data.iat });

const nowInSec = () => Math.floor(Date.now() / 1000);

const deltaInSec = (delaySec: number) => nowInSec() + delaySec;

const empty = {};

const two2FA = {
	iat: nowInSec(),
	exp: deltaInSec(100),
	twoFactorRequired: true,
};

const expired = {
	iat: deltaInSec(-2),
	exp: deltaInSec(-10),
	twoFactorRequired: false,
};

export default {
	empty: signToken(empty),
	expired: signToken(expired),
	two2FA: signToken(two2FA),
	invalid: 'ashjda/asdashsg/adaasddas',
};
