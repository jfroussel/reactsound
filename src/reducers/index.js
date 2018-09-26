import { combineReducers } from 'redux'
import SoundsReducer from './reducer-sounds'
import StorageTrack from './reducer-storage-track'
import Filters from './reducer-filters'
import ProjectsReducer from './reducer-projects'
import ProjectsFilters from './reducer-projects-filter'
import PlaylistReducer from './reducer-playlists'


export default combineReducers({
  sounds: SoundsReducer,
  storageTrack : StorageTrack,
  filters: Filters,
  projectsFilters: ProjectsFilters,
  projects: ProjectsReducer,
  playlists: PlaylistReducer,
})