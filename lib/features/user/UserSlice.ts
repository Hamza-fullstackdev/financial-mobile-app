import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  _id: string | null;
  fname: string;
  lname: string;
  email: string;
  profileImg: string | null;
  userAgent: string | null;
  signupMethod: string;
  isAuthenticated: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

const initialState: UserState = {
  _id: null,
  fname: '',
  lname: '',
  email: '',
  profileImg: '',
  userAgent: '',
  signupMethod: '',
  isAuthenticated: false,
  createdAt: null,
  updatedAt: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    logoutUser() {
      return {
        ...initialState,
      };
    },
    deleteUser() {
      return {
        ...initialState,
      };
    },
    updateUser(state, action: PayloadAction<Partial<Omit<UserState, 'isAuthenticated' | '_id'>>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { loginUser, logoutUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
