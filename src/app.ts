import express from 'express';
import cors from 'cors';
import whatsappRoutes from './routes/whatsapp.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/webhook', whatsappRoutes);

export default app;
