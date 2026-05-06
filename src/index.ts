import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './interfaces/http/routes/auth.routes';
import propertyRoutes from './interfaces/http/routes/property.routes';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API REST de gestión de propiedades inmobiliarias');
});

// Rutas
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
