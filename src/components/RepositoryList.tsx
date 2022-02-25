import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'
import { useEffect, useState } from "react";

interface Repository { //Por convenção como não é uma propriedade não se coloca o Props no final.
    id: number;
    name: string;
    description: string;
    html_url: string;
}

export function RepositoryList () {
    const [repositories, setRepositories] = useState<Repository[]>([]); 
    //useState<Repository> O meu estado vai armazenar um repositorio
    //useState<Repository[]> Vai armazenar uma LISTA de Repository
    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
        .then(response => response.json())
        .then(data => setRepositories(data)) //Salvando a resposta na lista
    }, [])
    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
               {
               repositories.map(repository => {
                   return <RepositoryItem key={repository.id} repository={repository}/>
               })}
            </ul>
        </section>
    )
}