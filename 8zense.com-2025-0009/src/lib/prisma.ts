import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Extend the Prisma Client with the Accelerate extension
const prismaWithAccelerate = prisma.$extends(withAccelerate());

export default prismaWithAccelerate;