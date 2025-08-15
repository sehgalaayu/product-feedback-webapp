import { Schema, model, Types } from "mongoose";

interface Vote {
  user: Types.ObjectId;
  voteType: 'upvote' | 'downvote';
}

interface Feedback {
  title: string;
  description: string;
  category: "bug" | "feature" | "improvement" | "other";
  author: Types.ObjectId;
  votes: Vote[];
}

const feedbackSchema = new Schema<Feedback>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["bug", "feature", "improvement", "other"],
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    votes: [{
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      voteType: { type: String, enum: ['upvote', 'downvote'], required: true }
    }]
  },
  {
    timestamps: true,
  }
);

const Feedback = model<Feedback>("Feedback", feedbackSchema);
export default Feedback;
