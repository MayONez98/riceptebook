import express from 'express';
import {Recept} from '../../db/models/';

const router = express.Router();
router.get('/:id', async (req, res) => {
  const recipe = await Recept.findByPk(req.params.id);
  if (recipe) {
    res.render('ReceptPage', { recipe });
  } else {
    res.status(404).send('Рецепт не найден');
  }
});
export default router;
