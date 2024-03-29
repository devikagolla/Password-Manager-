import {v4} from 'uuid'
import {Component} from 'react'
import './App.css'

class App extends Component {
  state = {
    passwordList: [],
    isShow: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteInput, passwordInput, usernameInput} = this.state
    const initial = websiteInput.slice(0, 1).toUpperCase()

    const newPassword = {
      id: v4(),
      initial,
      websiteInput,
      usernameInput,
      passwordInput,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  onWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onDelete = id => {
    const {passwordList} = this.state
    const newList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: newList})
  }

  isShowPassword = e => {
    if (e.target.value) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onType = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {passwordList, isShow, searchInput} = this.state
    const newList = passwordList.filter(each =>
      each.websiteInput.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <div className="Container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <form onSubmit={this.addPassword}>
            <h1>Add New Password</h1>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                onChange={this.onWebsite}
              />
            </div>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                onChange={this.onUsername}
              />
            </div>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={this.onPassword}
              />
            </div>

            <button type="submit">Add</button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
          <div>
            <div>
              <div>
                <h1>Your Passwords</h1>
                <p>{newList.length}</p>
              </div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  onChange={this.onType}
                  placeholder="Search"
                  value={searchInput}
                />
              </div>
            </div>
            <hr />
            <div>
              <input type="checkbox" id="show" onChange={this.isShowPassword} />
              <label htmlFor="show">Show Passwords</label>
            </div>
            {newList.length !== 0 ? (
              <ul>
                {newList.map(each => (
                  <li className="list-container" key={each.id} id={each.id}>
                    <p>{each.initial}</p>
                    <div>
                      <p>{each.websiteInput}</p>
                      <p>{each.usernameInput}</p>
                      {isShow ? (
                        <p>{each.passwordInput}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => this.onDelete(each.id)}
                      testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default App
