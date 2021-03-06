import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import Payment from '../models/Payment';
import Creditor from '../models/Creditor';
import Debtor from '../models/Debtor';

export default {
  async create(req: Request, res: Response) {
    try {
      
      const creditor = await Creditor.findOne({
        where: {
          creditor_id: req.body.creditor_id
        }
      });

      const debtor = await Debtor.findOne({
        where: {
          debtor_id: req.body.debtor_id
        }
      });

      let newPayment = {
        payment_id: uuid(),
        creditor_id: req.body.creditor_id,
        debtor_id: req.body.debtor_id,
        initial_value: req.body.initial_value,
        final_value: req.body.final_value,
        date: new Date(Date.now()),
        status: req.body.status,
        reason: req.body.reason,
      }

      // Regra de negocio 1
      if(creditor?.status !== 'approved'){
        newPayment.status = 'Invalid';
        newPayment.reason = 'Incomplete debtor registration.';
        await Payment.create(newPayment);
        return res.status(401).json({ error: newPayment.reason });
      }

      // Regra de negocio 2
      if(!debtor){
        newPayment.status = 'Invalid';
        newPayment.reason = 'Debtor not found.';
        await Payment.create(newPayment);
        return res.status(401).json({ error: newPayment.reason });
      }

      // Regra de negocio 3
      if(req.body.initial_value < 0 || req.body.final_value < 0){
        newPayment.status = 'Invalid';
        newPayment.reason = 'Payment amounts less than zero.';
        await Payment.create(newPayment);
        return res.status(401).json({ error: newPayment.reason });
      }

      // Regra de negocio 4
      if(req.body.final_value > req.body.initial_value){
        newPayment.status = 'Invalid';
        newPayment.reason = 'Final value greater than initial value.';
        await Payment.create(newPayment);
        return res.status(401).json({ error: newPayment.reason });
      }

      newPayment.status = 'approved';
      newPayment.reason = '';
      await Payment.create(newPayment);
      
      return res.json(newPayment);

    } catch (error) {
      return res.status(400).json({ error: 'Payment Exists' });
    }
  },

  async read(req: Request, res: Response) {
    try {

      const payments = await Payment.findAll();

      return res.json(payments);

    } catch (error) {
      return res.status(400).json({ error: 'Could not list.' });
    }
  },
  
  async update(req: Request, res: Response) {
    try {

      const payment = await Payment.findByPk(req.body.debtor_id);

      if (!payment) {
        return res.status(401).json({ error: 'Payment not found.' });
      }

      delete req.body.payment_id;
      delete req.body.creditor_id;
      delete req.body.debtor_id;

      await payment.update(req.body);

      return res.json(payment);

    } catch (error) {
      return res.status(400).json({ error: 'Could not update.' });
    }
  },
  
  async delete(req: Request, res: Response) {
    try {

      const payment = await Payment.findByPk(req.params.id);

      if (!payment) {
        return res.status(401).json({ error: 'Payment not found.' });
      }

      await payment.destroy(req.body);

      return res.send({ answer: "successfully deleted" });

    } catch (error) {
      return res.status(400).json({ error: 't was not possible to delete.' });
    }
  },

  async show(req: Request, res: Response) {
    try {
      
      const payment = await Payment.findByPk(req.params.id);

      if (!payment) {
        return res.status(401).json({ error: 'Payment not found.' });
      }

      return res.json(payment);

    } catch (error) {
      return res.status(400).json({ error: "couldn't show." });
    }
  }
}