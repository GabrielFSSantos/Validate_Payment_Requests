import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import Debtor from '../models/Debtor';

export default {
  async create(req: Request, res: Response) {
    try {

      const debtor = await Debtor.findOne({
        where: {
          cpf: req.body.cnpj
        }
      });

      if (debtor) {
        return res.status(401).json({ error: 'Debtor Exists.' });
      }

      let newDebtor = {
        debtor_id: uuid(),
        name: req.body.name,
        cnpj: req.body.cnpj,
      }

      newDebtor = await Debtor.create(newDebtor);
      
      return res.json(newDebtor);

    } catch (error) {
      return res.status(400).json({ error: 'Debtor Exists' });
    }
  },

  async read(req: Request, res: Response) {
    try {

      const debtors = await Debtor.findAll();

      return res.json(debtors);
      
    } catch (error) {
      return res.status(400).json({ error: 'Could not list.' });
    }
  },
  
  async update(req: Request, res: Response) {
    try {

      const debtor = await Debtor.findByPk(req.body.debtor_id);

      if (!debtor) {
        return res.status(401).json({ error: 'Debtor not found.' });
      }

      delete req.body.debtor_id;

      await debtor.update(req.body);

      return res.json(debtor);

    } catch (error) {
      return res.status(400).json({ error: 'Could not update.' });
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      const debtor = await Debtor.findByPk(req.body.debtor_id);

      if (!debtor) {
        return res.status(401).json({ error: 'Debtor not found.' });
      }

      await debtor.destroy(req.body);

      return res.send({ answer: "successfully deleted" });

    } catch (error) {
      return res.status(400).json({ error: 't was not possible to delete.' });
    }
  },

  async show(req: Request, res: Response) {
    try {
      
      const debtor = await Debtor.findByPk(req.body.debtor_id);

      if (!debtor) {
        return res.status(401).json({ error: 'Debtor not found.' });
      }

      return res.json(debtor);

    } catch (error) {
      return res.status(400).json({ error: 'Couldnt show.' });
    }
  }
}