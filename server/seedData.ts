import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

// Define the DocumentType
type DocumentType = 'assignment' | 'material';

// Define the Document interface
interface Document {
  id: string;
  title: string;
  content: string;
  type: DocumentType;
  deadline?: string;
  embedding: number[];
}

// MongoDB schema for Document
const documentSchema = new mongoose.Schema<Document>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true, enum: ['assignment', 'material'] },
  deadline: { type: String, required: false },
  embedding: { type: [Number], required: true },
});

const DocumentModel = mongoose.model('Document', documentSchema);

// Function to generate a random number between min and max
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random embedding (array of numbers)
function generateRandomEmbedding(size: number): number[] {
  return Array.from({ length: size }, () => Math.random());
}

// Function to generate a random date within a range
function generateRandomDate(start: Date, end: Date): string {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
}

// Define sample documents
const documents: Document[] = [
  {
    id: uuidv4(),
    title: 'Newton\'s Laws of Motion',
    content: 'Newton\'s Laws of Motion describe the relationship between a body and the forces acting upon it, and the body\'s motion in response to those forces.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Periodic Table Trends',
    content: 'The periodic table arranges elements based on their atomic number, electron configuration, and recurring chemical properties, revealing periodic trends.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Calculus Fundamentals',
    content: 'Calculus is the mathematical study of continuous change, focusing on limits, functions, derivatives, integrals, and infinite series.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Data Structures and Algorithms',
    content: 'Data structures are ways of organizing and storing data, while algorithms are step-by-step procedures or formulas for solving problems.',
    type: 'assignment',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Quantum Mechanics Overview',
    content: 'Quantum mechanics is a fundamental theory in physics describing the physical properties of nature at the scale of atoms and subatomic particles.',
    type: 'assignment',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Organic Chemistry Reactions',
    content: 'Organic chemistry reactions involve the transformation of organic compounds through chemical reactions, including mechanisms and reaction types.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Linear Algebra Concepts',
    content: 'Linear algebra is the branch of mathematics concerning linear equations, linear functions, and their representations through matrices and vector spaces.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Introduction to Machine Learning',
    content: 'Machine learning is a branch of artificial intelligence focusing on building systems that learn from data, identify patterns, and make decisions with minimal human intervention.',
    type: 'assignment',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Electromagnetic Theory',
    content: 'Electromagnetic theory studies the interactions between electric fields and magnetic fields, encompassing phenomena like light, radio waves, and X-rays.',
    type: 'assignment',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Chemical Bonding Theories',
    content: 'Chemical bonding theories explain how atoms combine to form molecules, including ionic, covalent, and metallic bonds.',
    type: 'assignment',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Probability Theory Basics',
    content: 'Probability theory is the branch of mathematics concerned with analysis of random phenomena, providing the foundation for statistics and stochastic processes.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Operating Systems Concepts',
    content: 'Operating systems manage computer hardware and software resources, providing common services for computer programs.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Relativity and Time Dilation',
    content: 'Relativity theory, developed by Einstein, describes the relationship between space and time, including the phenomenon of time dilation.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },
  {
    id: uuidv4(),
    title: 'Acid-Base Equilibria',
    content: 'Acid-base equilibria involve the study of reversible reactions between acids and bases, determining pH levels and buffering capacities.',
    type: 'material',
    deadline: generateRandomDate(new Date(), new Date(2025, 11, 31)),
    embedding: generateRandomEmbedding(100),
  },

];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log('Connected to MongoDB');

    await DocumentModel.insertMany(documents);

    console.log('Documents inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting documents:', error);
  }
}


seedDatabase();
