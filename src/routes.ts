import {Router} from 'express';

import CreditorController from './controllers/CreditorController';
import DebtorController from './controllers/DebtorController';
import PaymentController from './controllers/PaymentController';

const api = Router();

api.post('/creditors/create', CreditorController.create);
api.get('/creditors/read', CreditorController.read);
api.put('/creditors/update', CreditorController.update);
api.delete('/creditors/delete', CreditorController.delete);
api.get('/creditors/show/:id', CreditorController.show);

api.post('/debtors/create', DebtorController.create);
api.get('/debtors/read', DebtorController.read);
api.put('/debtors/update', DebtorController.update);
api.delete('/debtors/delete', DebtorController.delete);
api.get('/debtors/show/:id', DebtorController.show);

api.post('/payments/create', PaymentController.create);
api.get('/payments/read', PaymentController.read);
api.put('/payments/update', PaymentController.update);
api.delete('/payments/delete', PaymentController.delete);
api.get('/payments/show/:id', PaymentController.show);

export default api;
