import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import Creditor from '../models/Creditor';

export default {
  async create(req: Request, res: Response) {
    try {
      

    } catch (error) {
      return res.status(400).json({ error: 'Creditor Exists' });
    }
  },

  async read(req: Request, res: Response) {
    try {

      
    } catch (error) {
      return res.status(400).json({ error: 'Could not list.' });
    }
  },
  
  async update(req: Request, res: Response) {
    try {


    } catch (error) {
      return res.status(400).json({ error: 'Could not update.' });
    }
  },
  
  async delete(req: Request, res: Response) {
    try {


    } catch (error) {
      return res.status(400).json({ error: 't was not possible to delete.' });
    }
  },

  async show(req: Request, res: Response) {
    try {
      

    } catch (error) {
      return res.status(400).json({ error: 'Couldnt show.' });
    }
  }
}