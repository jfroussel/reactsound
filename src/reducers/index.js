import { combineReducers } from 'redux'
import { snackbarReducer } from 'react-redux-snackbar'
import SoundsReducer from './reducer-sounds'
import StorageTrack from './reducer-storage-track'
import Filters from './reducer-filters'
import ProjectsReducer from './reducer-projects'
import ProjectsFilters from './reducer-projects-filter'
import PlaylistReducer from './reducer-playlists'
import List from './list'




export default combineReducers({
  snackbar: snackbarReducer,
  sounds: SoundsReducer,
  storageTrack : StorageTrack,
  filters: Filters,
  projectsFilters: ProjectsFilters,
  projects: ProjectsReducer,
  playlists: PlaylistReducer,
  list:List
})