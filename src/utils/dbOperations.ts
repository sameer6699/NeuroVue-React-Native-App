import User, { IUser } from '../models/User';

export const createUser = async (userData: { name: string; email: string }): Promise<IUser> => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  try {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
}; 