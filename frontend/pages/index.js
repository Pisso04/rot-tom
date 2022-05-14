// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import ReactStars from 'react-stars'

import {DiscussionEmbed} from "disqus-react"

import Comments from '../components/Comment'

import React from 'react'


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

                  <div>
                      <h2> Rate :  Star Ratings - '***Movies names here***' </h2>
                        <ReactStars
                        count={5}
                        size={35}
                        color2={'#ffd700'}
                        />
                  </div>

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

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" OnClick="window.external.AddFavorite(location.href, document.title);">
                  Button
                </button>

{/*                       
                        <div>
                          <DiscussionEmbed
                          shortname={disqusShortname}
                          config={disqusConfig}
                          />
                        </div> */}




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

                            <div class="flex">

                                <div class="flex-initial w-15 ...">
                                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                        {/* <img class="w-full" src="https://images.pexels.com/photos/1674625/pexels-photo-1674625.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Sunset in the mountains"/> */}
                                    <div class="px-3 py-2">

                                    <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                                    <p class="text-gray-700 text-base">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                    </p>
                                    </div>
                                    <div class="px-6 pt-4 pb-2">
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                    </div>
                                </div>
                            </div>
                                      
                                      

                                        <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                          <img class="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"/>
                                          <div class="px-6 py-4">
                                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>


                                        <div>
                                          <h1>Comments - *** This Movies ***** </h1>
                                          <Comments/>
                                        </div>
                                            


                                          </div>
                                          <div class="px-6 pt-4 pb-2">

                                            </div>
                                        </div>


                  </div>
                
    </div>

  )
}