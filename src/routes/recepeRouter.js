import express from 'express';

router.get('/:id', async (req, res) => {
  const track = await recept.findByPk(req.params.id);
  const initState = { };
  res.render('ReceptPage', initState);
});
