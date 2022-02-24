export function RepositoryItem(props) {
    return (
        <li>
            {
                //?? - Desconsidera que o 0 é inválido
            }
            <strong>{props.repository.name ?? 'Default'}</strong>
            <p>{props.repository.description}</p>
            <a href={props.repository.link}> Acessar repositório</a>
        </li>
    );
}