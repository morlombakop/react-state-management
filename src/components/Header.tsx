import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header: React.FC = () => {
  const NavBar = styled.nav`
    width: 100%;
    padding: 15px 0;
    background-color: #444444;
    ul li {
      display: inline;
      a {
        padding: 0px 10px;
        text-decoration: none;
        color: #d0d0d0;
        &:hover {
          color: #ffffff;
        }
      }
    }
  `

  return (
    <NavBar>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
      </ul>
    </NavBar>
  )
}

export default Header
