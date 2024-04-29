/**
 * User (Name, Email, Password, Role: Member or Librarian)
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	role: String // Member or Librarian
});

const User = mongoose.model('User', userSchema);


export async function createUser(name: string, email: string, password: string, role: string) {
	const newUser = new User({ name, email, password, role });
	return await newUser.save();
}

export async function findUserByEmail(email: string) {
	const user = await User.find({ email: email });
	return user;
}


export async function getAllUsers() {
	const users = await User.find({}, {__v: 0});
	return users;
}

export async function findUserById(id: string) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const user = await User.findById(id, {__v: 0});
	return user;
}

export async function updateUserById(id: string, {name, email}: {name: string, email: string}) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const res = await User.updateOne({
		_id: id
	}, {
		name: name, email: email
	});
	return res.matchedCount === 1 ? true : false;
}

export async function deleteUserById(id: string) {
	if (!mongoose.isValidObjectId(id)) {
		return null;
	}
	const res = await User.findByIdAndDelete(id);
	return res;
}
