# 🚀 Simple Product Feedback Board - MVP

This is a basic feedback board where users can:
- Sign up and login
- Post feedback (bugs, features, improvements)
- Vote on feedback

## 📁 What Each File Does:

### **Models (Database Tables):**
- **`User.ts`** - Stores user info (name, email, password)
- **`Feedback.ts`** - Stores feedback posts (title, description, category)
- **`Vote.ts`** - Stores votes (who voted on what)

### **Validation (Data Checking):**
- **`userValidation.ts`** - Checks if user data is correct
- **`feedbackValidation.ts`** - Checks if feedback data is correct
- **`voteValidation.ts`** - Checks if vote data is correct

## 🔧 How to Use:

### **1. Create a User:**
```typescript
const user = new User({
  name: "John Doe",
  email: "john@email.com",
  password: "password123"
});
await user.save();
```

### **2. Create Feedback:**
```typescript
const feedback = new Feedback({
  title: "Add dark mode",
  description: "Please add a dark mode option",
  category: "feature", // Only these categories allowed: "bug", "feature", "improvement", "other"
  author: userId
});
await feedback.save();
```

### **3. Vote on Feedback:**
```typescript
const vote = new Vote({
  user: userId,
  feedback: feedbackId,
  voteType: "upvote" // or "downvote"
});
await vote.save();
```

### **4. Validate Data:**
```typescript
import { createUserSchema } from './validations';

try {
  const validData = createUserSchema.parse(req.body);
  // Data is valid, use it
} catch (error) {
  // Data is invalid, show error
}
```

## 🎯 Allowed Categories:
When creating feedback, you can only use these categories:
- **`"bug"`** - Something is broken
- **`"feature"`** - New functionality request
- **`"improvement"** - Better version of existing feature
- **`"other"`** - Anything else

## 🎯 Next Steps:
1. Create routes (API endpoints)
2. Add authentication (JWT)
3. Create frontend
4. Test everything

## 💡 Tips:
- Start simple, add features later
- Test one thing at a time
- Don't worry about complex features yet
- Focus on getting basic functionality working

This is your MVP - keep it simple! 🎉
