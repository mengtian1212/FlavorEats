// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER_ADDRESS = "session/UPDATE_USER_ADDRESS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const editUserAddressAction = (user) => ({
  type: UPDATE_USER_ADDRESS,
  user,
});

export const editUserAddressThunk =
  (updatedAddress, userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/address`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAddress),
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(editUserAddressAction(user));
      return user;
    } else {
      const errors = await response.json();
      return errors;
    }
  };

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (
    email,
    password,
    username,
    firstNamePayload,
    lastNamePayload,
    addressPayload,
    cityPayload,
    state,
    zipPayload
  ) =>
  async (dispatch) => {
    console.log("hererererere");
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        first_name: firstNamePayload,
        last_name: lastNamePayload,
        address: addressPayload,
        city: cityPayload,
        state,
        zip: zipPayload,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return data;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        console.log("----------------", data.errors);
        return data;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case UPDATE_USER_ADDRESS:
      return { ...state, user: { ...action.user } };
    default:
      return state;
  }
}
