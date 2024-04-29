/**
 * Book (Title, Author, Genre, Published Year, ISBN, Quantity in Stock)
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	title: String,
	author: String,
	genre: String,
	publishedYear: String,
	ISBN: String,
	quantity: Number
});

const Book = mongoose.model('Book', userSchema);

export async function getAllBooks() {
	const books = await Book.find({}, {__v: 0});
	return books;
}

export async function getBookById(id: string) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const book = await Book.findById(id, {__v: 0});
	return book;
}

export async function createBook(title: string, author: string, genre: string, publishedYear: string, ISBN: string, quantity: string) {
	const book = new Book({title, author, genre, publishedYear, ISBN, quantity});
	return await book.save();
}

export async function updateBookById(id: string,
	{title, author, genre, publishedYear, ISBN, quantity}:
		{title: string, author: string, genre: string, publishedYear: string, ISBN: string, quantity: string}
) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const res = await Book.findOneAndUpdate({
		_id: id
	}, {title, author, genre, publishedYear, ISBN, quantity});
	return res;
}

export async function deleteBookById(id: string) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const res = await Book.findOneAndDelete({_id: id});
	return res;
}

export async function decreaseBookQuantity(bookId: string) {
	await Book.findOneAndUpdate({_id: bookId}, {$inc: {quantity: -1}});
}

export async function addBookToInventory(bookId: string) {
	await Book.findOneAndUpdate({_id: bookId}, {$inc: {quantity: 1}});
}

// adv query
export async function booksWithQuantityLessThan(quantity: number) {
	const books = await Book.find({quantity: {$lt: quantity}}, {__v: 0});
	return books;
}