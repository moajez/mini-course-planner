import mongoose from 'mongoose';

export interface ICourse extends mongoose.Document {
  name: string;
  code: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  selectedDays: string[];
  excludedDates: Date[];
  excludeHolidays: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const courseSchema = new mongoose.Schema<ICourse>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  notes: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  selectedDays: { type: [String], required: true },
  excludedDates: [Date],
  excludeHolidays: Boolean,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ICourse>('Course', courseSchema);