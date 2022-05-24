import axios from "axios"
import apiHelpers from "./apiHelpers"

const BASE_URL = "http://localhost:8000/stocksbot"

// stuff to export
const UserDataAPI = { }

// stock list
UserDataAPI.getAllUserList = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/stock-list/`))
}

UserDataAPI.getUserListbyId = async (userListId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/stock-list/${userListId}`))
}

UserDataAPI.createUserList = async (UserListData) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/stock-list/`, UserListData))
}

UserDataAPI.deleteUserListById = async (userListId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/stock-list/${userListId}`)
  )
}

// notes
UserDataAPI.getAllNotes = async () => {
  return await apiHelpers.tryCatchFetch(
    () => axios.get(`${BASE_URL}/notes/`))
}

UserDataAPI.createNotes = async (UserNote) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.post(`${BASE_URL}/notes/`, UserNote))
}


UserDataAPI.deleteNoteById = async (UserNoteId) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.delete(`${BASE_URL}/notes/${UserNoteId}`))
}

UserDataAPI.updateNoteById = async (UserNoteId, UserNote) => {
  return await apiHelpers.tryCatchFetch(
    () => axios.put(`${BASE_URL}/notes/${UserNoteId}/`, UserNote))
}



export default UserDataAPI;