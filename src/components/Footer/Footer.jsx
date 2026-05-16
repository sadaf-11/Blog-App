import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

const footerLinks = [
  {
    title: 'Explore',
    links: ['Home', 'All Posts', 'Add Post'],
  },
  {
    title: 'Community',
    links: ['Writers', 'Ideas', 'Support'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Licensing'],
  },
]

function Footer() {
  return (
    <section className="relative overflow-hidden border-t border-slate-800 bg-slate-950/95 py-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-slate-900 px-5 py-3 text-2xl shadow-lg shadow-cyan-500/10">
              <Logo width="112px" />
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-400">
             A blogging platform for writers to share ideas, stories, tutorials, and meaningful insights.
            </p>
            <p className="mt-6 text-sm text-slate-500">
              &copy; 2026 BlogForge. All Rights Reserved.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h3 className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <Link
                        className="text-sm font-semibold text-slate-400 transition hover:text-white"
                        to="/"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
