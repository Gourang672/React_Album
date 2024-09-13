import nav from"./Navbar.module.css";
import { useNavigate } from "react-router-dom";



const Navbar=()=>{
    const navigate = useNavigate();

    const handleClick=()=>{
        navigate("/CreateAlbum");
    }
    return(
        <>
        <div className={nav.Navbar}>
         <div className={nav.heading}>Album</div>
         <div onClick={handleClick} className={nav.create}>Create Album</div>      
        </div>
        </>
    );
};

export default Navbar;