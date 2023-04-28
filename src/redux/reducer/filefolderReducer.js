import * as types from "../actionType/filefolderActionType";

const initialState = {
  text: "",
  isLoading: true,
  currentFolder: "root",
  Folders: [],
  Files: [],
  value1: null,
};

const filefolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        Folders: [...state.Folders, action.payload],
      };
    case types.ADD_FOLDER:
      return {
        ...state,
        Folders: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };
    // case types.CHANGE_FILEVAR:
    // return {
    //   ...state,
    //   value1: action.payload,
    // };
    case types.ADD_FILES:
      return {
        ...state,
        Files: [...state.Files, action.payload],
      };
    case types.CREATE_FILE:
      return {
        ...state,
        Files: action.payload,
      };
    case types.DELETE_FILE:
      return {
        ...state,
        Files: [state.Files.filter((item) => item.docId !== action.payload)],
      };
    case types.SEARCHBAR:
      return {
        ...state,
        text: action.payload,
        loading: false,
      };
    case types.SET_FILE_DATA:
      const allFiles = state.Files;
      const currentFile = allFiles.find(
        (file) => file.docId === action.payload.fileId
      );

      const obj = {
        docId: currentFile.docId,
        data: {
          name: currentFile.data.name,
          createdAt: currentFile.data.createdAt,
          path: currentFile.data.path,
          parent: currentFile.data.parent,
          lastAccess: currentFile.data.lastAccess,
          updatedAt: currentFile.data.updatedAt,
          extension: currentFile.data.extension,
          data: action.payload.datas,
          url: currentFile.data.url,
        },
      };

      return {
        ...state,
        Files: state.Files.map((file) =>
          file.docId === action.payload.fileId ? obj : file
        ),
      };

    default:
      return state;
  }
};

export default filefolderReducer;
