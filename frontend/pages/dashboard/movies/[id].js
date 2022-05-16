import { useRouter } from 'next/router'
import React, {
    useState, useEffect
} from 'react';
import axios from 'axios';
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



  async function get_movie(id) {
    const options = {
      method: 'GET',
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies/" + id
    };
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

  async function update_movie(event, id) {
    event.preventDefault();
    const options = {
      method: 'PATCH',
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "movies/" + id,
      data: {
        title: title, 
        overview:overview
      }
    };
    await axios.request(options).then((response) => {
      console.log(response.data)
      if (response.data.success)  alert("Movie updated successfully") 
      else alert(response.data.error)
    });
  }
  function title_change(event){
    setTitle(event.target.value)
  }
   function overview_change(event) {
     setOverview(event.target.value)
   }
  useEffect(() => {
    if (!router.isReady) return;

    if(from==="our" || from==="tmdb") get_movie(id)
  }, [router.isReady])


  if (isLoading) return <p > Loading... </p>
  if (!movie) return <p > No Movie data </p>
  
  return (
    <>
    {
      from==="our" ?
      <div className="my-10 flex items-center flex-col">
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

      </div>
    }
    </>
    
  )
}