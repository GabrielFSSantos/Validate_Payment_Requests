import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import Creditor from '../models/Creditor';

export default {
  async create(req: Request, res: Response) {
    try {

      const creditor = await Creditor.findOne({
        where: {
          cpf: req.body.cpf
        }
      });

      if (creditor) {
        return res.status(401).json({ error: 'Creditor Exists.' });
      }

      let newCreditor = {
        creditor_id: uuid(),
        name: req.body.name,
        cpf: req.body.cpf,
        status: req.body.status
      }

      newCreditor = await Creditor.create(newCreditor);
      
      return res.json(newCreditor);

    } catch (error) {
      return res.status(400).json({ error: 'Creditor Exists' });
    }
  },

  async read(req: Request, res: Response) {
    try {

      const creditors = await Creditor.findAll();

      return res.json(creditors);
      
    } catch (error) {
      return res.status(400).json({ error: 'Could not list.' });
    }
  },
  
  async update(req: Request, res: Response) {
    try {

      const creditor = await Creditor.findByPk(req.body.creditor_id);

      if (!creditor) {
        return res.status(401).json({ error: 'Creditor not found.' });
      }

      delete req.body.creditor_id;

      await creditor.update(req.body);

      return res.json(creditor);

    } catch (error) {
      return res.status(400).json({ error: 'Could not update.' });
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      const creditor = await Creditor.findByPk(req.params.id);

      if (!creditor) {
        return res.status(401).json({ error: 'Creditor not found.' });
      }

      await creditor.destroy(req.body);

      return res.send({ answer: "successfully deleted" });

    } catch (error) {
      return res.status(400).json({ error: 't was not possible to delete.' });
    }
  },

  async show(req: Request, res: Response) {
    try {
      
      const creditor = await Creditor.findByPk(req.params.id, {
        include: [
          Creditor.associations.payment
        ]
      });

      if (!creditor) {
        return res.status(401).json({ error: 'Creditor not found.' });
      }

      return res.json(creditor);

    } catch (error) {
      return res.status(400).json({ error: 'Couldnt show.' });
    }
  }
}