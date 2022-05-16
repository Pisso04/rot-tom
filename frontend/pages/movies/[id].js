import ReactStars from 'react-stars'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the FontAwesomeIcon component
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React, {
    useState,
    useEffect
} from 'react';
import JwtDecode from "../../services/JwtDecode";
import Cookies from 'universal-cookie';
const cookie = new Cookies().get("access");
const cookieUser = JwtDecode(cookie);


export default function Comments() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState(null)
  const [note, setNote] = useState(null)
  const [grade, setGrade] = useState(0)
  const [comments, setComments] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [content, setContent] = useState(null)
  const [movie, setMovie] = useState(null)

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


   async function get_comments(id) {
     setLoading(true)
     const options = {
       method: 'GET',
       url: process.env.NEXT_PUBLIC_API_BASE_URL + "comments/movie/"+id
     };
     await axios.request(options).then((response) => {
       if (response.data.success) {
         setComments(response.data.data)
         setLoading(false)
       }
       console.log(comments)

     });
   }

  async function get_grade(id) {
    console.log(user)
     const options = {
       method: 'GET',
       url: process.env.NEXT_PUBLIC_API_BASE_URL + "grades/" + user +"/"+id
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
  async function get_movie(id) {
    setLoading(true)
    const options = {
      method: 'GET',
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies/" + id
    };
    await axios.request(options).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        setMovie(response.data.data)
        setGrade(response.data.data.grade)
        setLoading(false)
      } else {
        console.log(response.data.error)
      }
    });
  }

  function content_change(event) {
    setContent(event.target.value)
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
        }
       else console.log(response.data.error)
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
      }
      else alert(response.data.error)
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

    useEffect(() => {
      if (user === null) getUser();
      if (!router.isReady) return;
        if (note === null) get_grade(id);
        get_movie(id)
        get_comments(id)
      }, [router.isReady ])
    
      if (isLoading) return <p>Loading...</p>
      if (!comments) return <p > No data found </p>

  return (
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

      <div className="text-2xl p-10"> Commentaires </div>

      <div className="pt-6 md:p-8 text-center space-y-4">
        <blockquote>
        <form onSubmit = {
          (e) => create_comment(e)
        }
        className = "flex flex-row justify-center items-center space-x-10" >
          <textarea textarea rows = "3"
          cols = "50"
          defaultValue = ""
          className = "border"
            onChange = {
              (e) => content_change(e)
            }> 
          </textarea>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"> Commentez</button>
        </form>

        </blockquote>

        {
          comments.map( comment => (
              < div key = {comment._id}
                class = "relative z-0 group flex flex-col lg:mx-7 pt-5" >
                < div className = "absolute group-hover:inline-flex space-x-4 transition-opacity bg-opacity-0 group-hover:bg-opacity-80 duration-500 top-0 right-3 focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 focus:outline-none text-white hidden items-center justify-center" >
                  { comment.user._id===user ?
                    <button onClick = {
                        (e) => delete_comment(e, comment._id)
                      }
                      className = "text-red-500 inter" > Delete </button>
                    :""
                  }
                </div>
                <div className="flex flex-row justify-between">
                  <div className="mr-4 w-12 h-12 text-center rounded">
                    <div
                      className="rounded-full bg-white bg-opacity-10 inline-flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faUser}  className="text-center text-2xl text-slate-900"></FontAwesomeIcon>
                    </div>
                  </div>
                  <div
                    className="rounded-lg w-full h-auto bg-gray-200 bg-opacity-50 p-2 text-slate-500"
                  >
                    <div className="flex flex-col">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:space-x-5">
                        <h3 className="mb-3 sm:mb-1 text-gray-800 text-lg leading-normal inter">
                          { comment.user.username }
                        </h3>
                        <p className="mb-2 sm:mb-1 text-gray-600 text-sm leading-normal inter">
                          { comment.date }
                        </p>
                      </div>
                      <p className="poppins">
                        { comment.content }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          ))}
          </div>
                
    </div>

  )
}