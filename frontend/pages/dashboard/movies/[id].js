import { useRouter } from 'next/router'
import React, {
    useState, useEffect
} from 'react';
import ReactStars from 'react-stars'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import JwtDecode from "../../../services/JwtDecode";
import Cookies from 'universal-cookie';
const cookie = new Cookies().get("access");
const cookieUser = JwtDecode(cookie);

export default function show_movies_dashboard() {
  const router = useRouter()
  const { id, from } = router.query
  const [movie, setMovie] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [title, setTitle] = useState(null)
  const [overview, setOverview] = useState(null)
  const [user, setUser] = useState(null)
  const [content, setContent] = useState(null)

    const [note, setNote] = useState(null)
    const [grade, setGrade] = useState(0)
    const [comments, setComments] = useState(null)
    if (user === null) getUser();

  if (cookie === undefined) {
    router.push("/");
  } else {
    const user = JwtDecode(cookie);
    if (user.admin === false) router.push("/");
  }


  async function getUser() {
    let res = [];
    let config = {
      method: "get",
      url: "http://localhost:5000/users/" + cookieUser.id,
      headers: {
        Authorization: "Bearer " + cookie,
      },
    };
    await axios(config).then((response) => {
      res = response.data;
    });
    setUser(res._id);
  }

   async function grade_change(value) {
     console.log(note)
     const options = {
       method: 'POST',
       url: process.env.NEXT_PUBLIC_API_BASE_URL + "grades/",
       data: {
         "note": value,
         "user": user,
         "movie": id
       }
     };

     await axios.request(options).then((response) => {
       console.log(response.data)
       if (response.data.success) {
         setNote(value)
         setGrade(response.data.data.movie.grade)
       } else console.log(response.data.error)
     });
   }


   async function create_comment(event) {
     event.preventDefault();
     const options = {
       method: 'POST',
       url: process.env.NEXT_PUBLIC_API_BASE_URL + "comments/",
       data: {
         "content": content,
         "user": user,
         "movie": id
       }
     };
     await axios.request(options).then((response) => {
       console.log(response.data)
       if (response.data.success) {
         setContent("")
         get_comments(id)
       } else alert(response.data.error)
     });
   }
   async function delete_comment(event, id) {
     event.preventDefault();
     const options = {
       method: 'DELETE',
       url: process.env.NEXT_PUBLIC_API_BASE_URL + "comments/" + id
     };
     await axios.request(options).then((response) => {
       console.log(response.data)
       if (response.data.success) {
         alert("Commment removed !")
         get_comments(id)
       } else {
         alert(response.data.error)
       }
     });
   }
  async function get_movie(id) {
    if(from==='our'){
      var options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies/" + id
      };
      console.log(options)
      await axios.request(options).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          setMovie(response.data.data)
          setTitle(response.data.data.title)
          setOverview(response.data.data.overview)
        } else {
          alert(response.data.error)
        }
      });
    }
    else{
      var options = {
        method: 'GET',
        url: process.env.NEXT_PUBLIC_TMDB_BASE_URL + "movie/"+id+"?api_key=" + process.env.NEXT_PUBLIC_TMDB_KEY + "&language=en-US"
      };
      console.log(options)
      await axios.request(options).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          setMovie(response.data)
        } else {
          alert(response.data.error)
        }
      });
    }
    
  }

  async function update_movie(event, id) {
    event.preventDefault();
    const options = {
      method: "PATCH",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies/" + id,
      data: {
        title: title,
        overview: overview,
      },
    };
    await axios.request(options).then((response) => {
      console.log(response.data);
      if (response.data.success) alert("Movie updated successfully");
      else alert(response.data.error);
    });
  }
  function title_change(event) {
    setTitle(event.target.value);
  }
  function overview_change(event) {
    setOverview(event.target.value);
  }
   function overview_change(event) {
     setOverview(event.target.value)
   }

   function content_change(event) {
     setContent(event.target.value)
   }

     async function get_grade(id) {
       console.log(user)
       const options = {
         method: 'GET',
         url: process.env.NEXT_PUBLIC_API_BASE_URL + "grades/" + user + "/" + id
       };
       console.log(options)
       await axios.request(options).then((response) => {
         console.log(response.data)
         if (response.data.success) {
           setNote(response.data.data.note)
         } else {
           console.log(response.data.error)
         }
       });
     }

        async function get_comments(id) {
          setLoading(true)
          const options = {
            method: 'GET',
            url: process.env.NEXT_PUBLIC_API_BASE_URL + "comments/movie/" + id
          };
          await axios.request(options).then((response) => {
            if (response.data.success) {
              setComments(response.data.data)
              setLoading(false)
            }
            console.log(comments)
            setLoading(false)
          });
        }
  useEffect(() => {
    if (cookie === undefined) {
      router.push("/");
    } else {
      const user = JwtDecode(cookie);
      if (user.admin === false) router.push("/");
    }
    if (user === null) getUser();
    if (!router.isReady) return;
    if(from==="our" || from==="tmdb") get_movie(id)
    if(from==="our"){
      if (note === null) get_grade(id);
      get_comments(id)
    }
    
  }, [router.isReady])


  if (isLoading) return <p> Loading... </p>;
  if (!movie) return <p> No Movie data </p>;

  return (
    <>
    {
      from==="our" ?
      
      <div className="my-10 flex items-center flex-col">
         <div>
      <div>
        <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        
          < img src = {
            process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + movie.image
          }
          alt = ""
          className = "w-96 h-96 object-cover object-center rounded-2xl" / >
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <blockquote>
                <div className = "flex flex-row justify-between" >
                  <div className = "flex flex-col" >
                    <span>{movie.title}</span>
                    <p className="font-light">
                       {
                        movie.genres.map(genre => (
                          <span key={genre._id}> {genre.name}</span>
                        ))
                        }
                    </p>
                  </div>
                  <div>
                      <span> your rating </span>
                        <ReactStars
                        count={5}
                        size={25}
                        color2={'#ffd700'}
                         onChange = {grade_change}
                         value={note}
                        />
                  </div>

                </div>
                <h1 className="font-bold"> Overview </h1>
                <p className="font-normal">{movie.overview}</p>
    
              </blockquote>
                <figcaption className="font-medium">

                <div className="flex  flex-row justify-between items-center">
                  <div className="flex-initial w-64">
                    <div  className="text-sky-500 dark:text-sky-400 font-bold">
                        Director
                    </div>
                    <div className="text-slate-700 dark:text-slate-500 font-bold">
                      {movie.director.name}
                    </div>
                  </div>

                  <div className="flex-initial w-40">
                    <div className="text-sky-500 dark:text-sky-400 font-bold">
                      Release Date
                    </div>
                    <div className="text-slate-700 dark:text-slate-500 font-bold">
                      {
                        movie.release_date
                      }
                    </div>
                  </div>

                  <div className="flex-initial w-35">
                    <div className="text-sky-500 dark:text-sky-400 font-bold">
                      Grade
                    </div>
                    <div className="text-slate-700 dark:text-slate-500 font-bold">
                      {
                        grade
                      }
                    </div>
                  </div>
                </div>
              </figcaption>
              {/* <button className="bg-blue-500 hover:bg-red-700 text-red font-bold py-2 px-4 rounded-full" OnClick="window.external.AddFavorite(location.href, document.title);">
              +♥
              </button>                   */}
        </div>
      </figure>
    </div>
                
    </div>
        <div className="w-full">
              <form  className = "py-4 flex flex-col space-y-10 px-5"
              onSubmit = {(e) => update_movie(e, movie._id)} >
                  <div id="errors"></div>
                  <div className="flex-col space-y-2">
                      <label className="text-gray-600 poppins text-lg">Title</label>
                      <input type="text" name="title" defaultValue={movie.title} onChange={(e) => title_change(e)} className="w-full px-3 py-2 text-lg poppins border-none bg-black bg-opacity-10 appearance-none rounded-lg text-gray-700"/>
                  </div>
                  <div className="flex-col space-y-2">
                      <label className="text-gray-600 poppins text-lg">Description</label>
                      <textarea  name = "description"
                      defaultValue = {
                        movie.overview
                      }
                      onChange = {
                        (e) => overview_change(e)
                      }
                          className="w-full px-3 py-2 text-lg poppins border-none bg-black bg-opacity-10 appearance-none rounded-lg text-gray-700">
                      </textarea>
                  </div>
                  <button type="submit" name="register"
                      className="w-full px-6 py-2 bg-indigo-600 text-white poppins text-xl leading-tight uppercase rounded shadow-md">Update
                      Movie
              
                  </button>
              </form>
          </div>
      </div>
      
      :
      <div>
         <div>
      <div>
        <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        
          < img src = {
            process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL + movie.poster_path
          }
          alt = ""
          className = "w-96 h-96 object-cover object-center rounded-2xl" / >
          <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <blockquote>
                <div className = "flex flex-row justify-between" >
                  <div className = "flex flex-col" >
                    <span>{movie.title}</span>
                    <p className="font-light">
                       {
                        movie.genres.map(genre => (
                          <span key={genre._id}> {genre.name}</span>
                        ))
                        }
                    </p>
                  </div>
                  
                </div>
                <h1 className="font-bold"> Overview </h1>
                <p className="font-normal">{movie.overview}</p>
    
              </blockquote>
                <figcaption className="font-medium">

                <div className="flex  flex-row justify-between items-center">
                  <div className="flex-initial w-64">
                    <div  className="text-sky-500 dark:text-sky-400 font-bold">
                        Director
                    </div>
                    <div className="text-slate-700 dark:text-slate-500 font-bold">
                      {movie.director.name}
                    </div>
                  </div>

                  <div className="flex-initial w-40">
                    <div className="text-sky-500 dark:text-sky-400 font-bold">
                      Release Date
                    </div>
                    <div className="text-slate-700 dark:text-slate-500 font-bold">
                      {
                        movie.release_date
                      }
                    </div>
                  </div>

                </div>
              </figcaption>
              {/* <button className="bg-blue-500 hover:bg-red-700 text-red font-bold py-2 px-4 rounded-full" OnClick="window.external.AddFavorite(location.href, document.title);">
              +♥
              </button>                   */}
        </div>
      </figure>
    </div>
                
    </div>
      </div>
    }


   
    </>
  );
}
