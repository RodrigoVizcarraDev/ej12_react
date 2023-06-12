import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Noticias from "./Noticias";
import { useEffect, useState } from "react";

const Formulario = () => {
    const [noticias, setNoticias] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [pais, setPais] = useState("");

    useEffect(() => {
        consultaAPI();
        console.log("ejecutaUseEffect");
    }, [categoria, pais]);

    const consultaAPI = async () => {
        try {
            // Peticion
            const peticion = await fetch(
                `https://newsdata.io/api/1/news?apikey=pub_24258a6531c5682a2442ca019fbef4b170fd4&q=${categoria || "sport"}&language=es&${pais || "ar"}`
            );
            const datos = await peticion.json();
            console.log(datos);
            console.log(datos.results);
            let noticias = datos.results;
            setNoticias(noticias);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
    }

    const handleSelectCategory = (categoria) => {
        const categoriaValue = categoria.target.value;
        console.log(categoriaValue);
        setCategoria(categoriaValue);
    };

    const handleSelectCountry = (country) => {
        console.log(country.target.value);
        console.log("Se ejecuta select country");
        const paisValue = country.target.value;
        setPais(paisValue);
    }
    return (
        <>
            <Form aria-label="Categoria" onSubmit={handleSubmit}>
                <Form.Select
                    aria-label="Default select example"
                    className="mb-4"
                    onChange={handleSelectCategory}
                    value={categoria}
                >
                    <option>Seleccione una categoria</option>
                    <option value="sports">Deportes</option>
                    <option value="trends">Tendencias</option>
                    <option value="technology">Tecnologia</option>
                </Form.Select>
                
                <Form.Select
                    aria-label="Default select example"
                    className="mb-4"
                    onChange={handleSelectCountry}
                    value={pais}
                >
                    <option>Seleccione un pais</option>
                    <option value="us">Estados Unidos</option>
                    <option value="ar">Argentina</option>
                    <option value="fr">Francia</option>
                </Form.Select>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

            <Noticias noticias={noticias}></Noticias>
        </>
    );
};

export default Formulario;
