import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: {  
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true, 
  },
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  group:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FlashcardGroup',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,  
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const flashcardGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  flashcards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flashcard'
  }],
  createdAt: {
    type: Date,
    default: Date.now,  
  },
});

flashcardSchema.index({ group: 1 });
flashcardSchema.index({ createdBy: 1 });
flashcardGroupSchema.index({ createdBy: 1 });

// Virtual for flashcard count in group
flashcardGroupSchema.virtual('flashcardCount').get(function() {
  return this.flashcards.length;
});

// Auto-populate group when querying flashcards
flashcardSchema.pre('find', function() {
  this.populate('group');
});

// Cascade delete flashcards when group is deleted
flashcardGroupSchema.pre('deleteOne', async function() {
  await mongoose.model('Flashcard').deleteMany({ group: this._id });
});

export  const Flashcard = mongoose.model("Flashcard", flashcardSchema);
export const FlashcardGroup = mongoose.model('FlashcardGroup', flashcardGroupSchema);
