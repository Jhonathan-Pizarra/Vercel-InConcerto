import withAuth from "@/hocs/withAuth";
import ReadArtists from "@/components/artists/ReadArtists";


const Artistas = () => {

    return (
        <div>
            <div className="container">
                <ReadArtists/>
            </div>
        </div>

    )
}

export default withAuth(Artistas);
