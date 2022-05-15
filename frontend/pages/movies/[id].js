
import ReactStars from 'react-stars'

import Comments from '../../components/Comment'

import axios from 'axios'

import react, { useState, useEffect } from 'react'



export default function Movies({ movies }) {

    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    // async function mov (){
    //     const { data } = await axios.get("localhost:5000/comments");
    //     const posts = data.slice(0, 10);
    //     const paths = comments.map((post) => ({ params: { id: post.id.toString() } }));
    // }

    useEffect(() => {
        setLoading(true)
        fetch('http://127.0.0.1:5000/comments')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            console.log(data)
            setLoading(false)
          })
      }, [])
    
      if (isLoading) return <p>Loading...</p>
      if (!data) return <p>No profile data</p>


  return (
    <div>

            {/*   *************** Bar de recherche ********************
            <form className="group relative">
              <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
              </svg>
              <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..."/>
            </form> */}
          <div>
            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
           <img className="w-45 h-45 md:w-70 md:h-auto md:rounded-none rounded-full mx-auto" src="https://get.wallhere.com/photo/drawing-illustration-video-games-League-of-Legends-red-eyes-claws-spider-Elise-League-of-Legends-darkness-screenshot-computer-wallpaper-fictional-character-2000x3000-px-696268.jpg" alt="" width="300" height="100"/>
      
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                <blockquote>

                  <div>
                      <h2> Rate :  Star Ratings - '***Movies names here***' </h2>
                        <ReactStars
                        count={5}
                        size={35}
                        color2={'#ffd700'}
                        />
                  </div>

                  <p className="font-light ..."> Welcome to the next level. </p>

                  <h1 className="font-bold ..."> Synopsis </h1>
                  <p className="font-normal ...">
                  Bien installé dans la petite ville de Green Hills, Sonic veut maintenant prouver qu’il a l’étoffe d' un véritable héros. Un défi de taille se présente à lui quand le Dr Robotnik refait son apparition. Accompagné de son nouveau complice Knuckles, ils sont en quête d’une émeraude dont le pouvoir permettrait de détruire l’humanité toute entière. Pour s’assurer que l’émeraude ne tombe entre de mauvaises mains, Sonic fait équipe avec Tails. Commence alors un voyage à travers le monde, plein de péripéties.
                  </p>
      
                </blockquote>
                  <figcaption className="font-medium">

                  <div className="flex">

                      <div className="flex-initial w-64 ...">
                        <div  className="text-sky-500 dark:text-sky-400 font-bold ...">
                            Alex Dorego
                        </div>
                        <div className="text-slate-700 dark:text-slate-500 font-bold ...">
                          Staff Engineer, Parakou
                        </div>
                      </div>

                      <div className="flex-initial w-40 ...">
                        <div className="text-sky-500 dark:text-sky-400 font-bold ...">
                          Evrard
                        </div>
                        <div className="text-slate-700 dark:text-slate-500 font-bold ...">
                          Programmeur
                        </div>
                      </div>

                      <div className="flex-initial w-35 ...">
                        <div className="text-sky-500 dark:text-sky-400 font-bold ...">
                          SOSO
                        </div>
                        <div className="text-slate-700 dark:text-slate-500 font-bold ...">
                          Financier, Cotonou
                        </div>
                      </div>

                  </div>

                </figcaption>

                <button className="bg-blue-500 hover:bg-red-700 text-red font-bold py-2 px-4 rounded-full" OnClick="window.external.AddFavorite(location.href, document.title);">
                +♥
                </button>

                                    {/*                       
                                    <div>
                                      <DiscussionEmbed
                                      shortname={disqusShortname}
                                      config={disqusConfig}
                                      />
                                    </div> */}




                                    {/* <div classNameName="divide-y divide-slate-100">
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


<figure className="md:flex bg-slate-100 items-center rounded-xl flex justify-center p-8 md:p-0 dark:bg-slate-800 my-6">
  {/* <img className="w-24 h-24 md:rounded-none rounded-full mx-auto" src="https://get.wallhere.com/photo/drawing-illustration-video-games-League-of-Legends-red-eyes-claws-spider-Elise-League-of-Legends-darkness-screenshot-computer-wallpaper-fictional-character-2000x3000-px-696268.jpg" alt="" width="300" height="100"/> */}
  <div className="pt-6 md:p-8 text-center space-y-4">
    <blockquote>

<form action="*********" className="postion-left border flex items-center space-x-10">
  <p><label for="w3review"> Commentaire </label></p>
  <textarea id="********" name="******" rows="2" cols="50"> </textarea>
  <br/>
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" OnClick="window.external.AddFavorite(location.href, document.title);"> Commentez</button>
</form>

    </blockquote>


    {data.map(function(d, idx){
        
    <figcaption className="font-medium">

      <div className= "flex flex-col md:flex-row ">

            <div className= "ok1">
                <img width="25" height="25" src="https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"/>
            </div>
            <div className= "ok2*****µµµµµµµµµ" > 
                  <form action="*********" className="postion-left border flex items-center space-x-5">
                    <p> User profile with picture </p>
                    <textarea id="********" name="******" rows="2" cols="50"> </textarea>
                  </form>
            </div>
      </div>

    </figcaption>

})}




    <figcaption className="font-medium">

      <div className= "flex flex-col md:flex-row ">

            <div className= "ok1">
            <img width="25" height="25" src="https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"/>

            </div>
            <div className= "ok2" > 

                  <form action="*********" className="postion-left border flex items-center space-x-5">
                    <p> User profile with picture </p>
                    <textarea id="********" name="******" rows="2" cols="50"> </textarea>
                  </form>
            </div>
      </div>

         </figcaption>





         <figcaption className="font-medium">

      <div className= "flex flex-col md:flex-row ">

            <div className= "ok1">
            <img width="25" height="25" src="https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png"/>

            </div>
            <div className= "ok2" > 

                  <form action="*********" className="postion-left border flex items-center space-x-5">
                    <p> User profile with picture </p>
                    <textarea id="********" name="******" rows="2" cols="50"> </textarea>
                  </form>
            </div>
      </div>




    
         </figcaption>
      </div>
    </figure>
                
    </div>

  )
}