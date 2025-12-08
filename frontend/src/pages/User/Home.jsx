import Header from "../Movies/Header"
import MoviesContainerPage from "../Movies/MoviesContainerPage"

const Home = () => {
  return (
    <div className="mr-[5rem]">
      <Header/>

      <section className="mt-[3rem]">
            <MoviesContainerPage/>
      </section>
    </div>
  )
}

export default Home