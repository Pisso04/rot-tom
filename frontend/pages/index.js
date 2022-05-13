// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'


import Nav from './Nav.js'
import NavItem from './NavItem.js'
import List from './List.js'
import ListItem from './ListItem.js'


export default function Movies({ movies }) {
  return (
          <div>
            <form class="group relative">
              <svg width="20" height="20" fill="currentColor" class="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
              <input class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..."/>
            </form>
          <div>
            <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
           <img class="w-45 h-45 md:w-70 md:h-auto md:rounded-none rounded-full mx-auto" src="https://get.wallhere.com/photo/drawing-illustration-video-games-League-of-Legends-red-eyes-claws-spider-Elise-League-of-Legends-darkness-screenshot-computer-wallpaper-fictional-character-2000x3000-px-696268.jpg" alt="" width="300" height="100"/>
      
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>
                  <p class="font-light ..."> Welcome to the next level. </p>

                  <h1 class="font-bold ..."> Synopsis </h1>
                  <p class="font-normal ...">
                  Bien installé dans la petite ville de Green Hills, Sonic veut maintenant prouver qu’il a l’étoffe d' un véritable héros. Un défi de taille se présente à lui quand le Dr Robotnik refait son apparition. Accompagné de son nouveau complice Knuckles, ils sont en quête d’une émeraude dont le pouvoir permettrait de détruire l’humanité toute entière. Pour s’assurer que l’émeraude ne tombe entre de mauvaises mains, Sonic fait équipe avec Tails. Commence alors un voyage à travers le monde, plein de péripéties.
                  </p>
      
                </blockquote>
                  <figcaption class="font-medium">

                  <div class="flex">

                      <div class="flex-initial w-64 ...">
                        <div  class="text-sky-500 dark:text-sky-400 font-bold ...">
                            Alex Dorego
                        </div>
                        <div class="text-slate-700 dark:text-slate-500 font-bold ...">
                          Staff Engineer, Parakou
                        </div>
                      </div>

                      <div class="flex-initial w-40 ...">
                        <div class="text-sky-500 dark:text-sky-400 font-bold ...">
                          Evrard
                        </div>
                        <div class="text-slate-700 dark:text-slate-500 font-bold ...">
                          Programmeur
                        </div>
                      </div>

                      <div class="flex-initial w-35 ...">
                        <div class="text-sky-500 dark:text-sky-400 font-bold ...">
                          SOSO
                        </div>
                        <div class="text-slate-700 dark:text-slate-500 font-bold ...">
                          Financier, Cotonou
                        </div>
                      </div>

                  </div>

                </figcaption>

                {/* <div className="divide-y divide-slate-100">
                    <Nav>
                      <NavItem href="/new" isActive>New Releases</NavItem>
                      <NavItem href="/top">Top Rated</NavItem>
                      <NavItem href="/picks">Vincent’s Picks</NavItem>
                    </Nav>
                    <List>
                      {movies.map((movie) => (
                        <ListItem key={movie.id} movie={movie} />
                      ))}
                    </List>
                </div> */}
    
    </div>
    </figure>
    </div>
    </div>

  )
}
