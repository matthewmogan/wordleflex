import "./Letter.css"

export default function Letter(params){
    
    const{id,evaluation,letter} = params
    
    return (
        <p 
            id={id}
            className={evaluation}
        >
        {letter}
        </p>
    )
}