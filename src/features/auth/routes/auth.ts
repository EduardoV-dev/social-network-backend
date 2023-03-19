import Express from 'express';

const router = Express.Router();

router.post('/login', (req, res) => {
    res.status(200).send({ message: 'Logged in' });
});

router.post('/signup', (req, res) => {
    res.status(201).send({ message: 'User created' });
});

export { router };
