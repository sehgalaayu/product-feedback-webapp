import { Schema, model, Types } from "mongoose";


interface Vote {
  user: Types.ObjectId;
  feedback: Types.ObjectId;
  voteType: 'upvote' | 'downvote';
}


const voteSchema = new Schema<Vote>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  feedback: { type: Schema.Types.ObjectId, ref: 'Feedback', required: true },
  voteType: { type: String, required: true, enum: ['upvote', 'downvote'] }
}, {
  timestamps: true
});

const Vote = model<Vote>('Vote', voteSchema);
export default Vote;
