import mongoose from "mongoose";

/**
 * BorrowingHistory (User ID, Book ID, Borrowed Date, Return Date, Status: Borrowed or Returned)
*/
const borrowingHistroySchema = new mongoose.Schema({
	userId: mongoose.Schema.ObjectId,
	bookId: mongoose.Schema.ObjectId,
	borrowedDate: Date,
	returnedDate: Date,
	status: String, // BORROWED OR RETURNED
});

const BorrowingHistory = mongoose.model('BorrowingHistory', borrowingHistroySchema);

export async function getBorrowingHistroyEntries() {
	const res = await BorrowingHistory.find({}, {__v: 0});
	return res;
}

export async function getBorrowingHistroyEntriesById(id: string) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const res = await BorrowingHistory.findById(id);
	return res;
}

export async function addEntryToBorrowingHistory(bookId: string, userId: string) {
	const res = await BorrowingHistory.create({
		userId: userId,
		bookId: bookId,
		borrowedDate: new Date(),
		returnedDate: null,
		status: 'BORROWED'
	});
	return res;
}

export async function getBorrowingHistroyEntriesByUserIdBookId(userId: string, bookId: string) {
	const res = await BorrowingHistory.findOne({
		userId: userId,
		bookId: bookId
	});
	return res;

}

export async function updateBorrowingHistoryStatusById(id: string) {
	await BorrowingHistory.findByIdAndUpdate(id, {status: 'RETURNED', returnedDate: new Date()});
}


// adv query
export async function borrowedBookMoreThan(noOfTimes: number) {
	return await BorrowingHistory.aggregate([
		{
			$match: {
				status: "BORROWED"
			}
		},
		{
			$group: {
				_id: "$userId",
				borrowCount: { $sum: 1 }
			}
		},
		{
			$match: {
				borrowCount: { $gt: noOfTimes }
			}
		},
		{
			$lookup: {
				from: "users",
				localField: "_id",
				foreignField: "_id",
				as: "userDetails"
			}
		},
		{
			$unwind: "$userDetails"
		},
		{
			$project: {
				_id: 0,
				userId: "$userDetails._id",
				Name: "$userDetails.name",
				borrowCount: "$borrowCount"
			}
		}
	]);
}

export async function totalBorrowedBooksPerUser() {
	return await BorrowingHistory.aggregate([
		{
			$match: {
				status: "BORROWED"
			}
		},
		{
			$group: {
				_id: "$userId",
				borrowCount: {$sum: 1}
			}
		},
		{
			$lookup: {
				from: "users",
				localField: "_id",
				foreignField: "_id",
				as: "userDetails"
			}
		},
		{
			$unwind: "$userDetails"
		},
		{
			$project: {
				_id: 0,
				userId: "$userDetails._id",
				Name: "$userDetails.name",
				borrowCount: "$borrowCount"
			}
		}
	])
}
