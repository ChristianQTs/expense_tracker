import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle shutdown 
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

export default prisma;
