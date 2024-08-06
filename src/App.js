import { Routes, Route, Navigate } from 'react-router-dom'
import { Component } from 'react'

import './App.css'
import NotFound from './components/NotFound'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import Profile from './components/Profile'
import ProtectedRoute from './components/ProtectedRoute' // Ensure this is updated for v6+
import SearchContext from './SearchContext'
import UserProfile from './components/UserProfile'

class App extends Component {
  state = { isDark: false, searchInput: '', searchPostView: false }

  onChangeTheme = () => {
    this.setState((prev) => ({ isDark: !prev.isDark }))
  }

  clickButton = () => {
    this.setState((prev) => ({ searchPostView: !prev.searchPostView }))
  }

  onEnterSearch = () => {
    this.setState((prev) => ({ searchPostView: !prev.searchPostView }))
  }

  changeSearch = (result) => {
    this.setState({ searchInput: result })
  }

  render() {
    const { isDark, searchInput, searchPostView } = this.state
    return (
      <SearchContext.Provider
        value={{
          searchInput,
          clickSearchButton: this.clickButton,
          changeSearchInput: this.changeSearch,
          enterSearchButton: this.onEnterSearch,
          searchPostView,
          isDark,
          changeTheme: this.onChangeTheme,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={<ProtectedRoute><Home /></ProtectedRoute>}
          />
          <Route
            path="/my-profile"
            element={<ProtectedRoute><Profile /></ProtectedRoute>}
          />
          <Route
            path="/users/:userId"
            element={<ProtectedRoute><UserProfile /></ProtectedRoute>}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </SearchContext.Provider>
    )
  }
}

export default App
