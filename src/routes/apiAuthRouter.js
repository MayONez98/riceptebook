import { Router } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../../db/models';
import generateTokens from '../../utils/generateTokens';
import cookieConfig from '../../config/cookieConfig';

const router = Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { username, password: await bcrypt.hash(password, 10) },
  });

  if (!created) return res.status(403).json({ message: 'Пользователь уже существует' });

  const plainUser = user.get();
  delete plainUser.password;

  const { access, refresh } = generateTokens({ user: plainUser });

  res
    .cookie('accessToken', access, cookieConfig.access)
    .cookie('refreshToken', refresh, cookieConfig.refresh)
    .sendStatus(200);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(403).json({ message: 'Пользователь не найден' });

  const correctPass = await bcrypt.compare(password, user.password);

  if (!correctPass) {
    return res.status(401).json({ message: 'Неверный пароль' });
  }

  const plainUser = user.get();
  delete plainUser.password;

  const { access, refresh } = generateTokens({ user: plainUser });

  res
    .cookie('accessToken', access, cookieConfig.access)
    .cookie('refreshToken', refresh, cookieConfig.refresh)
    .sendStatus(200);
});

router.get('/logout', (req, res) => {
  res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
});
/
export default router;



