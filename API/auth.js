// In general, this api simply takes google token from the UI and check for its authenticity and based on that it returns the response.

const Router = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

let { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
    if (process.env.NODE_ENV !== 'production') {
        JWT_SECRET = 'tempjwtsecretfordevonly';
        console.log('Missing env var JWT_SECRET. Using unsafe dev secret');
    } else {
        console.log('Missing env var JWT_SECRET. Authentication disabled');
    }
}

const routes = new Router();
routes.use(bodyParser.json());
const origin = process.env.UI_SERVER_ORIGIN;
routes.use(cors({ origin, credentials: true }));

function mustBeSignedIn(resolver) {
    return (root, args, { user }) => {
        console.log('root', root);
        console.log('args', args);
        console.log('user', user);

        if (!user || !user.signedIn) {
            throw new AuthenticationError('You must be signed in');
        }
        return resolver(root, args, { user });
    };
}

function getUser(req) {
    const token = req.cookies.jwt;
    if (!token) return { signedIn: false };
    try {
        const credentials = jwt.verify(token, JWT_SECRET);
        return credentials;
    } catch (error) {
        return { signedIn: false };
    }
}

routes.post('/signin', async (req, res) => {
    if (!JWT_SECRET) {
        res.status(500).send('Missing JWT_SECRET. Refusing to authenticate');
    }
    const googleToken = req.body.google_token;
    if (!googleToken) {
        res.status(400).json({
            code: 400,
            message: 'Missing Token',
        });
        return;
    }

    const client = new OAuth2Client();
    let payload;
    try {
        const ticket = await client.verifyIdToken({ idToken: googleToken });
        payload = ticket.getPayload();
    } catch (error) {
        res.status(403).send('Invalid credentials!');
    }
    const { given_name: givenName, name, email } = payload;
    const credentials = {
        signedIn: true,
        givenName: givenName,
        name: name,
        email: email,
    }
    const token = jwt.sign(credentials, JWT_SECRET);
    res.cookie('jwt', token, { httpOnly: true, expires: new Date(Date.now() + 900 * 1000), domain: process.env.COOKIE_DOMAIN }); // set cookie for 900 sec(15 min)
    res.json(credentials);
});

routes.post('/signout', async (req, res) => {
    res.clearCookie('jwt');
    res.json({ status: 'ok' });
});

routes.post('/user', (req, res) => {
    res.send(getUser(req));
});

module.exports = { routes, getUser, mustBeSignedIn };