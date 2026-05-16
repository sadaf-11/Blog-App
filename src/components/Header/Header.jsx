import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Logo, Logoutbtn } from '../index'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 py-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl'>
      <Container>
        <nav className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='inline-flex items-center rounded-full border border-cyan-300/20 bg-slate-900/80 px-5 py-3 mr-30 text-2xl shadow-lg shadow-cyan-500/10'>
              <Logo width='112px' />
            </Link>
          </div>
          <ul className='flex flex-wrap items-center gap-2 sm:ml-auto sm:justify-end'>
            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button
                    className='rounded-full px-5 py-2 text-sm font-semibold text-slate-300 transition duration-200 hover:bg-cyan-300/10 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300/60'
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            ))}

            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
